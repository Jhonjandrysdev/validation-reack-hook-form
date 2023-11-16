import {Routes, Route} from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import Register from './routes/Register';
import { useContext } from 'react';
import { userContext } from './context/userProvider';
import Layout from './components/LayoutContainer';

function App() {

  const {user} = useContext(userContext)

  if (user === false) {
    return <p>Loading...</p>
  }


  return (
    <>
      <h1>App</h1>
      <Navbar/>
      <Routes>
        <Route path='/home' element={<RequireAuth>
          <Home/>
        </RequireAuth>}>
        </Route>

        <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        </Route>
      </Routes> 
      
    </>
  )
}

export default App
