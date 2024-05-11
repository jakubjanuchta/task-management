import { createBrowserRouter } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import ProjectsScreen from './screens/ProjectsScreen';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen />,
  },
  {
    path: '/projects',
    element: <ProjectsScreen />,
  },
]);

export default AppRouter;
