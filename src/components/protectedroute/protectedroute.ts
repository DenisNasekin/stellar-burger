import { Navigate, useLocation } from 'react-router-dom';
import { getIsInitUser, getRequestUser, getProfile } from '../../services/auth/slice/user';
import { useSelector } from '../../services/store';
import { FC } from 'react';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
    component: JSX.Element
    onlyUnAuth?: boolean;
  };
export const ProtectedRoute:FC<ProtectedRouteProps> = ({component, onlyUnAuth = false }): JSX.Element   => {
    const userInit = useSelector(getIsInitUser);
    const user = useSelector(getProfile);
    const reguest = useSelector(getRequestUser);
    const location = useLocation();
    const from = location.state?.from || { pathname: '/' };
    
    if (!userInit && reguest) {
      return <Preloader />;
    }
  
    if (!onlyUnAuth && !user) {
        <Navigate replace to='/login' state={{ from: location }} />;
    }
  
    if (onlyUnAuth && user) {
        return <Navigate replace to={from} state={location} />;
    }
  
    return component;
};