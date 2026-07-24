import express, { type Response } from 'express';

import diagnosService from '../services/diagnosService.ts';
import type { Diagnosis } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  const data = diagnosService.getDiagnoses();
  res.send(data);
});

router.post('/', (_req, res: Response<string>) => {
  res.send('Saving a diagnos!');
});

export default router;