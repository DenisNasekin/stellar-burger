import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TCreateOrder = {
  request: boolean;
  data: TOrder | null;
};

const initialState: TCreateOrder = {
  request: false,
  data: null
};

export const createOrder = createAsyncThunk(
  'createOrder/createOrder',
  async function (orderIds: string[]) {
    const res = await orderBurgerApi(orderIds);
    return res;
  }
);

const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState,
  reducers: {},
  selectors: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.request = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.request = false;
      state.data = action.payload.order;
    });
    builder.addCase(createOrder.pending, (state) => {
      state.request = false;
    });
  }
});
