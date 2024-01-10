import { lazy } from "react";

const JobPage = lazy(() => import("../pages/user/JobPage"));

const coreRoutes = [
    {
        path: "/jobs",
        title: "JobPage",
        component: JobPage,
    },
];
const userroutes = [...coreRoutes];
export default userroutes;
