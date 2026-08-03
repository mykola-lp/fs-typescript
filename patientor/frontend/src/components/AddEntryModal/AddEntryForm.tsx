import { useState, SyntheticEvent } from "react";

import dayjs, { type Dayjs } from "dayjs";

import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { EntryWithoutId } from "../../types";
import type { Diagnosis } from "../../types";

const entryTypeOptions = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "Hospital", label: "Hospital" },
] as const;

const healthRatingOptions = [
  { value: 0, label: "0 — Healthy" },
  { value: 1, label: "1 — Low Risk" },
  { value: 2, label: "2 — High Risk" },
  { value: 3, label: "3 — Critical Risk" },
] as const;

type EntryType = EntryWithoutId["type"];

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<0 | 1 | 2 | 3>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
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

    const commonFields = {
      date: date?.format("YYYY-MM-DD") ?? "",
      description,
      specialist,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
    };

    if (type === "HealthCheck") {
      onSubmit({
        type,
        ...commonFields,
        healthCheckRating,
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

  const diagnosisOptions = diagnoses.map((diagnosis) => ({
    value: diagnosis.code,
    label: `${diagnosis.code} — ${diagnosis.name}`,
  }));

  const handleDiagnosisCodesChange = (
    event: SelectChangeEvent<string[]>,
  ) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
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

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="diagnosis-codes-label" shrink>
            Diagnosis codes
          </InputLabel>

          <Select<string[]>
            labelId="diagnosis-codes-label"
            multiple
            displayEmpty
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
            input={<OutlinedInput label="Diagnosis Codes" />}
            renderValue={(selected) => (
              selected.length > 0 ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((code) => (
                    <Chip key={code} label={code} />
                  ))}
                </Box>
              ) : (
                <Box sx={{ color: "text.disabled" }}>
                  Select Diagnosis Codes
                </Box>
              )
            )}
          >
            {diagnosisOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {type === "HealthCheck" && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="health-rating-label" shrink>
              Health Check Rating
            </InputLabel>

            <Select<0 | 1 | 2 | 3>
              labelId="health-rating-label"
              value={healthCheckRating}
              label="Health Check Rating"
              onChange={({ target }) =>
                setHealthCheckRating(Number(target.value) as 0 | 1 | 2 | 3)
              }
            >
              {healthRatingOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
