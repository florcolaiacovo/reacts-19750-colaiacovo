import React, { useContext } from 'react';
import { MdLogout } from 'react-icons/md';
import { useHistory } from 'react-router';

import { UserAuthContext } from '../../Context/UserAuthContext';

export const UserWidget = ({ showUserMenu }) => {
  const { currentUser, logout } = useContext(UserAuthContext);
  const { push } = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    push('/');
  };
  const userWidgetClassNames = showUserMenu
    ? 'user-widget-main'
    : 'user-widget-main --hide';

  return currentUser ? (
    <>
      <div className={userWidgetClassNames}>
        <div className="user-widget-flex">
          <p className="user-widget-txt">{`Mail: ${currentUser.email}`}</p>
          <div className="logout-main">
            <button className="logout-btn" onClick={handleLogout}>
              <span className="user-widget-logout">Cerrar sesión</span>
              <MdLogout className="user-widget-logout-icon" />
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};
