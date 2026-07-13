export const isNotNumber = (value: string): boolean =>
  isNaN(Number(value));

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
};