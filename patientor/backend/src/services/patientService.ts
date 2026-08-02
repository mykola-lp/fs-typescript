import { v1 as uuid } from 'uuid';

import patients from '../../data/patients.ts';
import type { Patient, NonSensitivePatient, NewPatient, Entry, EntryWithoutId } from '../types.ts';

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

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry | undefined => {
  const patient = findById(patientId);
  if (!patient) return undefined;

  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry
};