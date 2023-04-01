import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProjectPage from './pages/ProjectPage';
import LogoutPage from './pages/LogoutPage';
import { useAuth } from './hooks/auth';

import './styles/reset.scss';
import './styles/main.scss';

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
    return <p>Loading...</p>;
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
        <Route path="/logout" element={<LogoutPage />} />
      </Route>
    </Routes>
  );
};

export default App;
