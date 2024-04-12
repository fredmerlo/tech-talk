import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (number: string) => void;
}

const AddVirtualNumberModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [number, setNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(number);
    setNumber('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="number"
            label="New Number"
            name="number"
            autoFocus
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Add Number
          </Button>
          <Button type="button" fullWidth onClick={onClose}>
            Cancel
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddVirtualNumberModal;