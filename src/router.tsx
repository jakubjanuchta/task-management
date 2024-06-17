import { createBrowserRouter } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import LoginScreen from './screens/LoginScreen';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen />,
  },
  {
    path: '/login',
    element: <LoginScreen />,
  },
  {
    path: '/projects',
    element: <ProjectsScreen />,
  },
]);

export default AppRouter;
