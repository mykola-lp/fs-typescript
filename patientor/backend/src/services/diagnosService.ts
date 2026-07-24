import diagnosData from '../../data/diagnoses.ts';

import type { Diagnosis } from '../types.ts';

const diagnoses: Diagnosis[] = diagnosData as Diagnosis[];

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

const addDiagnos = () => {
  return null;
};

export default {
  getEntries,
  addDiagnos
};