import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { stakeholder: 'Employers', relevance: 80, effectiveness: 70, applicability: 85 },
    { stakeholder: 'Industry Professionals', relevance: 75, effectiveness: 65, applicability: 70 },
    { stakeholder: 'Alumni', relevance: 90, effectiveness: 80, applicability: 75 },
    { stakeholder: 'Educational Experts', relevance: 85, effectiveness: 75, applicability: 80 },
  ];


const StakeholderEngagementChart = () => {

  return (

    <div className='bg-white rounded-md dark:bg-slate-700 mt-2 w-2/5'>

      <div className='flex items-center justify-between p-4 border-b'>
        <h4 className='text-lg font-semibold text-gray-500 dark:text-gray-300'>Stake Holder</h4>
      </div>

      <div className="pr-6 mt-5 p-0">
        <ResponsiveContainer width="100%" height={250}>
        <BarChart width={600} height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis axisLine={{ stroke: 'white' }} tick={{ fill: '#999999' }} dataKey="stakeholder" />
              <YAxis axisLine={{ stroke: 'white' }} tick={{ fill: '#999999' }}/>
              <Tooltip />
              <Legend />
              <Bar dataKey="relevance" stackId="stack" fill="#8884d8" />
              <Bar dataKey="effectiveness" stackId="stack" fill="#82ca9d" />
              <Bar dataKey="applicability" stackId="stack" fill="#ffc658" />
            </BarChart>
        </ResponsiveContainer>
      </div>


    </div>
    
  );
};

export default StakeholderEngagementChart;
