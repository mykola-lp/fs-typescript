import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Typography } from '@mui/material';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Gender, type Patient } from "../../types";

import patientService from "../../services/patients";

const genderIcon = {
  [Gender.Male]: <MaleIcon />,
  [Gender.Female]: <FemaleIcon />,
  [Gender.Other]: <TransgenderIcon />,
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      const fetchedPatient = await patientService.getById(id);
      setPatient(fetchedPatient);
    };

    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography
        variant="h5"
        sx={{
          marginTop: "1em",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        {patient.name} {genderIcon[patient.gender]}
      </Typography>

      <Typography>ssn: {patient.ssn}</Typography>

      <Typography>gender: {patient.gender}</Typography>

      <Typography>occupation: {patient.occupation}</Typography>
    </div>
  );
};

export default PatientPage;
