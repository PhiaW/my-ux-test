import HomePage          from '../pages/HomePage.jsx'
import WorkListPage       from '../pages/WorkListPage.jsx'
import CaseStudyPage      from '../pages/CaseStudyPage.jsx'
import AboutPage          from '../pages/AboutPage.jsx'
import NotFoundPage       from '../pages/NotFoundPage.jsx'
import { DesignSystemPage } from '../design-system/DesignSystem.jsx'
import { ROUTES }         from './paths.js'

export { ROUTES }

export const routeConfig = [
  { path: ROUTES.HOME,          element: <HomePage /> },
  { path: ROUTES.WORK,          element: <WorkListPage /> },
  { path: ROUTES.WORK_DETAIL,   element: <CaseStudyPage /> },
  { path: ROUTES.ABOUT,         element: <AboutPage /> },
  { path: ROUTES.DESIGN_SYSTEM, element: <DesignSystemPage /> },
  { path: '*',                  element: <NotFoundPage /> },
]
