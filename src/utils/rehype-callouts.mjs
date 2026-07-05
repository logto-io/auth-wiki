/**
 * Transform GitHub-style callout blockquotes (`> [!Note]`) into styled callout
 * blocks. The keyword inside the brackets becomes the callout title as-is, so
 * localized markers (e.g. `[!注意]`, `[!Hinweis]`, `[!Nota]`) work without a
 * keyword whitelist.
 */
const calloutPattern = /^\[!([^\]]+)\]\s*/;

const visitBlockquotes = (node, callback) => {
  if (node.tagName === 'blockquote') {
    callback(node);
  }
  for (const child of node.children ?? []) {
    visitBlockquotes(child, callback);
  }
};

const rehypeCallouts = () => (tree) => {
  visitBlockquotes(tree, (blockquote) => {
    const firstParagraph = blockquote.children?.find(
      (child) => child.type === 'element' && child.tagName === 'p'
    );
    const firstChild = firstParagraph?.children?.[0];
    if (!firstChild || firstChild.type !== 'text') {
      return;
    }
    const match = firstChild.value.match(calloutPattern);
    if (!match) {
      return;
    }

    firstChild.value = firstChild.value.replace(calloutPattern, '');
    if (!firstChild.value && firstParagraph.children.length === 1) {
      blockquote.children.splice(blockquote.children.indexOf(firstParagraph), 1);
    }

    blockquote.tagName = 'div';
    blockquote.properties = { ...blockquote.properties, className: ['callout'] };
    blockquote.children.unshift({
      type: 'element',
      tagName: 'p',
      properties: { className: ['callout-title'] },
      children: [{ type: 'text', value: match[1] }],
    });
  });
};

export default rehypeCallouts;
