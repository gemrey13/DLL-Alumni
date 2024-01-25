import { lazy } from "react";

import SurveyPage from "../pages/SurveyPage";
import NewsPage from "../pages/NewsPage";

const coreRoutes = [
  {
    path: "/news",
    title: "NewsPage",
    component: NewsPage,
  },
  {
    path: "/tracer-survey-form",
    title: "SurveyPage",
    component: SurveyPage,
  },
];
const landingroutes = [...coreRoutes];
export default landingroutes;
