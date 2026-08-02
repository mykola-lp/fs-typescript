import express, { type Request, type Response } from 'express';

import { newPatientParser, newEntryParser, errorMiddleware } from '../middleware.ts';

import { type NonSensitivePatient, type Patient, type NewPatient, type Entry, type EntryWithoutId } from '../types.ts';

import patientService from '../services/patientService.ts';

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

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response<Entry>) => {
  const newEntry = patientService.addEntry(req.params.id, req.body);

  if (newEntry) {
    res.json(newEntry);
  } else {
    res.sendStatus(404);
  }
});

router.use(errorMiddleware);

export default router;
