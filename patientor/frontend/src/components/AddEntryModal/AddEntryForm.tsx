import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from '@mui/material';

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
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <TextField
          label="Health check rating (0-3)"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />

        <TextField
          label="Diagnosis codes (comma-separated)"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />

        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>

          <Grid size="auto">
            <Button
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
