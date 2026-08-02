import { Typography } from '@mui/material';

import WorkIcon from '@mui/icons-material/Work';

import type { Entry } from "../../types";

interface Props {
  entry: Extract<Entry, { type: "OccupationalHealthcare" }>;
}

const OccupationalHealthcareEntry = ({ entry }: Props) => {
  return (
    <div>
      <Typography>
        {entry.date} <WorkIcon fontSize="small" /> <em>{entry.employerName}</em>
      </Typography>

      <Typography><em>{entry.description}</em></Typography>

      <Typography>diagnose by {entry.specialist}</Typography>
    </div>
  );
};

export default OccupationalHealthcareEntry;
