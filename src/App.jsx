
// import { Button } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
// import Header from './Header';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Update from './UpdateProduct';
import Add from './AddProduct';
import Protected from './Protected';
import Home from './Home';



function App() {
 return (
    <>
     <div className='app'>
     
      <BrowserRouter>
   
      <Routes>
      <Route path="/" element={<Home />} />
      <Route index  path="/login" element={ <Login />} />
     <Route path="/register" element={ <Register />} />
     <Route path="/add" element={<Protected Cmp={Add} />} />
  <Route path="/update" element={<Protected Cmp={Update} />} />
      </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
