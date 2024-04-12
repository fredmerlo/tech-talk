import React from 'react';
// import { ModalBackdrop, ModalContainer, Button } from './styles/VirtualNumberModalStyle';
import { Modal, Box, Typography, Button } from '@mui/material';


interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  number: string;
}

const ConfirmationDialog: React.FC<Props> = ({ isOpen, onClose, onConfirm, number }) => {
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
        <Typography variant="body1">{`Are you sure you want to delete the ${number} number?`}</Typography>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationDialog;