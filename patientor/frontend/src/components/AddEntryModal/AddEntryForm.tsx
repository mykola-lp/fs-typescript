import { useState, SyntheticEvent } from "react";

import { Box, TextField, Button } from '@mui/material';

import { EntryWithoutId } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      type: "HealthCheck",
      date,
      description,
      specialist,
      healthCheckRating: Number(healthCheckRating) as 0 | 1 | 2 | 3,
      diagnosisCodes: diagnosisCodes
        ? diagnosisCodes.split(',').map(code => code.trim())
        : undefined,
    });
  };

  return (
    <Box component="form" onSubmit={addEntry} sx={{ mt: 2 }}>
        <TextField
          label="Date"
          required
          placeholder="YYYY-MM-DD"
          fullWidth
          sx={{ mb: 2 }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <TextField
          label="Description"
          required
          fullWidth
          sx={{ mb: 2 }}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <TextField
          label="Specialist"
          required
          fullWidth
          sx={{ mb: 2 }}
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <TextField
          label="Health check rating (0-3)"
          required
          fullWidth
          sx={{ mb: 2 }}
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />

        <TextField
          label="Diagnosis codes (comma-separated)"
          fullWidth
          sx={{ mb: 2 }}
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />

        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          <Button
            type="submit"
            variant="contained"
          >
            Add
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Box>
    </Box>
  );
};

export default AddEntryForm;
