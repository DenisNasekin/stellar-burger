import {
  user,
  initialState,
  setLoginUser,
  logoutUser,
  setRegisterUser,
  updateUser
} from '../services/slices/user';

const mockData = {
  setLoginUser: {
    pending: {
      type: setLoginUser.pending.type,
      payload: null
    },
    fulfilled: {
      type: setLoginUser.fulfilled.type,
      payload: { user: { name: 'username', email: 'email@email.ru' } }
    },
    rejected: {
      type: setLoginUser.rejected.type,
      error: { message: 'ERROR' }
    }
  },
  logoutUser: {
    pending: {
      type: logoutUser.pending.type,
      payload: null
    },
    fulfilled: {
      type: logoutUser.fulfilled.type,
      payload: null
    },
    rejected: {
      type: logoutUser.rejected.type,
      error: { message: 'ERROR' }
    }
  },
  setRegisterUser: {
    pending: {
      type: setRegisterUser.pending.type,
      payload: null
    },
    fulfilled: {
      type: setRegisterUser.fulfilled.type,
      payload: { user: { name: 'username', email: 'email@email.ru' } }
    },
    rejected: {
      type: setRegisterUser.rejected.type,
      error: { message: 'ERROR' }
    }
  },
  updateUser: {
    pending: {
      type: updateUser.pending.type,
      payload: null
    },
    fulfilled: {
      type: updateUser.fulfilled.type,
      payload: { user: { name: 'username2', email: 'email@email.ru2' } }
    },
    rejected: {
      type: updateUser.rejected.type,
      error: { message: 'ERROR' }
    }
  }
};

describe('Проверяем работу user.extraReducers', () => {
  describe('Проверяем работу setLoginUser', () => {
    it('Проверяем setLoginUser.pending', () => {
      const res = user(initialState, mockData.setLoginUser.pending);
      expect(res.request).toBe(true);
      expect(res.isInitUser).toBe(false);
    });
    it('Проверяем setLoginUser.fulfilled', () => {
      const res = user(initialState, mockData.setLoginUser.fulfilled);
      expect(res.request).toBe(false);
      expect(res.isInitUser).toBe(true);
      expect(res.profile).toBe(mockData.setLoginUser.fulfilled.payload.user);
    });
    it('Проверяем setLoginUser.rejected', () => {
      const res = user(initialState, mockData.setLoginUser.rejected);
      expect(res.request).toBe(false);
      expect(res.isInitUser).toBe(false);
      expect(res.error).toBe(mockData.setLoginUser.rejected.error.message);
    });
  });
  describe('Проверяем работу logoutUser', () => {
    it('Проверяем logoutUser.pending', () => {
      const res = user(initialState, mockData.setLoginUser.pending);
      expect(res.request).toBe(true);
    });
    it('Проверяем logoutUser.fulfilled', () => {
      const res = user(initialState, mockData.logoutUser.fulfilled);
      expect(res.request).toBe(false);
      expect(res.isInitUser).toBe(true);
    });
    it('Проверяем logoutUser.rejected', () => {
      const res = user(initialState, mockData.logoutUser.rejected);
      expect(res.request).toBe(false);
      expect(res.isInitUser).toBe(false);
      expect(res.error).toBe(mockData.logoutUser.rejected.error.message);
    });
  });
  describe('Проверяем работу setRegisterUser', () => {
    it('Проверяем setRegisterUser.pending', () => {
      const res = user(initialState, mockData.setRegisterUser.pending);
      expect(res.request).toBe(true);
      expect(res.isInitUser).toBe(false);
    });
    it('Проверяем setRegisterUser.fulfilled', () => {
      const res = user(initialState, mockData.setRegisterUser.fulfilled);
      expect(res.request).toBe(false);
      expect(res.isInitUser).toBe(true);
      expect(res.profile).toBe(mockData.setRegisterUser.fulfilled.payload.user);
    });
    it('Проверяем setRegisterUser.rejected', () => {
      const res = user(initialState, mockData.setRegisterUser.rejected);
      expect(res.request).toBe(false);
      expect(res.isInitUser).toBe(false);
      expect(res.error).toBe(mockData.setRegisterUser.rejected.error.message);
    });
  });
  describe('Проверяем работу updateUser', () => {
    it('Проверяем updateUser.pending', () => {
      const res = user(initialState, mockData.updateUser.pending);
      expect(res.request).toBe(true);
    });
    it('Проверяем updateUser.fulfilled', () => {
      const res = user(initialState, mockData.updateUser.fulfilled);
      expect(res.request).toBe(false);
      expect(res.isInitUser).toBe(true);
      expect(res.profile).toBe(mockData.updateUser.fulfilled.payload.user);
    });
    it('Проверяем updateUser.rejected', () => {
      const res = user(initialState, mockData.updateUser.rejected);
      expect(res.request).toBe(false);
      expect(res.error).toBe(mockData.updateUser.rejected.error.message);
    });
  });
});
