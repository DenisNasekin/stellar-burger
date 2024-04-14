import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeedOrders = createAsyncThunk(
  'getFeedOrders/getFeedsApi',
  async () => {
    const res = await getFeedsApi();
    return res;
  }
);

export const createOrder = createAsyncThunk(
  'createOrder/orderBurgerApi',
  async function (date: string[]) {
    const res = await orderBurgerApi(date);
    return res;
  }
);

export const getUserOrders = createAsyncThunk(
  'getUserOrders/getOrdersApi',
  async function () {
    const res = await getOrdersApi();
    return res;
  }
);

export const getOrderByNumberFromApi = createAsyncThunk(
  'getOrderByNumberFromApi/getOrderByNumberApi',
  async function (number: number) {
    const res = await getOrderByNumberApi(number);
    return res;
  }
);

interface IOrderState {
  feeds: TOrder[];
  orders: TOrder[];
  total: number;
  todayTotal: number;
  isLoading: boolean;
  error: string | undefined;
  request: boolean;
  orderData: TOrder | null;
}

const initialState: IOrderState = {
  feeds: [],
  orders: [],
  total: 0,
  todayTotal: 0,
  isLoading: false,
  error: undefined,
  request: false,
  orderData: null
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderData = null;
    }
  },
  selectors: {
    getOrders: (state) => state.orders,
    getOrderDate: (state) => state.orderData,
    getRequest: (state) => state.request,
    getLoading: (state) => state.isLoading,
    getTotal: (state) => state.total,
    getTodayTotal: (state) => state.todayTotal,
    getFeed: (state) => state.feeds
  },
  extraReducers: (builder) => {
    builder.addCase(getUserOrders.pending, (state) => {
      state.request = true;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.request = false;
      state.orders = action.payload;
    });
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.request = false;
      state.error = action.error.message;
    });
    builder.addCase(createOrder.pending, (state) => {
      state.request = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.request = false;
      state.orderData = action.payload.order;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.request = false;
      state.error = action.error.message;
    });
    builder.addCase(getFeedOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFeedOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.feeds = action.payload.orders;
      state.total = action.payload.total;
      state.todayTotal = action.payload.totalToday;
    });
    builder.addCase(getFeedOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getOrderByNumberFromApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderByNumberFromApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload.orders;
    });
    builder.addCase(getOrderByNumberFromApi.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});

export const {
  getOrders,
  getOrderDate,
  getRequest,
  getLoading,
  getTotal,
  getTodayTotal,
  getFeed
} = orderSlice.selectors;

export const { clearOrder } = orderSlice.actions;

export const order = orderSlice.reducer;
