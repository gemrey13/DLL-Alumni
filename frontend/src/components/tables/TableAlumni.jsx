import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import baseURL from "@/apiConfig";

const TableAlumni = () => {
  const { register, watch } = useForm();
  let { authTokens } = useContext(AuthContext);

  const [alumniData, setAlumniData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  const [curriculumData, setCurriculumData] = useState([]);

  useEffect(() => {
    fetchData();
    fetchCourses();
    fetchCurriculum();
  }, []);

  useEffect(() => {
    const data = {
      curriculum_no: watch("curriculum_no"),
      course: watch("course"),
      no_of_units: watch("no_of_units"),
    };
    fetchData(data);
  }, [watch("curriculum_no"), watch("course"), watch("no_of_units")]);

  const fetchCurriculum = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/curriculum-list`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setCurriculumData(response.data);
    } catch (err) {
      setCurriculumData([]);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/course-list`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setCoursesData(response.data);
    } catch (err) {
      setCoursesData([]);
    }
  };

  const fetchData = async (formValues) => {
    try {
      const response = await axios.get(`${baseURL}/api/table-alumni`, {
        params: formValues,
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      const data = response.data;
      setAlumniData(data.results);
      setNextPage(data.next);
    } catch (err) {
      setAlumniData([]);
      setNextPage(null);
    }
  };

  const loadMoreData = async () => {
    try {
      const response = await axios.get(nextPage, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setAlumniData([...alumniData, ...response.data.results]);
      setNextPage(response.data.next);
    } catch (err) {
      setAlumniData([]);
      setNextPage(null);
    }
  };

  return (
    <>
      <form className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            CMO no.
          </label>
          <div className="relative z-20 bg-white dark:bg-form-input">
            <select
              {...register("curriculum_no")}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
              <option value="">see all</option>
              {curriculumData.map((curriculum) => (
                <option key={curriculum.cmo_no} value={curriculum.cmo_no}>
                  {curriculum.cmo_no} ({curriculum.start_year}-
                  {curriculum.end_year})
                </option>
              ))}
            </select>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill="#637381"></path>
                </g>
              </svg>
            </span>
          </div>
        </div>

        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            Course
          </label>
          <div className="relative z-20 bg-white dark:bg-form-input">
            <select
              {...register("course")}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
              <option value="">see all</option>
              {coursesData.map((course_name) => (
                <option key={course_name} value={course_name}>
                  {course_name}
                </option>
              ))}
            </select>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill="#637381"></path>
                </g>
              </svg>
            </span>
          </div>
        </div>

        <div className="w-full xl:w-1/2">
          <label className="mb-3 block text-black dark:text-white">
            No. of Units
          </label>
          <input
            {...register("no_of_units")}
            type="text"
            placeholder="Default Input"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
      </form>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                  Employment Status
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Course
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Batch Year
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {alumniData.map((alumni) => (
                <tr key={alumni.alumni_id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {alumni.alumni_lname}, {alumni.alumni_fname}
                    </h5>
                    <p className="text-sm">#{alumni.alumni_id}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {alumni.has_current_job ? (
                      <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                        {alumni.employment_status}
                      </p>
                    ) : (
                      <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                        Unemployed
                      </p>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {alumni.course}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {alumni.year_graduated - 1}-{alumni.year_graduated}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link
                        to={`/admin/profile/${alumni.alumni_id}`}
                        className="hover:text-primary">
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                            fill=""
                          />
                          <path
                            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <button className="hover:text-primary">
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                            fill=""
                          />
                        </svg>
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {nextPage && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMoreData}
              className="px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-dark">
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TableAlumni;
