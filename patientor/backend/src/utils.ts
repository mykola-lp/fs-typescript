import { Gender, type NewPatient } from './types.ts';

import { z } from 'zod';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseGender = (gender: unknown): Gender => {
  return z.enum(Gender).parse(gender);
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatient = {
      name: z.string().parse(object.name),
      dateOfBirth: z.iso.date().parse(object.dateOfBirth),
      ssn: z.string().parse(object.ssn),
      gender: z.enum(Gender).parse(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default parseNewPatientEntry;