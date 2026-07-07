export type AppError = Error & {
  status?: number;
  code?: string;
};
