import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import baseURL from "@/apiConfig";
import AuthContext from "../../context/AuthContext";
import ReactApexChart from "react-apexcharts";
import Loader from "../../common/Loader";

const MonthlyYearDistribution = () => {
    let { authTokens } = useContext(AuthContext);
    const [data, setData] = useState({
        series: [{
            x: '',
            y: []
        }]
    });

    const [options, setOptions] = useState({
        chart: {
          type: 'boxPlot',
          height: 350
        },
        plotOptions: {
          boxPlot: {
            colors: {
              upper: '#5C4742',
              lower: '#A5978B'
            }
          }
        },
      });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([false, "", 0]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${baseURL}/api/monthly-salary-dist`,
                {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`,
                    },
                }
            );
            const data = response.data;

            setData({
                series: [{ data: data }]
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError([true, error.code, error.response.status]);
        }
    };

    if (error[0]) {
        return (
            <div className="text-error text-xl grid place-content-center col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-7">
                ERROR : {error[1]} {error[2]}
            </div>
        );
    }

    return loading ? (
        <div className="col-span-12 xl:col-span-7 animate-pulse">
            <Loader />
        </div>
    ) : (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-7">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div>
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Monthly salary distribution by course
                    </h4>
                </div>
            </div>

            <div>
                <div id="chartOne" className="-ml-5">
                    <ReactApexChart
                        options={options}
                        series={data.series}
                        type="boxPlot"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};
export default MonthlyYearDistribution;
