const LOCAL_DEFAULT_CONCURRENCY = 10;
const CI_DEFAULT_CONCURRENCY = 4;

export type ResolveCoverGenerationConcurrencyOptions = {
  ci?: boolean;
  override?: string;
};

export const resolveCoverGenerationConcurrency = (
  options: ResolveCoverGenerationConcurrencyOptions = {}
) => {
  const ci = options.ci ?? Boolean(process.env.CI);
  const override = options.override ?? process.env.COVER_GENERATION_CONCURRENCY;

  if (override) {
    const value = Number.parseInt(override, 10);

    if (Number.isInteger(value) && value > 0) {
      return value;
    }
  }

  return ci ? CI_DEFAULT_CONCURRENCY : LOCAL_DEFAULT_CONCURRENCY;
};
