import React, { forwardRef } from "react";
import { convertToTitleCase } from "../../utils/formatting";

const JobModal = forwardRef(({ jobData, onClose }, ref) => {
  return (
    <dialog ref={ref} className="modal" id="jobModal" open>
      <div className="modal-box w-11/12 max-w-5xl dark:bg-boxdark">
        <h3 className="font-bold text-lg dark:text-white">
          {convertToTitleCase(jobData.title)}
        </h3>
        <p className="py-4">{jobData.description}</p>
        <h3 className="dark:text-white">Applicants:</h3>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="dark:text-white">
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {jobData.applicants_names.map((applicant, index) => (
                <tr
                  key={index + 1}
                  className="hover:bg-bodydark dark:hover:bg-boxdark-2">
                  <th>{index + 1}</th>
                  <td>
                    {applicant.first_name} {applicant.last_name}
                  </td>
                  <td>{applicant.email}</td>
                  <td>{applicant.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
});
export default JobModal;
