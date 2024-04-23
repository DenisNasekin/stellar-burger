import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeed, getFeedOrders } from '../../services/slices/feed';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(getFeed);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeedOrders());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(getFeedOrders());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
