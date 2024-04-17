import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../../../utils/cookie';
//Функция отправки данных клиента на сервер
export const setLoginUser = createAsyncThunk(
  'loginUser/loginUserApi',
  async function (loginData: TLoginData) {
    const data = await loginUserApi(loginData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);
//Функция получения пользователя с сервера
export const getUser = createAsyncThunk('user/getUserApi', async function () {
  const res = getUserApi();
  return res;
});
//Функция удаления пользователя с сервера
export const logoutUser = createAsyncThunk(
  'logoutUser/logoutApi',
  async function () {
    logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
    });
  }
);
//Функция получения зарегистрированного пользователя
export const setRegisterUser = createAsyncThunk(
  'setRegisterUser/registerUserApi',
  async function (data: TRegisterData) {
    const res = await registerUserApi(data);
    return res;
  }
);
//Функция обновления данных пользователя
export const updateUser = createAsyncThunk(
  'updateUser/updateUserApi',
  async function (updateData: TRegisterData) {
    const res = await updateUserApi(updateData);
    return res;
  }
);
//Интерфейс слайса
interface IUserState {
  request: boolean;
  profile: TUser;
  isInitUser: boolean;
  error: string | undefined;
}
//Начальное состояние слайса
const initialState: IUserState = {
  request: false,
  profile: { email: '', name: '' },
  isInitUser: false,
  error: undefined
};
//Слайс пользователя
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = '';
    },
    userLogout: (state) => {
      state.profile = { email: '', name: '' };
    }
  },
  selectors: {
    getRequestUser: (state) => state.request,
    getProfile: (state) => state.profile,
    getIsInitUser: (state) => state.isInitUser,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder.addCase(setLoginUser.pending, (state) => {
      state.request = true;
      state.isInitUser = false;
    }),
      builder.addCase(setLoginUser.fulfilled, (state, action) => {
        state.request = false;
        state.isInitUser = true;
        state.profile = action.payload.user;
      }),
      builder.addCase(setLoginUser.rejected, (state, action) => {
        state.request = false;
        state.isInitUser = false;
        state.error = action.error.message;
      });
    builder.addCase(getUser.pending, (state) => {
      state.request = true;
      state.isInitUser = false;
    }),
      builder.addCase(getUser.fulfilled, (state, action) => {
        state.request = false;
        state.isInitUser = true;
        state.profile = action.payload.user;
      }),
      builder.addCase(getUser.rejected, (state, action) => {
        state.request = false;
        state.isInitUser = false;
        state.error = action.error.message;
      });
    builder.addCase(setRegisterUser.pending, (state) => {
      state.request = true;
      state.isInitUser = false;
    }),
      builder.addCase(setRegisterUser.fulfilled, (state, action) => {
        state.request = false;
        state.isInitUser = true;
        state.profile = action.payload.user;
      }),
      builder.addCase(setRegisterUser.rejected, (state, action) => {
        state.request = false;
        state.isInitUser = false;
        state.error = action.error.message;
      });
    builder.addCase(logoutUser.pending, (state) => {
      state.request = true;
    }),
      builder.addCase(logoutUser.fulfilled, (state) => {
        state.request = false;
        state.isInitUser = true;
      }),
      builder.addCase(logoutUser.rejected, (state, action) => {
        state.request = false;
        state.isInitUser = false;
        state.error = action.error.message;
      });
    builder.addCase(updateUser.pending, (state) => {
      state.request = true;
    }),
      builder.addCase(updateUser.fulfilled, (state, action) => {
        state.request = false;
        state.isInitUser = true;
        state.profile = action.payload.user;
      }),
      builder.addCase(updateUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message;
      });
  }
});
//Эспортируем экшены
export const { clearError, userLogout } = userSlice.actions;
//Экспортируем селекторы
export const { getRequestUser, getProfile, getIsInitUser, getError } =
  userSlice.selectors;
//Экспортируем слайс
export const user = userSlice.reducer;
//Для пулреквеста