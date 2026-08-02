import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Typography } from '@mui/material';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Gender, type Patient, type Diagnosis } from "../../types";

import patientService from "../../services/patients";

const genderIcon = {
  [Gender.Male]: <MaleIcon />,
  [Gender.Female]: <FemaleIcon />,
  [Gender.Other]: <TransgenderIcon />,
};

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
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

  const findDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : code;
  };

  return (
    <div>
      <Typography
        variant="h5"
        sx={{
          marginTop: "1em",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: "bold"
        }}
      >
        {patient.name} {genderIcon[patient.gender]}
      </Typography>

      <Typography>ssn: {patient.ssn}</Typography>

      <Typography>occupation: {patient.occupation}</Typography>

      <Typography variant="h6" sx={{ marginTop: "1em", fontWeight: "bold" }}>
        entries
      </Typography>

      {patient.entries.map((entry) => (
        <div key={entry.id} style={{ marginTop: "0.5em" }}>
          <Typography>
            {entry.date} <em>{entry.description}</em>
          </Typography>

          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {findDiagnosisName(code)}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientPage;