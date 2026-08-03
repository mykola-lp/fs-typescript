import { useState, SyntheticEvent } from "react";

import dayjs, { type Dayjs } from "dayjs";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { EntryWithoutId } from "../../types";

const entryTypeOptions = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "Hospital", label: "Hospital" },
] as const;

type EntryType = EntryWithoutId["type"];

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const onTypeChange = (event: SelectChangeEvent<EntryType>) => {
    setType(event.target.value as EntryType);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const diagnosisValue = diagnosisCodes
      ? diagnosisCodes.split(',').map((code) => code.trim()).filter(Boolean)
      : undefined;

    const parsedDate = date?.format("YYYY-MM-DD") ?? "";

    const commonFields = {
      date: parsedDate,
      description,
      specialist,
      diagnosisCodes: diagnosisValue,
    };

    if (type === "HealthCheck") {
      onSubmit({
        type,
        ...commonFields,
        healthCheckRating: Number(healthCheckRating) as 0 | 1 | 2 | 3,
      });
      return;
    }

    if (type === "Hospital") {
      onSubmit({
        type,
        ...commonFields,
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      });
      return;
    }

    onSubmit({
      type,
      ...commonFields,
      employerName,
      sickLeave:
        sickLeaveStartDate || sickLeaveEndDate
          ? {
              startDate: sickLeaveStartDate,
              endDate: sickLeaveEndDate,
            }
          : undefined,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={addEntry} sx={{ mt: 2 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="entry-type-label">Entry type</InputLabel>

          <Select<EntryType>
            labelId="entry-type-label"
            value={type}
            label="Entry type"
            onChange={onTypeChange}
          >
            {entryTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <DatePicker
          label="Date"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          slotProps={{
            textField: {
              required: true,
              fullWidth: true,
              sx: { mb: 2 },
            },
          }}
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

        {type === "HealthCheck" && (
          <TextField
            label="Health Check Rating (0-3)"
            required
            fullWidth
            sx={{ mb: 2 }}
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          />
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              required
              fullWidth
              sx={{ mb: 2 }}
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />

            <TextField
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              fullWidth
              sx={{ mb: 2 }}
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />

            <TextField
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              fullWidth
              sx={{ mb: 2 }}
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </>
        )}

        {type === "Hospital" && (
          <>
            <TextField
              label="Discharge Date"
              required
              placeholder="YYYY-MM-DD"
              fullWidth
              sx={{ mb: 2 }}
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />

            <TextField
              label="Discharge Criteria"
              required
              fullWidth
              sx={{ mb: 2 }}
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}

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
    </LocalizationProvider>
  );
};

export default AddEntryForm;
