import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  getRequest,
  getUserOrders
} from '../../services/auth/slice/orders';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrders);
  const request = useSelector(getRequest);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  if (request) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
