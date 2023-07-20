import React, { useState, useEffect } from 'react';
import { useAxios } from '../../index';
import axios from 'axios';



const TracerAlumniTable = ({ selectedYear, selectedCourse }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [results, setResults] = useState([]);
  const [displayedResults, setDisplayedResults] = useState([]);

  useEffect(() => {
    setPage(1);
    if (selectedYear !== '' || selectedCourse !== '') {
      const apiUrl = `http://127.0.0.1:8000/api/table-data/?year=${selectedYear}&course=${selectedCourse}`;

      axios.get(apiUrl)
        .then(response => {
          setResults(response.data);
          console.log(response.data.length)
          const totalPages = Math.ceil(response.data.length / itemsPerPage);
          setTotalPages(totalPages);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedYear, selectedCourse]);


  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedResults(results.slice(startIndex, endIndex));
  }, [page, results]);


  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };


  const renderPageButtons = () => {
    const buttons = [];

    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(page + 2, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button key={i} className={`px-4 py-2 bg-blue-500 text-white rounded-md mr-2 ${i === page ? 'bg-blue-700' : ''}`} onClick={() => setPage(i)}>
          {i}
        </button>
      );
    }

    return buttons;
  };

  const itemsPerPage = 15;

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedResults(results.slice(startIndex, endIndex));
  }, [page, results]);

  const hasNextPage = page < totalPages;
  const hasDataForNextPage = results.length > page * itemsPerPage;



  const deleteAlumni = (alumniId) => {
    let result = confirm('Are you sure you want to delete this alumni?');

    if (result) {
      axios.delete(`http://127.0.0.1:8000/api/delete-alumni/${alumniId}/`)
      .then(response => {
        console.log('Alumni deleted successfully');
      })
      .catch(error => {
        console.error('Alumni deletion failed:', error);
      });

      location.reload();
    }
  };


  return (
    <>
      <div className="overflow-auto rounded-lg shadow hidden sm:block mt-4" id="table-container">
        <table className="w-full shadow-gray-700 shadow-md bg-gray-400 dark:bg-slate-400">
          <thead className="bg-gray-200 dark:bg-slate-700 dark:text-white text-gray-500 border-b-2 border-gray-200">
            <tr className="text-sm ">
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-left">ID</th>
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-left">First Name</th>
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-left">Last Name</th>
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-left">Staus</th>
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-left">Course</th>
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-left">Grad Year</th>
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-left">Email</th>
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-left">Mobile No.</th>
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-center"></th>
            </tr>
          </thead>
          <tbody className=" divide-gray-100 dark:divide-slate-700">
            {results &&
              displayedResults.map((item, index) => (
                <tr key={index} className="bg-white dark:bg-slate-700 dark:text-white text-gray-500 hover:-translate-y-1 hover:delay-700 transition-transform duration-200">
                  <td className="w-auto p-3 text-sm whitespace-nowrap">{item.alumni__alumni_id}</td>
                  <td className="w-auto p-3 text-sm whitespace-nowrap">{item.alumni__fname}</td>
                  <td className="w-auto p-3 text-sm whitespace-nowrap">{item.alumni__lname}</td>
                  <td className="w-auto whitespace-nowrap">
                    <span className={`inline-flex px-2 text-xs font-semibold leading-5 ${item.employment_status === 'Employed' ? 'text-green-800 bg-green-200' : 'text-white bg-red-500'} rounded-full`}>{item.employment_status === 'Employed' ? 'Employed' : 'Unemployed'}</span>
                  </td>
                  <td className="w-auto p-3 text-sm whitespace-nowrap">{item.course__course_id}</td>
                  <td className="w-auto p-3 text-sm whitespace-nowrap">{item.graduation_year}</td>
                  <td className="w-auto p-3 text-sm whitespace-nowrap">{item.alumni__user__email}</td>
                  <td className="w-auto p-3 text-sm whitespace-nowrap">{item.alumni__contact_number}</td>
                  <td className="w-auto p-3 text-sm whitespace-nowrap text-center">
                    <button className="px-4 py-1 bg-blue-500 rounded-md text-white hover:bg-blue-700 hover:-translate-y-1 transition-transform duration-200"><i className='bx bxs-edit'></i></button>
                    <button onClick={() => deleteAlumni(item.alumni__alumni_id)} className="ml-2 py-1 bg-orange-500 px-3 rounded-md text-white hover:bg-orange-700 hover:-translate-y-1 transition-transform duration-200"><i className='bx bx-trash'></i></button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="text-center flex justify-center mt-4">
        <span>
          Showing {(page - 1) * itemsPerPage + 1}-{Math.min(page * itemsPerPage, results.length)} of {results.length}; Page {page} of {totalPages}
        </span>
      </div>
      <div className="text-center flex justify-center mt-4">
        <button onClick={prevPage} disabled={page === 1} className={`${page === 1 ? 'hidden' : ''} px-4 py-2 bg-blue-500 text-white rounded-md mr-2`}>
          Previous
        </button>
        {renderPageButtons()}
        {page < totalPages && (
          <button onClick={nextPage} className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Next
          </button>
        )}
      </div>

      <div className="bg-white sm:hidden space-y-2 p-4 rounded-lg shadow border-l-4 border-black hover:border-green  hover:-translate-y-1 transition-transform duration-200 mt-5 mr-5">
        <div className="text-lg font-bold text-black flex justify-between ">
          <span>Gem Rey Ranola</span>
          <span>2017</span>
        </div>

        <div className="text-gray-700 text-md font-semibold">
          A10000 <span>Employed</span>
        </div>
        <hr className="border-gray-400" />
        <div className="text-sm text-gray-700 flex justify-between">
          <span>gemreyranola@gmail.com</span>
          <button className="px-4 py-1 bg-blue-500 rounded-md text-white">Edit</button>
        </div>
        <div className="text-sm text-gray-700 flex justify-between">
          <span>09**********</span>
          <button className="ml-2 py-1 bg-orange-500 px-3 rounded-md text-white">Delete</button>
        </div>
      </div>
    </>
  );
};

export default TracerAlumniTable;
