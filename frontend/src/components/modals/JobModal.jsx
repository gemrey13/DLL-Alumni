import React, { forwardRef } from "react";
import { convertToTitleCase } from "../../utils/formatting";

const JobModal = forwardRef(({ jobData, onClose }, ref) => {
  return (
    <dialog ref={ref} className="modal" id="jobModal" open>
      <div className="modal-box w-11/12 max-w-5xl dark:bg-boxdark">
        <h3 className="font-bold text-lg">
          {convertToTitleCase(jobData.title)}
        </h3>
        <p className="py-4">{jobData.description}</p>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Favorite Color</th>
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
                  <td>Blue</td>
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
