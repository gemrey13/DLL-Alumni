import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    field: 'Technology',
    employmentRate: 80,
    unemployedRate: 20,
    partTime: 10,
  },
  {
    field: 'Education',
    employmentRate: 90,
    unemployedRate: 10,
    partTime: 15,
  },
  {
    field: 'Employment',
    employmentRate: 75,
    unemployedRate: 25,
    partTime: 5,
  },
];

const EmploymentRateChart = () => {
  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="field" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="employmentRate" stackId="a" fill="#8884d8" />
      <Bar dataKey="unemployedRate" stackId="a" fill="#82ca9d" />
      <Bar dataKey="partTime" stackId="a" fill="#ffc658" />
    </BarChart>
  );
};

export default EmploymentRateChart;

