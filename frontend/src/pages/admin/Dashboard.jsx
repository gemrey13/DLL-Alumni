import CardFour from '../../components/admin/CardFour.jsx';
import CardOne from '../../components/admin/CardOne.jsx';
import CardThree from '../../components/admin/CardThree.jsx';
import CardTwo from '../../components/admin/CardTwo.jsx';
import ChartOne from '../../components/admin/ChartOne.jsx';
import ChartThree from '../../components/admin/ChartThree.jsx';
import ChartTwo from '../../components/admin/ChartTwo.jsx';
import ChatCard from '../../components/admin/ChatCard.jsx';
// import MapOne from '../../../components/admin/MapOne.jsx';
import TableOne from '../../components/admin/TableOne.jsx';
import AlumniGraduationYearDistribution from '../../components/charts/AlumniGraduationYearDistribution.jsx';
import EmployedWithin6Months from '../../components/charts/EmployedWithin6Months.jsx';
import MonthlyYearDistribution from '../../components/charts/MonthlySalaryDistribution.jsx';

import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import baseURL from "@/apiConfig";
import Loader from "../../common/Loader";
import AuthContext from "../../context/AuthContext";
import GenderBasedCurrentJob from '../../components/charts/GenderBasedCurrentJob.jsx';
import TableTopPerformingCourse from '../../components/tables/TableTopPerformingCourse.jsx';


const Dashboard = () => {
  let { authTokens } = useContext(AuthContext);
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([false, '', 0]);


  useEffect(() => {
    fetchMetricsSum();
  }, [])

  const fetchMetricsSum = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/alumni-metrics-summary`,
        {
            headers: {
                Authorization: `Bearer ${authTokens.access}`,
            },
        })
        const newData = response.data;
        setMetrics(newData);
        setLoading(false);
        // console.log('asds',newData)
    } catch (error) {
      setLoading(false);
      setError([true, error.code, error.response.status]);
    }
  };


  return <>
      {loading ? (
        <div className="grid grid-cols-1 animate-pulse">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardOne data={metrics.employed_alumni} percentage={metrics.percentage_jobs} error={error}/>
          <CardTwo data={metrics.relevant_job} percentage={metrics.percentage_relevant} error={error}/>
          <CardThree data={metrics.promoted_alumni} percentage={metrics.percentage_promoted} error={error}/>
          <CardFour data={metrics.alumni_profiles} percentage={metrics.percentage_alumni} error={error}/>
          </div>
      )}


      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne /> */}
        {/* <ChartTwo /> */}
        {/* <ChartThree /> */}
        {/* <MapOne /> */}
        <AlumniGraduationYearDistribution />
        <GenderBasedCurrentJob />
        <EmployedWithin6Months />
        <MonthlyYearDistribution />
        <div className="col-span-12 xl:col-span-8">
          <TableTopPerformingCourse />
          {/* <TableOne /> */}
        </div>
        <ChatCard />
      </div>
    </>;
};
export default Dashboard;