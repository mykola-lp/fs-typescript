// --- Diagnosis ---
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// --- Patient ---
export type Gender = 'male' | 'female' | 'other';

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;