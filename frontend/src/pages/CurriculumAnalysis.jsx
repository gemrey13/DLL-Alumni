import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';


const CurriculumAnalysis = () => {
	const data = [
	  {
	    "name": "Page A",
	    "uv": 6000,
	    "pv": 8400,
	    "amt": 2400
	  },
	  {
	    "name": "Page B",
	    "uv": 3000,
	    "pv": 1398,
	    "amt": 2210
	  },
	  {
	    "name": "Page C",
	    "uv": 2000,
	    "pv": 9800,
	    "amt": 2290
	  },
	  {
	    "name": "Page D",
	    "uv": 2780,
	    "pv": 3908,
	    "amt": 2000
	  },
	  {
	    "name": "Page E",
	    "uv": 1890,
	    "pv": 4800,
	    "amt": 2181
	  },
	  {
	    "name": "Page F",
	    "uv": 2390,
	    "pv": 3800,
	    "amt": 2500
	  },
	  {
	    "name": "Page G",
	    "uv": 3490,
	    "pv": 4300,
	    "amt": 2100
	  }
	]

	              

	return (
		<>
			<Navbar />
			<div className="grid grid-cols-5 grid-rows-5 text-black dark:text-white ml-4 sm:mr-4 my-20 sm:ml-28 sm:my-24">

			    <div className="col-span-4 row-span-5">

			    	<div className='flex flex-wrap sm:flex-nowrap'>
			    		<Card color='bg-fuchsia-300' />
			    		<Card color='bg-rose-200' />
			    		<Card color='bg-amber-200' />
			    	</div>


			    </div>
			    <div className="col-span-2 row-span-2 col-start-5">
			    	
			    	<Card color='bg-amber-200' />

			    </div>
			</div>
			{/*
			<div className='grid grid-cols-2 gap-4 justify-items-stretchr'>

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
			{/*</div>*/}
		</>
	);
};


export default CurriculumAnalysis;