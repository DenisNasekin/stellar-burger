import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getProfile } from '../../services/auth/slice/user';

export const AppHeader: FC = () => {
  const profile = useSelector(getProfile);
  //Выводим имя пользователя
  return <AppHeaderUI userName={'' || profile?.name} />;
};
