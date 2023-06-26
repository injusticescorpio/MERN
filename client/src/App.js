import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Navbar from './NavBar';
import NotFound from './NotFound'
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard';
function App() {
  return (
    <BrowserRouter>
    <div className="App">

      <Navbar/>
      <div className="content">
          {/* object and boolean cannot be render */}
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="*" element={ <NotFound/>}/> 
          </Routes>
    </div>
    </div>
    </BrowserRouter>
  );

}

export default App;
