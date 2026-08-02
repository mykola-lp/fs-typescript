import express, { type Request, type Response } from 'express';

import { newPatientParser, errorMiddleware } from '../middleware.ts';
import patientService from '../services/patientService.ts';
import { type NonSensitivePatient, type Patient, type NewPatient } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req: Request<{ id: string }>, res: Response<Patient>) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;