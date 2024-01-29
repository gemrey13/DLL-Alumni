import SurveyPage from "../pages/SurveyPage";
import NewsPage from "../pages/NewsPage";
import EventPage from "../pages/EventPage";
import NewsItemPage from "../pages/NewsItemPage";

const coreRoutes = [
  {
    path: "/news",
    title: "EventPage",
    component: EventPage,
  },
  {
    path: "/news/:header",
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
