import { type NewPatient, NewPatientEntrySchema } from './types.ts';

const parseNewPatientEntry = (object: unknown): NewPatient => {
  return NewPatientEntrySchema.parse(object);
};

export default parseNewPatientEntry;