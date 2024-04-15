import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { ingredientFromApi } from '../../services/auth/slice/constructorBurger';
import { getUser } from '../../services/auth/slice/user';

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ingredientFromApi());
    if (localStorage.getItem('refreshToken')) {
      dispatch(getUser());
    }
  }, []);
  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='*' element={<NotFound404 />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal onClose={handleModalClose} title={''}>
                  {' '}
                  <OrderInfo />{' '}
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal onClose={handleModalClose} title={'Детали ингредиента'}>
                  {' '}
                  <IngredientDetails />{' '}
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal onClose={handleModalClose} title={'Детали ингредиента'}>
                  {' '}
                  <OrderInfo />{' '}
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};
export default App;
