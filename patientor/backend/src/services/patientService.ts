import patients from '../../data/patients.ts';

import type { Patient, NonSensitivePatient } from '../types.ts';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient
};