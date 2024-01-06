import { lazy } from "react";

const SurveyPage = lazy(() => import("../pages/SurveyPage"));

const coreRoutes = [
    {
        path: "/tracer-survey-form",
        title: "SurveyPage",
        component: SurveyPage,
    },
];
const landingroutes = [...coreRoutes];
export default landingroutes;
