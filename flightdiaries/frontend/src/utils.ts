import axios from 'axios';

import type { ValidationError } from './types';

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const zodErrors = (error.response?.data as ValidationError)?.error;

    if (Array.isArray(zodErrors) && zodErrors.length > 0) {
      return `Error: ${zodErrors.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ')}`;
    }

    return 'Something went wrong';
  }

  return 'An unexpected error occurred';
}