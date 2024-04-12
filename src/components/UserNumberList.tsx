import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store'; // Adjust the import path as necessary
import { fetchUserNumbersAsync, deleteUserNumberAsync, addUserNumberAsync } from '../features/userNumbersSlice';
import AddUserNumberModal from './AddVirtualNumberModal';
import ConfirmationDialog from './DeleteVirtualNumberModal';
import { Box, Button, List, ListItem, ListItemText, Alert } from '@mui/material';

interface UserNumber {
  username: string;
  number: string;
}

const UserNumberList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [numberToDelete, setNumberToDelete] = useState<string>('');
  const [numberToAdd, setNumberToAdd] = useState<string>('');
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.user?.username) ?? '';
  const userNumbers = useSelector((state: RootState) => state.userNumbers);
  const udata = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    if (numberToAdd.length > 0) {
      dispatch<any>(addUserNumberAsync({ username, number: numberToAdd }));
      setNumberToAdd('');
    }

    dispatch<any>(fetchUserNumbersAsync({ username }));
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
      dispatch<any>(deleteUserNumberAsync({ username, number }));
      setNumberToDelete('');
    }
    setIsDialogOpen(false);
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Add New Mobile Number
      </Button> 
      {userNumbers.addStatus === 'failed' && <Alert severity="error">{userNumbers.error}</Alert>}
      <List id="mobile">
        {userNumbers.numbers.map((number: UserNumber) => (
          <ListItem key={number.number}>
            <Button variant="text" color="secondary" disabled={udata.number === number.number} onClick={() => handleDelete(number.number)}>
              Delete
            </Button>
            <ListItemText primary={number.number} />
          </ListItem>
        ))}
      </List>
      <AddUserNumberModal
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

export default UserNumberList;
