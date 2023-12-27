import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/admin/Calendar'));
const Chart = lazy(() => import('../pages/admin/Chart'));
const FormElements = lazy(() => import('../pages/admin/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/admin/Form/FormLayout'));
const Profile = lazy(() => import('../pages/admin/Profile'));
const Settings = lazy(() => import('../pages/admin/Settings'));
const Tables = lazy(() => import('../pages/admin/Tables'));
const Alerts = lazy(() => import('../pages/admin/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/admin/UiElements/Buttons'));
const TraceAlumni = lazy(() => import('../pages/admin/TraceAlumni'));
const ImportData = lazy(() => import('../pages/admin/ImportData'));

const coreRoutes = [{
  path: '/admin/task/import-data',
  title: 'ImportData',
  component: ImportData
}, {
  path: '/admin/trace-alumni',
  title: 'TraceAlumni',
  component: TraceAlumni
}, {
  path: '/admin/calendar',
  title: 'Calender',
  component: Calendar
}, {
  path: '/admin/profile',
  title: 'Profile',
  component: Profile
}, {
  path: '/admin/forms/form-elements',
  title: 'Forms Elements',
  component: FormElements
}, {
  path: '/admin/forms/form-layout',
  title: 'Form Layouts',
  component: FormLayout
}, {
  path: '/admin/tables',
  title: 'Tables',
  component: Tables
}, {
  path: '/admin/settings',
  title: 'Settings',
  component: Settings
}, {
  path: '/admin/chart',
  title: 'Chart',
  component: Chart
}, {
  path: '/admin/ui/alerts',
  title: 'Alerts',
  component: Alerts
}, {
  path: '/admin/ui/buttons',
  title: 'Buttons',
  component: Buttons
}];
const adminroutes = [...coreRoutes];
export default adminroutes;