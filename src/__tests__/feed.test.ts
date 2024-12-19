import { feed, initialState, getFeedOrders } from '../services/slices/feed';

const mockData = {
  pending: {
    type: getFeedOrders.pending.type,
    payload: null
  },
  rejected: {
    type: getFeedOrders.rejected.type,
    error: { message: 'ERROR' }
  },
  fulfilled: {
    type: getFeedOrders.fulfilled.type,
    payload: { orders: ['order1', 'order2'] }
  }
};

describe('Проверяем работу Feed.extraReducers', () => {
  it('Проверяем getFeedOrders.pending', () => {
    const res = feed(initialState, mockData.pending);
    expect(res.isLoading).toBe(true);
  });
  it('Проверяем getFeedOrders.fulfilled', () => {
    const res = feed(initialState, mockData.fulfilled);
    expect(res.isLoading).toBe(false);
    expect(res.feeds).toEqual(mockData.fulfilled.payload.orders);
  });
  it('Проверяем getFeedOrders.rejected', () => {
    const res = feed(initialState, mockData.rejected);
    expect(res.isLoading).toBe(false);
    expect(res.error).toBe(mockData.rejected.error.message);
  });
});
