import SurveyPage from "../pages/SurveyPage";
import NewsPage from "../pages/NewsPage";
import EventPage from "../pages/EventPage";
import NewsItemPage from "../pages/NewsItemPage";
import EventItemPage from "../pages/EventItemPage";

const coreRoutes = [
  {
    path: "/event/:title",
    title: "EventItemPage",
    component: EventItemPage,
  },
  {
    path: "/event",
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
