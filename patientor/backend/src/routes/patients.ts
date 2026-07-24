import express, { type Response } from 'express';

import type { NonSensitivePatient } from '../types.ts';
import patientService from '../services/patientService.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.post('/', (_req, res: Response<string>) => {
  res.send('Saving a patient!');
});

export default router;