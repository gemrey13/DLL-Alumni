import { useState, useEffect } from 'react';
import { Navbar, CustomBar, Footer, Breadcrumb, TimeTrendChart } from '../index';
import { AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar, LineChart, Line, ComposedChart } from 'recharts';

const Analysis = () => {
  const data = [
    {
      name: 'Page A',
      uv: 6000,
      pv: 8400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const data2 = [
    { name: 'Category 1', value: 10 },
    { name: 'Category 2', value: 20 },
    { name: 'Category 3', value: 15 },
    { name: 'Category 4', value: 5 },
  ];

  const data3 = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ];

  const data4 = [
    { field: 'Technology', salary: 100000 },
    { field: 'Education', salary: 95000 },
    { field: 'Finance', salary: 110000 },
    { field: 'Healthcare', salary: 90000 },
    { field: 'Marketing', salary: 85000 },
    { field: 'Engineering', salary: 105000 },
    { field: 'Design', salary: 92000 },
    { field: 'Sales', salary: 88000 },
    { field: 'Media', salary: 86000 },
    { field: 'Consulting', salary: 98000 },
  ];

  const sortedData = data4.sort((a, b) => b.salary - a.salary);
  const highestDemandData = sortedData.slice(0, 3);


  return (
    <>
      <Navbar />
      <div className="text-black dark:text-white ml-4 sm:mr-4 mt-20 sm:ml-24 sm:mt-24">
        <Breadcrumb url={'Analysis'} />

        <div className="flex flex-wrap mt-6">
          <div className="w-full lg:w-1/2 pr-0 lg:pr-2">
            <p className="font-black text-2xl pb-3 flex items-center">
              <i className="fas fa-plus mr-3"></i> Employement Rates
            </p>

            <div className="pr-6 pl-0 pt-8 pb-4 bg-white dark:bg-gray-800 chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart width={400} height={300} data={data2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip contentStyle={{ backgroundColor: '#222', color: '#ccc' }} />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" barSize={60} shape={<CustomBar />} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="w-full lg:w-1/2 pl-0 lg:pl-2 mt-12 lg:mt-0">
            <p className="font-black text-2xl pb-3 flex items-center">
              <i className="fas fa-check mr-3"></i> Salary Distribution
            </p>

            <div className="pr-6 pl-3 pt-8 pb-4 bg-white">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart width={580} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <Legend />

                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                  <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="w-full pl-0 lg:pl-2 mt-12 lg:mt-10">
          <p className="font-black text-2xl pb-3 flex items-center">
            <i className="fas fa-check mr-3"></i> Geographic Distribution
          </p>

          <div className="pr-6 pl-3 pt-8 pb-4 bg-white">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart height={300} data={data3}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                <Line type="monotone" dataKey="amt" stroke="#FFFF00" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full pl-0 lg:pl-2 mt-12 lg:mt-10">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart height={300} data={sortedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="field" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="salary" barSize={50} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <TimeTrendChart />
      </div>

      <Footer />

      {/*<div className='grid grid-cols-2 gap-4 justify-items-stretchr'>

				<div className="text-black dark:text-white ml-4 sm:mr-4 my-20 sm:ml-28 sm:my-24 col-span-1">
					<div className='flex flex-wrap sm:flex-nowrap'>
						<Card color='bg-fuchsia-300' />
						<Card color='bg-rose-200' />
						<Card color='bg-amber-200' />
					</div>

					<AreaChart width={730} height={250} data={data}
					  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
					  <defs>
					    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
					      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
					      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
					    </linearGradient>
					    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
					      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
					      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
					    </linearGradient>
					  </defs>
					  <XAxis dataKey="name" />
					  <YAxis />
					  <CartesianGrid strokeDasharray="3 3" />
					  <Tooltip />
					  <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
					  <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
					  </AreaChart>
					  <Card color='bg-amber-200' />
					  <Card color='bg-amber-200' />
					  <Card color='bg-amber-200' />
					  <Card color='bg-amber-200' /><Card color='bg-amber-200' />
				</div>


				<div className=''>
					<AreaChart width={350} height={200} data={data}
					  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
					  <defs>
					    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
					      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
					      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
					    </linearGradient>
					    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
					      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
					      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
					    </linearGradient>
					  </defs>
					  <XAxis dataKey="name" />
					  <YAxis />
					  <CartesianGrid strokeDasharray="3 3" />
					  <Tooltip />
					  <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
					  <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
					  </AreaChart>
					  <Card color='bg-amber-200' />
					  <Card color='bg-amber-200' />
				</div>*/}
    </>
  );
};

export default Analysis;
