import { Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LineChart, Line,  } from 'recharts';



const TimeTrendChart = () => {
	const data5 = [
	  { year: 2018, howmany: 10 },
	  { year: 2019, howmany: 15 },
	  { year: 2020, howmany: 20 },
	  { year: 2021, howmany: 25 },
	  { year: 2022, howmany: 18 },
	  { year: 2023, howmany: 22 },
	];


	return (
		<>
			<div className="flex flex-wrap mt-10 bg-white rounded-2xl">
          <div className="w-full lg:w-2/3 pl-0 lg:pl-2">

            <div className="w-full p-4 pl-0">
              <div className="w-full rounded-lg flex justify-between items-center px-4 py-2 mb-4">
                <div>
                  <p className="font-semibold text-xl ml-4">Trend Over Time </p>
                </div>
                <span className="text-green-500 font-semibold text-lg">$25.00</span>
              </div>
              <div className="pr-6 pb-4 bg-white dark:bg-gray-800 mt-20 " style={{ width: '100%', height: '100%' }}>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart width={600} height={300} data={data5}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="howmany" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          <div className="w-full xl:w-1/3 px-3 ">
            <div className="w-full p-4 border rounded-lg my-4">
              <div className="w-full flex justify-between items-center px-4 py-2 mb-4">
                <div>
                  <p className="font-semibold text-xl">Details</p>
                </div>
              </div>

              <div className="w-full flex justify-between items-center px-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-400  text-sm">Joseph Brent</p>
                </div>
                <span className="text-gray-400  font-semibold text-sm">$74.99</span>
              </div>

              <div className="w-full flex justify-between items-center px-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-400  text-sm">Jacob Bator</p>
                </div>
                <span className="text-gray-400 font-semibold text-sm">$14.95</span>
              </div>

              <div className="w-full flex justify-between items-center px-4 mb-4 ">
                <div>
                  <p className="font-semibold text-gray-400  text-sm">Alex Mason</p>
                </div>
                <span className="text-gray-400 font-semibold text-sm">$44.99</span>
              </div>

              <div className="w-full flex justify-between items-center px-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-400  text-sm">Joseph Brent</p>
                </div>
                <span className="text-gray-400  font-semibold text-sm">$74.99</span>
              </div>

              <div className="w-full flex justify-between items-center px-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-400  text-sm">Jacob Bator</p>
                </div>
                <span className="text-gray-400 font-semibold text-sm">$14.95</span>
              </div>

              <div className="w-full flex justify-between items-center px-4 mb-4 ">
                <div>
                  <p className="font-semibold text-gray-400  text-sm">Alex Mason</p>
                </div>
                <span className="text-gray-400 font-semibold text-sm">$44.99</span>
              </div>

              <div className="w-full flex justify-between items-center px-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-400  text-sm">Joseph Brent</p>
                </div>
                <span className="text-gray-400  font-semibold text-sm">$74.99</span>
              </div>

              <div className="w-full flex justify-between items-center px-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-400  text-sm">Jacob Bator</p>
                </div>
                <span className="text-gray-400 font-semibold text-sm">$14.95</span>
              </div>

              <div className="w-full flex justify-between items-center px-4 mb-4 ">
                <div>
                  <p className="font-semibold text-gray-400  text-sm">Alex Mason</p>
                </div>
                <span className="text-gray-400 font-semibold text-sm">$44.99</span>
              </div>
              <div className="w-full flex justify-between items-center px-4 mb-4 ">
                <div>
                  <p className="font-semibold text-gray-400  text-sm">Alex Mason</p>
                </div>
                <span className="text-gray-400 font-semibold text-sm">$44.99</span>
              </div>

              <div className="w-full flex justify-between items-center px-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-400  text-sm">Joseph Brent</p>
                </div>
                <span className="text-gray-400  font-semibold text-sm">$74.99</span>
              </div>

              <div className="w-full flex justify-between items-center px-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-400  text-sm">Jacob Bator</p>
                </div>
                <span className="text-gray-400 font-semibold text-sm">$14.95</span>
              </div>

              <div className="w-full flex justify-between items-center px-4 mb-4 ">
                <div>
                  <p className="font-semibold text-gray-400  text-sm">Alex Mason</p>
                </div>
                <span className="text-gray-400 font-semibold text-sm">$44.99</span>
              </div>






            </div>
          </div>
        </div>
		</>
	)
};

export default TimeTrendChart;