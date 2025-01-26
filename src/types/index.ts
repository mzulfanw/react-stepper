export type PageProps = {
  handleNext: (_values: Record<string, unknown>) => void;
  handleBack: (_values: Record<string, unknown>) => void;
  values?: Record<string, unknown>;
};
