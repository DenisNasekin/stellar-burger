import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorItems,
  resetConstructor
} from '../../services/auth/slice/constructorBurger';
import { clearOrder, createOrder } from '../../services/auth/slice/orders';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(getConstructorItems);

  const orderRequest = false;

  const orderModalData = useSelector((state) => state.orders.orderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const order: string[] = [
      constructorItems.bun!._id,
      ...constructorItems.ingredients.map(
        (ingredient: { _id: any }) => ingredient._id
      ),
      constructorItems.bun!._id
    ];
    dispatch(createOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(resetConstructor());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
