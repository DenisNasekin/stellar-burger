import { Navigate, useLocation, useParams } from 'react-router-dom';

import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader/preloader';

interface ProtectedRouteProps {
  children: JSX.Element;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();

  return children;
};
