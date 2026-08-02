import { Typography } from '@mui/material';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import type { Entry } from "../../types";

interface Props {
  entry: Extract<Entry, { type: "Hospital" }>;
}

const HospitalEntry = ({ entry }: Props) => {
  return (
    <div>
      <Typography>
        {entry.date} <LocalHospitalIcon fontSize="small" />
      </Typography>

      <Typography><em>{entry.description}</em></Typography>

      <Typography>discharge: {entry.discharge.date} — {entry.discharge.criteria}</Typography>

      <Typography>diagnose by {entry.specialist}</Typography>
    </div>
  );
};

export default HospitalEntry;