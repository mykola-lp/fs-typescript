import { Typography } from '@mui/material';

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

import type { Entry } from "../../types";

const ratingColor = ['green', 'yellow', 'orange', 'red'];

interface Props {
  entry: Extract<Entry, { type: "HealthCheck" }>;
}

const HealthCheckEntry = ({ entry }: Props) => {
  return (
    <div>
      <Typography>
        {entry.date} <MedicalServicesIcon fontSize="small" />
      </Typography>

      <Typography><em>{entry.description}</em></Typography>

      <FavoriteIcon sx={{ color: ratingColor[entry.healthCheckRating] }} />

      <Typography>diagnose by {entry.specialist}</Typography>
    </div>
  );
};

export default HealthCheckEntry;
