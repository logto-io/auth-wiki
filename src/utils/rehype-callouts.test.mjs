import { describe, expect, it } from 'vitest';
import rehypeCallouts from './rehype-callouts.mjs';

const text = (value) => ({ type: 'text', value });
const element = (tagName, children = [], properties = {}) => ({
  type: 'element',
  tagName,
  properties,
  children,
});
const run = (tree) => {
  rehypeCallouts()(tree);
  return tree;
};

describe('rehypeCallouts', () => {
  it('should transform a marker blockquote into a callout with a title', () => {
    const blockquote = element('blockquote', [
      element('p', [text('[!Note]\nThe term "scopes" are interchangeable with "permissions".')]),
    ]);
    run({ type: 'root', children: [blockquote] });

    expect(blockquote.tagName).toBe('div');
    expect(blockquote.properties.className).toEqual(['callout']);
    expect(blockquote.children[0]).toEqual(
      element('p', [text('Note')], { className: ['callout-title'] }),
    );
    expect(blockquote.children[1].children[0].value).toBe(
      'The term "scopes" are interchangeable with "permissions".',
    );
  });

  it('should keep localized markers as the title', () => {
    const blockquote = element('blockquote', [element('p', [text('[!注意]\n内容')])]);
    run({ type: 'root', children: [blockquote] });

    expect(blockquote.children[0].children[0].value).toBe('注意');
  });

  it('should trim whitespace around the extracted title', () => {
    const blockquote = element('blockquote', [element('p', [text('[! Note ]\nBody')])]);
    run({ type: 'root', children: [blockquote] });

    expect(blockquote.children[0].children[0].value).toBe('Note');
  });

  it('should remove a marker-only first paragraph', () => {
    const marker = element('p', [text('[!Note]')]);
    const content = element('p', [text('Content')]);
    const blockquote = element('blockquote', [marker, text('\n'), content]);
    run({ type: 'root', children: [blockquote] });

    expect(blockquote.children).not.toContain(marker);
    expect(blockquote.children[0].properties.className).toEqual(['callout-title']);
    expect(blockquote.children).toContain(content);
  });

  it('should preserve existing class names on the blockquote', () => {
    const blockquote = element('blockquote', [element('p', [text('[!Note]\nBody')])], {
      className: ['existing'],
    });
    run({ type: 'root', children: [blockquote] });

    expect(blockquote.properties.className).toEqual(['existing', 'callout']);
  });

  it('should leave blockquotes without a marker untouched', () => {
    const blockquote = element('blockquote', [element('p', [text('Just a quote.')])]);
    run({ type: 'root', children: [blockquote] });

    expect(blockquote.tagName).toBe('blockquote');
    expect(blockquote.properties.className).toBeUndefined();
    expect(blockquote.children).toHaveLength(1);
  });

  it('should transform marker blockquotes nested in other elements', () => {
    const blockquote = element('blockquote', [element('p', [text('[!Note]\nNested')])]);
    const tree = { type: 'root', children: [element('div', [element('section', [blockquote])])] };
    run(tree);

    expect(blockquote.tagName).toBe('div');
    expect(blockquote.properties.className).toEqual(['callout']);
  });
});
