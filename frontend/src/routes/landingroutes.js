import SurveyPage from "../pages/SurveyPage";
import NewsPage from "../pages/NewsPage";
import NewsItemPage from "../pages/NewsItemPage";

const coreRoutes = [
  {
    path: "/news/item",
    title: "NewsItemPage",
    component: NewsItemPage,
  },
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
