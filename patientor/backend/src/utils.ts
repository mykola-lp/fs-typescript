import { type NewPatientEntry, NewPatientEntrySchema } from './types.ts';

const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientEntrySchema.parse(object);
};

export default parseNewPatientEntry;