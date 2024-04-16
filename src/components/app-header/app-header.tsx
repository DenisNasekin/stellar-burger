import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getProfile } from '../../services/auth/slice/user';

export const AppHeader: FC = () => {
  const user = useSelector(getProfile);

  return <AppHeaderUI userName={'' || user?.name} />;
};
