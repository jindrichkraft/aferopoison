import { Link } from 'react-router-dom';

import { useAuth } from '../../../hooks/auth';

import './PageNavigation.styles.scss';

const PageNavigation = (): JSX.Element => {
  const { auth } = useAuth();

  return (
    <nav className="page-navigation">
      <h2>Page Navigation</h2>
      <ul className="nav-items">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        {auth ? (
          <>
            <li className="nav-item">
              <Link to="/projects">Projects</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile">
                <div className="profile-info">
                  <div className="profile-picture">
                    <img
                      src={`https://api.dicebear.com/6.x/identicon/svg?seed=${auth.userInfo.username}`}
                      alt={auth.userInfo.username}
                    />
                  </div>
                  <p className="display-name">{auth.userInfo.displayName}</p>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/logout">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default PageNavigation;
