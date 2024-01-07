import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import baseURL from "@/apiConfig";
import AuthContext from "../../context/AuthContext";
import ReactApexChart from "react-apexcharts";
import Loader from "../../common/Loader";

const GenderBasedCurrentJob = () => {
    let { authTokens } = useContext(AuthContext);
    const [options, setOptions] = useState({
        colors: ["#3C50E0", "#80CAEE"],
        chart: {
            fontFamily: "Satoshi, sans-serif",
            type: "bar",
            height: 335,
            stacked: true,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        responsive: [
            {
                breakpoint: 1536,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 0,
                            columnWidth: "50%",
                        },
                    },
                },
            },
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 0,
                columnWidth: "25%",
                borderRadiusApplication: "end",
                borderRadiusWhenStacked: "last",
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ["Female", "Male"],
        },
        legend: {
            position: "top",
            horizontalAlign: "left",
            fontFamily: "Satoshi",
            fontWeight: 500,
            fontSize: "14px",
            markers: {
                radius: 99,
            },
        },
        fill: {
            opacity: 1,
        },
    });

    const [data, setData] = useState({
        series: [
            {
                name: "Male",
                data: [0, 0],
            },
            {
                name: "Female",
                data: [0, 0],
            },
        ],
    });
    const [tempData, setTempData] = useState({
        series: [
            {
                name: "Male",
                data: [0, 0],
            },
            {
                name: "Female",
                data: [0, 0],
            },
        ],
    });
    const [maleData, setMaleData] = useState(null);
    const [femaleData, setFemaleData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([false, "", 0]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${baseURL}/api/gender-current-job`,
                {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`,
                    },
                }
            );
            const data = response.data;
            setData({
                series: [
                    {
                        name: "Employed",
                        data: [data.current_job_female, data.current_job_male],
                    },
                    {
                        name: "Alumni",
                        data: [data.alumni_female, data.alumni_male],
                    },
                ],
            });
            setTempData({
                series: [
                    {
                        name: "Employed",
                        data: [data.current_job_female, data.current_job_male],
                    },
                    {
                        name: "Alumni",
                        data: [data.alumni_female, data.alumni_male],
                    },
                ],
            });
            setMaleData({
                series: [
                    {
                        name: "Employed",
                        data: [data.current_job_male],
                    },
                    {
                        name: "Alumni",
                        data: [data.alumni_male],
                    },
                ],
            });
            setFemaleData({
                series: [
                    {
                        name: "Employed",
                        data: [data.current_job_female],
                    },
                    {
                        name: "Alumni",
                        data: [data.alumni_female],
                    },
                ],
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError([true, error.code, error.response.status]);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;

        if (value === "male") {
            setData(maleData);
            setOptions((prevOptions) => ({
                ...prevOptions,
                xaxis: {
                    categories: ["Male"],
                },
            }));
        } else if (value === "female") {
            setData(femaleData);
            setOptions((prevOptions) => ({
                ...prevOptions,
                xaxis: {
                    categories: ["Female"],
                },
            }));
        } else {
            setData(tempData);
            setOptions((prevOptions) => ({
                ...prevOptions,
                xaxis: {
                    categories: ["Female", "Male"],
                },
            }));
        }
    };

    if (error[0]) {
        return (
            <div className="text-error text-lg grid place-content-center col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
                ERROR : {error[1]} {error[2]}
            </div>
        );
    }

    return loading ? (
        <div className="col-span-12 xl:col-span-4 animate-pulse">
            <Loader />
        </div>
    ) : (
        <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
            <div className="mb-4 justify-between gap-4 sm:flex">
                <div>
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Gender based
                    </h4>
                </div>
                <div>
                    <div className="relative z-20 inline-block">
                        <select
                            onChange={handleChange}
                            name="#"
                            id="#"
                            className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none">
                            <option
                                value=""
                                className="border-transparent bg-white dark:bg-boxdark text-graydark dark:text-white">
                                Select Gender
                            </option>
                            <option
                                value="male"
                                className="border-transparent bg-white dark:bg-boxdark text-graydark dark:text-white">
                                Male
                            </option>
                            <option
                                value="female"
                                className="border-transparent bg-white dark:bg-boxdark text-graydark dark:text-white">
                                Female
                            </option>
                        </select>
                        <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
                            <svg
                                width="10"
                                height="6"
                                viewBox="0 0 10 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                                    fill="#637381"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                                    fill="#637381"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <div id="chartTwo" className="-ml-5 -mb-9">
                    <ReactApexChart
                        options={options}
                        series={data.series}
                        type="bar"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};
export default GenderBasedCurrentJob;
