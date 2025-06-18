import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './savebank/Home';
import DashBoard from './savebank/DashBoard';
import Setting from './savebank/Setting';
import Analitics from './savebank/Analitics';
import Signin from './savebank/Signin';
import Addexpense from './savebank/Addexpense';
import { useLocation } from 'react-router-dom';
import Signup from './savebank/Signup';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserFromStorage } from './redux/redux';
import Protection from './savebank/Protection';
import Layout from './savebank/Layout';
import Notfoundpage from './savebank/Notfoundpage';

function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUserFromStorage())
  }, [dispatch])

  return (
    <>


      <Routes>


        <Route path='/' element={
          <Layout />
        }>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
        
          <Route path='/' element={<Home />} />

          <Route path='/home'
            element={
              <Protection><Home /> </Protection>

            } />

          <Route path='/dashboard'
            element={
              <Protection><DashBoard /></Protection>

            } />

          <Route path='/analytics' element={
            <Protection> <Analitics /></Protection>

          } />
          <Route path='/setting' element={
            <Protection><Setting /></Protection>
          } />
          <Route path='/addexpense' element={
            <Protection><Addexpense /></Protection>

          } />




        </Route>

        <Route path='*' element={<Notfoundpage />} />

      </Routes>


    </>
  );
}

export default App;
