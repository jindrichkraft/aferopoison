import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProjectPage from './pages/ProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import IssuePage from './pages/IssuePage';
import ProfilePage from './pages/ProfilePage';
import LogoutPage from './pages/LogoutPage';
import Loader from './components/elements/Loader';
import { useAuth } from './hooks/auth';

import './styles/reset.scss';
import './styles/main.scss';
import './styles/animations.scss';

interface IProtectedRouteProps {
  condition: boolean;
  fallbackPath: string;
}

const ProtectedRoute = ({
  condition,
  fallbackPath,
}: IProtectedRouteProps): JSX.Element => {
  return condition ? <Outlet /> : <Navigate to={fallbackPath} replace />;
};

const App = (): JSX.Element => {
  const { auth } = useAuth();

  if (typeof auth === 'undefined') {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<ProtectedRoute condition={!auth} fallbackPath="/" />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route
        element={<ProtectedRoute condition={!!auth} fallbackPath="/login" />}
      >
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/issue/:id" element={<IssuePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Route>
    </Routes>
  );
};

export default App;
