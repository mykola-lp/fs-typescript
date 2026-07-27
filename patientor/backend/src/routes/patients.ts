import express, { type Request, type Response } from 'express';

import { type NonSensitivePatient, type Patient, type NewPatient } from '../types.ts';

import patientService from '../services/patientService.ts';

import { newPatientParser } from '../middleware.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

export default router;