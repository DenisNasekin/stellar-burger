import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { constructorBurger } from './slices/ingredient';
import { order } from './slices/order';
import { user } from './slices/user';
import { feed } from './slices/feed';

const rootReducer = combineReducers({
  constructorBurger: constructorBurger,
  orderSlice: order,
  user: user,
  feeds: feed
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
