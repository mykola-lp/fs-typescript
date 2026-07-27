import express, { type Response } from 'express';

import { z } from 'zod';

import { type NonSensitivePatient, type Patient, NewPatientEntrySchema } from '../types.ts';

import patientService from '../services/patientService.ts';

import parseNewPatientEntry from '../utils.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res: Response<Patient | { error: unknown }>) => {
  try {
    const newPatient = NewPatientEntrySchema.parse(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {      
      res.status(400).send({ error: error.issues });    
    } else {      
      res.status(400).send({ error: 'unknown error' });    
    }  
  }
});

export default router;