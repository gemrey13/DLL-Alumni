import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import baseURL from "@/apiConfig";
import AuthContext from "../../context/AuthContext";
import Loader from "../../common/Loader";


const AlumniGraduationYearDistribution = () => {
    let { authTokens } = useContext(AuthContext);
    const [data, setData] = useState({
        series: [
            {
                name: "Graduated",
                data: [],
            }
        ],
    });

    const [options, setOptions] = useState({
        legend: {
            show: false,
            position: "top",
            horizontalAlign: "left",
        },
        colors: ["#3C50E0", "#80CAEE"],
        chart: {
            fontFamily: "Satoshi, sans-serif",
            height: 335,
            type: "area",
            dropShadow: {
                enabled: true,
                color: "#623CEA14",
                top: 10,
                blur: 4,
                left: 0,
                opacity: 0.1,
            },
            zoom: {
                type: "x",
                enabled: true,
                autoScaleYaxis: true,
            },
            toolbar: {
                autoSelected: "zoom",
            },
        },
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        height: 300,
                    },
                },
            },
            {
                breakpoint: 1366,
                options: {
                    chart: {
                        height: 350,
                    },
                },
            },
        ],
        stroke: {
            width: [2, 2],
            curve: "straight",
        },
        // labels: {
        //   show: false,
        //   position: "top",
        // },
        grid: {
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 4,
            colors: "#fff",
            strokeColors: ["#3056D3", "#80CAEE"],
            strokeWidth: 3,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            hover: {
                size: undefined,
                sizeOffset: 5,
            },
        },
        xaxis: {
            type: "category",
            categories: [],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            title: {
                style: {
                    fontSize: "0px",
                },
            },
            min: 0,
            max: 5,
        },
    });
    const [date, setDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([false, '', 0]);


    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/graduation-year-dist`,
            {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            })
            const data = response.data;
            let years = data.map(item => item.year_graduated);
            const alumniCount = data.map(item => item.alumni_count);
            setDate(years);
            years = years.sort((a, b) => a - b)
            setOptions((prevOptions) => ({
                ...prevOptions,
                xaxis: {
                    ...prevOptions.xaxis,
                    categories: years,
                },
                yaxis: {
                    ...prevOptions.yaxis,
                    max: Math.max(...alumniCount) + 5
                }

            }));
            setData({
                series: [
                    {
                        name: "Graduated",
                        data: alumniCount,
                    }
                ],
            })
            setLoading(false);
        } catch (error) {
            setError([true, error.code, error.response.status]);
        }
    }

    if (error[0]) {
        return (
            <div className="text-error text-xl grid place-content-center col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
                ERROR : {error[1]} {error[2]}
            </div>
        );
    }

    return loading ? (
        <div className="col-span-12 xl:col-span-7">
            <Loader />
        </div>
        ) : (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div>
                    <h4 className="text-xl font-semibold text-primary dark:text-white">
                        Alumni graduation year distribution
                    </h4>
                    <p className="text-sm font-medium">
                    {Math.min(...date)} - {Math.max(...date)}
                    </p>
                </div>

                <div className="flex w-full max-w-45 justify-end">
                    <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
                        <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
                            Day
                        </button>
                        <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                            Week
                        </button>
                        <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                            Month
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div id="chartOne" className="-ml-5">
                    <ReactApexChart
                        options={options}
                        series={data.series}
                        type="area"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};
export default AlumniGraduationYearDistribution;
