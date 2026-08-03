import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { Typography, Button } from '@mui/material';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";

import { Gender, type Patient, type Diagnosis, type EntryWithoutId } from "../../types";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      const fetchedPatient = await patientService.getById(id);
      setPatient(fetchedPatient);
    };

    void fetchPatient();
  }, [id]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    if (!id || !patient) return;

    try {
      const newEntry = await patientService.createEntry(id, values);
      setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
      setError(undefined);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "object" && "error" in e.response.data) {
          const zodErrors = e.response.data.error as { message: string; path: string[] }[];
  
          const messages = zodErrors
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join(', ');

          setError(messages);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        setError("Unknown error");
      }
    }
  };

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
        <div
          key={entry.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "0.5em 1em",
            marginTop: "1em"
          }}
        >
          <EntryDetails entry={entry} />

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

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />

      <Button variant="contained" sx={{ marginTop: "1em" }} onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
