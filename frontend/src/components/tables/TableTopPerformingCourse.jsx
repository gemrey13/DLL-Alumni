import BrandOne from "../../images/admin/brand/brand-01.svg";
import BrandTwo from "../../images/admin/brand/brand-02.svg";
import BrandThree from "../../images/admin/brand/brand-03.svg";
import BrandFour from "../../images/admin/brand/brand-04.svg";
import BrandFive from "../../images/admin/brand/brand-05.svg";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import baseURL from "@/apiConfig";
import Loader from "../../common/Loader";

const TableTopPerformingCourse = () => {
    let { authTokens } = useContext(AuthContext);

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([false, "", 0]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${baseURL}/api/top-performing-course`,
                {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`,
                    },
                }
            );
            const data = response.data
            // console.log(data)
            setData(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError([true, error.code, error.response.status]);
        }
    };

    var currentDate = new Date();

    var currentYear = currentDate.getFullYear();

    if (error[0]) {
        return (
            <div className="text-error text-xl grid place-content-center rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
                ERROR : {error[1]} {error[2]}
            </div>
        );
    }
    
    return loading ? (
        <div className="animate-pulse">
            <Loader />
        </div>
        ) : (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Top Performing Course 
                <span className="text-sm text-gray-500"> {' '}
                    {currentYear - 2}-{currentYear - 1}
                </span>
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 text-start xl:p-5">
                        <h5 className="sm:text-sm font-medium xsm:text-base">
                            Course
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="sm:text-sm font-medium xsm:text-base">
                            Satisfaction
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="sm:text-sm font-medium xsm:text-base">
                            Honor Rate
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:py-5 xl:px-0">
                        <h5 className="sm:text-sm font-medium xsm:text-base">
                            Professional Growth
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="sm:text-sm font-medium xsm:text-base">
                            Yearly Growth
                        </h5>
                    </div>
                </div>
                {data.map((course, index) => (
                    <div key={index} className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
                        <div className="flex items-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{course.course}</p>
                        </div>

                        <div className="flex flex-col items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{course.data[0].satisfaction_rate_current_year}
                            </p>
                            <p className="text-sm text-gray-500">{' '}
                                ({course.data[1].satisfaction_rate_prev_year})
                            </p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex flex-col xl:p-5">
                            <p className="text-meta-3">{course.data[0].honor_rate_current_year}%
                            </p>
                            <p className="text-sm text-gray-500">{' '}
                                ({course.data[1].honor_rate_prev_year}%)
                            </p>
                        </div>

                        <div className="hidden flex-col items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black dark:text-white">{course.data[0].professional_growth_rate_current_year}%
                            </p>
                            <p className="text-sm text-gray-500">{' '}
                                ({course.data[1].professional_growth_rate_prev_year}%)
                            </p>
                        </div>

                        <div className="flex flex-col items-center justify-center p-2.5 xl:p-5 ">
                            <p className="text-meta-5">{course.growth_rate_difference}%{' '}
                            </p>
                            <p className="text-sm text-gray-500">
                                ({course.data[1].yearly_growth_prev_year}%-{course.data[0].yearly_growth_current_year}%)
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default TableTopPerformingCourse;
