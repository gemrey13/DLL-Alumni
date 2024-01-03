import React from "react";
import Breadcrumb from "../../components/admin/Breadcrumb";
import DataStats from "../../components/admin/DataStats";
import DropdownDefault from "../../components/admin/DropdownDefault";
import SwitcherFour from "../../components/admin/SwitcherFour";
import SwitcherOne from "../../components/admin/SwitcherOne";
import SwitcherThree from "../../components/admin/SwitcherThree";
import SwitcherTwo from "../../components/admin/SwitcherTwo";
import TaskHeader from "../../components/admin/TaskHeader";

const ManageCurriculum = () => {
    return (
        <>
            <Breadcrumb pageName="Curriculum Management" />
            <div>ManageCurriculum</div>
            <DataStats />
            <div>Dropdown default</div>
            <DropdownDefault />
            <SwitcherFour />
            <SwitcherOne />
            <SwitcherThree />
            <SwitcherTwo />
            <div>
                <TaskHeader />
            </div>
        </>
    );
};

export default ManageCurriculum;
