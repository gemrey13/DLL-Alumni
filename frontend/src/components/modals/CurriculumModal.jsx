import React, { forwardRef } from "react";
import { convertToTitleCase } from "../../utils/formatting";

const CurriculumModal = forwardRef(({ curriculumData, onClose }, ref) => {
  return (
    <dialog ref={ref} className="modal" id="jobModal" open>
      <div className="modal-box w-11/12 max-w-5xl dark:bg-boxdark">
        <h3 className="font-bold text-lg dark:text-white">
          {convertToTitleCase(curriculumData.cmo_no)}
        </h3>
        <p className="py-4">{curriculumData.description}</p>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
});
export default CurriculumModal;
