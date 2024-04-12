// src/components/VirtualNumberList.tsx

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store'; // Adjust the import path as necessary
import { fetchVirtualNumbersAsync, deleteVirtualNumberAsync, addVirtualNumberAsync } from '../features/virtualNumbersSlice';
import AddVirtualNumberModal from './AddVirtualNumberModal';
import ConfirmationDialog from './DeleteVirtualNumberModal';
import { Box, Button, List, ListItem, ListItemText, Alert } from '@mui/material';

interface VirtualNumber {
  username: string;
  number: string;
}

const VirtualNumberList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [numberToDelete, setNumberToDelete] = useState<string>('');
  const [numberToAdd, setNumberToAdd] = useState<string>('');
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.user?.username) ?? '';
  const virtualNumbers = useSelector((state: RootState) => state.virtualNumbers);


  useEffect(() => {
    if (numberToAdd.length > 0) {
      dispatch<any>(addVirtualNumberAsync({ username, number: numberToAdd }));
      setNumberToAdd('');
    }

    dispatch<any>(fetchVirtualNumbersAsync({username}));
  }, [dispatch, username, numberToAdd]);

  const handleDelete = (number: string) => {
    setIsDialogOpen(true);
    setNumberToDelete(number);
  };

  const handleAdd = (number: string) => {
    if (number.length > 0) {
      setNumberToAdd(number);
    }
  };

  const handleConfirmDeletion = (number: string) => {
    if (number.length > 0) {
      dispatch<any>(deleteVirtualNumberAsync({ username, number }));
      setNumberToDelete('');
    }
    setIsDialogOpen(false);
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Add New Virtual Number
      </Button>
      {virtualNumbers.addStatus === 'failed' && <Alert severity="error">{virtualNumbers.error}</Alert>}
      <List id="virtual">
        {virtualNumbers.numbers.map((number: VirtualNumber) => (
          <ListItem key={number.number}>
            <Button variant="text" color="secondary" onClick={() => handleDelete(number.number)}>
              Delete
            </Button>
            <ListItemText primary={number.number} />
          </ListItem>
        ))}
      </List>
      <AddVirtualNumberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
      />
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => { handleConfirmDeletion(numberToDelete) }}
        number={numberToDelete}
      />
    </Box>
  );
};

export default VirtualNumberList;
