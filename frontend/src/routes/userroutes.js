import { lazy } from "react";

const JobItemPage = lazy(() => import("../pages/user/JobItemPage"));

const coreRoutes = [
    {
        path: "/u/job-item",
        title: "JobItemPage",
        component: JobItemPage,
    },
];
const userroutes = [...coreRoutes];
export default userroutes;
