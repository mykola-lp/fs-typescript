import diagnoses from '../../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const addDiagnos = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnos
};