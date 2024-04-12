// src/components/MobileNumberList.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store'; // Ensure this path matches your store location
import { fetchMobileNumbersAsync } from '../features/mobileNumbersSlice';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const MobileNumberList: React.FC = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.user?.username) ?? '';
  const mobileNumbers = useSelector((state: RootState) => state.mobileNumbers.numbers);
  const mobileNumbersStatus = useSelector((state: RootState) => state.mobileNumbers.status);

  useEffect(() => {
    dispatch<any>(fetchMobileNumbersAsync({ username }));
  }, [dispatch, username]);

  if (mobileNumbersStatus === 'loading') {
    return <div>Loading...</div>;
  }

  const getUsageDate = (usageDate: any) => new Date(usageDate).toDateString();

  return (
    <Table id="detail">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Number</TableCell>
          <TableCell>Usage</TableCell>
          <TableCell>Cost</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {mobileNumbers.map((number) => (
          <TableRow key={number.number}>
            <TableCell>{getUsageDate(number.usageDate)}</TableCell>
            <TableCell>{number.number}</TableCell>
            <TableCell>{number.usage}</TableCell>
            <TableCell>{number.cost}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MobileNumberList;
