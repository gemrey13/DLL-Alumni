import { lazy } from "react";

const JobItemPage = lazy(() => import("../pages/user/JobItemPage"));
const Profile = lazy(() => import("../pages/user/Profile"));
const JobPage = lazy(() => import("../pages/user/JobPage"));

const coreRoutes = [
    {
        path: "/u/jobs",
        title: "JobPage",
        component: JobPage,
    },
    {
        path: "/u/job-item/:job_id",
        title: "JobItemPage",
        component: JobItemPage,
    },
    {
        path: "/u/my-profile/",
        title: "Profile",
        component: Profile,
    },
];
const userroutes = [...coreRoutes];
export default userroutes;
