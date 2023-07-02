import { AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';

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

const SalaryDistribution = () => {
  return (
    <>
      <div className="flex flex-wrap mt-2 bg-white w-3/5 rounded-2xl">
        <div className="w-full ">
          <div className="col-span-2 bg-white rounded-md dark:bg-slate-700" x-data="{ isOn: false }">
            <div className="flex items-center justify-between p-4 border-b dark:border-primary">
              <h4 className="text-lg font-semibold text-gray-500 dark:text-gray-300">SalaryDistribution</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Last year</span>
                <button className="relative focus:outline-none">
                  <div className="w-12 h-6 transition rounded-full outline-none bg-primary-100 dark:bg-primary-darker"></div>
                  <div className="absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-200 ease-in-out transform scale-110 rounded-full shadow-sm"></div>
                </button>
              </div>
            </div>

            <div className="relative p-4 h-72">
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
                  <XAxis dataKey="name" axisLine={{ stroke: 'white' }} tick={{ fill: '#999999' }} />
                  <YAxis axisLine={{ stroke: 'white' }} tick={{ fill: '#999999' }} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                  <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalaryDistribution;
