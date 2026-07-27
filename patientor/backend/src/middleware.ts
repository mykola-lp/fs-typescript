import { type Request, type Response, type NextFunction } from 'express';

import { NewPatientEntrySchema } from './types.ts';

export const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = NewPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};