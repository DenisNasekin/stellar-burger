import {
  order,
  initialState,
  createOrder,
  getUserOrders,
  getOrderByNumberFromApi
} from '../services/slices/order';

const mockData = {
  createOrder: {
    pending: {
      type: createOrder.pending.type,
      payload: null
    },
    fulfilled: {
      type: createOrder.fulfilled.type,
      payload: { order: { number: '1' } }
    },
    rejected: {
      type: createOrder.rejected.type,
      error: { message: 'ERROR' }
    }
  },
  getUserOrders: {
    pending: {
      type: getUserOrders.pending.type,
      payload: null
    },
    fulfilled: {
      type: getUserOrders.fulfilled.type,
      payload: { orders: ['order 1', 'order 2'] }
    },
    rejected: {
      type: getUserOrders.rejected.type,
      error: { message: 'ERROR' }
    }
  },
  getOrderByNumberFromApi: {
    pending: {
      type: getOrderByNumberFromApi.pending.type,
      payload: null
    },
    fulfilled: {
      type: getOrderByNumberFromApi.fulfilled.type,
      payload: { orders: ['order 1'] }
    },
    rejected: {
      type: getOrderByNumberFromApi.rejected.type,
      error: { message: 'ERROR' }
    }
  }
};

describe('Проверяем работу order.extraReducers', () => {
  describe('Проверяем работу createOrder', () => {
    it('Проверяем createOrder.pending', () => {
      const res = order(initialState, mockData.createOrder.pending);
      expect(res.isLoading).toBe(true);
      expect(res.request).toBe(true);
    });
    it('Проверяем createOrder.fulfilled', () => {
      const res = order(initialState, mockData.createOrder.fulfilled);
      expect(res.isLoading).toBe(false);
      expect(res.orderData?.number).toBe(
        mockData.createOrder.fulfilled.payload.order.number
      );
    });
    it('Проверяем createOrder.rejected', () => {
      const res = order(initialState, mockData.createOrder.rejected);
      expect(res.isLoading).toBe(false);
      expect(res.request).toBe(false);
      expect(res.error).toBe(mockData.createOrder.rejected.error.message);
    });
  });
  describe('Проверяем работу getUserOrders', () => {
    it('Проверяем getUserOrders.pending', () => {
      const res = order(initialState, mockData.getUserOrders.pending);
      expect(res.isLoading).toBe(true);
      expect(res.request).toBe(true);
    });
    it('Проверяем getUserOrders.fulfilled', () => {
      const res = order(initialState, mockData.getUserOrders.fulfilled);
      expect(res.isLoading).toBe(false);
      expect(res.request).toBe(false);
      expect(res.orders).toBe(mockData.getUserOrders.fulfilled.payload);
    });
    it('Проверяем getUserOrders.rejected', () => {
      const res = order(initialState, mockData.getUserOrders.rejected);
      expect(res.request).toBe(false);
      expect(res.isLoading).toBe(false);
      expect(res.error).toBe(mockData.getUserOrders.rejected.error.message);
    });
  });
  describe('Проверяем работу getOrderByNumberFromApi', () => {
    it('Проверяем getOrderByNumberFromApi.pending', () => {
      const res = order(initialState, mockData.getOrderByNumberFromApi.pending);
      expect(res.isLoading).toBe(true);
    });
    it('Проверяем getOrderByNumberFromApi.fulfilled', () => {
      const res = order(
        initialState,
        mockData.getOrderByNumberFromApi.fulfilled
      );
      expect(res.isLoading).toBe(false);
      expect(res.orderData).toBe(
        mockData.getOrderByNumberFromApi.fulfilled.payload.orders[0]
      );
    });
    it('Проверяем getOrderByNumberFromApi.rejected', () => {
      const res = order(
        initialState,
        mockData.getOrderByNumberFromApi.rejected
      );
      expect(res.isLoading).toBe(false);
      expect(res.error).toBe(
        mockData.getOrderByNumberFromApi.rejected.error.message
      );
    });
  });
});
