import { lazy } from "react";

const JobItemPage = lazy(() => import("../pages/user/JobItemPage"));
const Profile = lazy(() => import("../pages/user/Profile"));

const coreRoutes = [
    {
        path: "/u/job-item/:job_id",
        title: "JobItemPage",
        component: JobItemPage,
    },
    {
        path: "/u/my-profile/:user_id",
        title: "Profile",
        component: Profile,
    },
];
const userroutes = [...coreRoutes];
export default userroutes;
