import { useContext } from 'react';
import {Routes, Route} from 'react-router-dom';
import { userContext } from './context/userProvider';

import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import NotFound from './routes/NotFound';

import Navbar from './components/Navbar';
import Profile from './components/Profile';

import Layout from './layouts/LayoutContainer';
import LayoutRequireAuth from './layouts/LayoutRequireAuth';
import LayoutRedirect from './layouts/LayoutRedirect';
function App() {

  const {user} = useContext(userContext)

  if (user === false) {
    return <p>Loading...</p>
  }


  return (
    <>
      <Navbar/>
      <Routes>

        <Route path='/' element={<Layout/>}>
          <Route index element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>
        
        <Route path='/' element={<LayoutRequireAuth/>}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>

        <Route path='/:nanoID' element={<LayoutRedirect/>}>
        <Route index element={<NotFound/>}/>
        </Route>
      </Routes> 
      
    </>
  )
}

export default App
