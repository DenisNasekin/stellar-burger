import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeedOrders, getFeedState } from '../../services/auth/slice/orders';



export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders, isLoading } = useSelector(getFeedState);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeedOrders());
  }, []);

  const handleGetFeeds = () => {
    dispatch(getFeedOrders());
  };

  if (isLoading) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
