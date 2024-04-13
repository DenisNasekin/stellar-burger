import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeedOrders = createAsyncThunk(
  'getFeedOrders/getFeedsApi',
  async () => {
    const res = await getFeedsApi();
    return res;
  }
);

export const getUserOrders = createAsyncThunk(
  'getUserOrders/getOrdersApi',
  async () => {
    const res = await getOrdersApi();
    return res;
  }
);

export type TOrdersState = {
  orders: TOrder[];
  total: number;
  todayTotal: number;
  isLoading: boolean;
};

const initialState: TOrdersState = {
  orders: [],
  total: 0,
  todayTotal: 0,
  isLoading: true
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, actions) => {
      state.orders = actions.payload;
    },
    setTotalOrders: (state, action) => {
      state.total = action.payload;
    },
    setTodayTotal: (state, action) => {
      state.todayTotal = action.payload;
    },
    setIsLoading: (state, action) => {
      state.todayTotal = action.payload;
    }
  },
  selectors: {
    getOrders: (state) => state.orders,
    getTotalOrders: (state) => state.total,
    getTodayTotalOrders: (state) => state.todayTotal,
    getIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state: TOrdersState) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getFeedOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.todayTotal = action.payload.totalToday;
      })
      .addCase(getFeedOrders.rejected, (state, action) => {
        state.orders = [];
        state.total = 0;
        state.todayTotal = 0;
      });
  }
});

export const { setOrders, setTotalOrders, setTodayTotal, setIsLoading } =
  ordersSlice.actions;
export const { getOrders, getTotalOrders, getTodayTotalOrders, getIsLoading } =
  ordersSlice.selectors;
export const ordersReducer = ordersSlice.reducer;
