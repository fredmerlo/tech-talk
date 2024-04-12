
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMobileNumbersAsync } from '../features/mobileNumbersSlice';
import MobileNumberList from './MobileNumberList';
import { RootState } from '../app/store';
import { BarChart } from '@mui/x-charts';
import { Box, Typography } from '@mui/material';

const ChartsTab: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    if (user?.username) {
      dispatch<any>(fetchMobileNumbersAsync({username: user.username}));
    }
  }, [dispatch, user]);

  const mobileNumbers = useSelector((state: RootState) => state.mobileNumbers.numbers);

  const getYearMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, '0')}`;
  };

  const getCost = (cost: string) => parseFloat(cost.replace('$', '').replace(',', ''));
  const getUsage = (usage: string) => parseInt(usage.replace(' minutes', ''));
  
  const reduceData = (numbers: Array<{number: string, usageDate: string, usage: string, cost: string}>, getValue: (number: {number: string, usageDate: string, usage: string, cost: string}) => number) => {
    return numbers.reduce((acc, number) => {
      const yearMonth = getYearMonth(new Date(number.usageDate));
      const value = getValue(number);
  
      acc[number.number] = acc[number.number] || {};
      acc[number.number][yearMonth] = (acc[number.number][yearMonth] || 0) + value;
  
      return acc;
    }, {} as Record<string, Record<string, number>>);
  };
  
  const getSeries = (data: Record<string, Record<string, number>>, xAxis: string[]) => {
    return Object.entries(data).map(([number, values]) => ({
      label: number,
      data: xAxis.map((yearMonth: string) => (values as Record<string, number>)[yearMonth] || 0),
    }));
  };
  
  const costData = reduceData(mobileNumbers, number => getCost(number.cost));
  const usageData = reduceData(mobileNumbers, number => getUsage(number.usage));
  
  const xAxis = Array.from(new Set(Object.values(costData).flatMap(Object.keys))).sort() as string[];
  
  const costSeries = getSeries(costData, xAxis);
  const usageSeries = getSeries(usageData, xAxis);

  return (
    <>
      <Typography sx={{ mt: 3, ml: 2 }} variant="h4" gutterBottom>
        Plan Usage
      </Typography>
      < Box display="flex" sx={{ mt: 5, ml: 5, mb: 3 }} gap={10}  flexDirection="row">
        <div id="cost">
        <BarChart
          xAxis={[{ scaleType: 'band', data: xAxis }]}
          series={costSeries}
          width={600}
          height={500}
        />
        <Typography sx={{ ml: 28 }}  component="div" variant="h6">Cost per Number</Typography>
        </div>
        <div id="usage">
          <BarChart
            xAxis={[{ scaleType: 'band', data: xAxis }]}
            series={usageSeries}
            width={600}
            height={500}
          />
          <Typography sx={{ ml: 25 }} component="div" variant="h6">Minutes per Number</Typography>
        </div>
      </Box>
      <Box>
        <MobileNumberList />
      </Box>
    </>
  );
};

export default ChartsTab;
