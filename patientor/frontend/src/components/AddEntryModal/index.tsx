import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddEntryForm from "./AddEntryForm";

import { EntryWithoutId, type Diagnosis } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
  title?: string;
  diagnoses: Diagnosis[];
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, title = "New Entry", diagnoses }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>{title}</DialogTitle>

    <Divider />

    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}

      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
