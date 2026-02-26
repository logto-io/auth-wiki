import { describe, expect, it } from 'vitest';
import { resolveCoverGenerationConcurrency } from './cover-generation-concurrency';

describe('resolveCoverGenerationConcurrency', () => {
  it('uses CI default when CI is set and no override provided', () => {
    expect(resolveCoverGenerationConcurrency({ ci: true })).toBe(4);
  });

  it('uses local default when CI is not set and no override provided', () => {
    expect(resolveCoverGenerationConcurrency({ ci: false })).toBe(10);
  });

  it('uses override when it is a positive integer', () => {
    expect(resolveCoverGenerationConcurrency({ ci: true, override: '2' })).toBe(2);
  });

  it('falls back to defaults for invalid overrides', () => {
    expect(resolveCoverGenerationConcurrency({ ci: true, override: 'abc' })).toBe(4);
    expect(resolveCoverGenerationConcurrency({ ci: false, override: '0' })).toBe(10);
  });
});
