import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { AppHeader } from '@components';
import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { ingredientFromApi } from '../../services/auth/slice/ingredient';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  

  useEffect(() => {
    dispatch(ingredientFromApi());
  }, []);

  return (
    <>
     <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
      </Routes>
      </div>
      
    </>
  );

};
export default App;
