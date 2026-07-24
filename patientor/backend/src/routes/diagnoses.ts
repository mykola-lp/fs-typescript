import express from 'express';

import diagnosService from '../services/diagnosService.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = diagnosService.getDiagnoses();
  res.send(data);
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnos!');
});

export default router;