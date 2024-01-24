import { lazy } from "react";

const JobItemPage = lazy(() => import("../pages/user/JobItemPage"));
const Profile = lazy(() => import("../pages/user/Profile"));
const EditProfilePage = lazy(() => import("../pages/user/EditProfilePage"));
const JobPage = lazy(() => import("../pages/user/JobPage"));
const SavedJobsPage = lazy(() => import("../pages/user/SavedJobsPage"));
const JobApplicationPage = lazy(
  () => import("../pages/user/JobApplicationPage")
);

const coreRoutes = [
  {
    path: "/u/job-application",
    title: "JobApplicationPage",
    component: JobApplicationPage,
  },
  {
    path: "/u/saved-jobs",
    title: "SavedJobsPage",
    component: SavedJobsPage,
  },
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
  {
    path: "/u/settings/edit-profile",
    title: "EditProfilePage",
    component: EditProfilePage,
  },
];
const userroutes = [...coreRoutes];
export default userroutes;
