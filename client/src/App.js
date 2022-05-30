import './App.css';
import {Routes,Route,NavLink} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Donor from './components/Donor'
import Donee from './components/Donee'


function App() {
  return (
    <div className="App">
      {/*Links to routes */}
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" >MyApp</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " to="/register">Register</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/*define routes for its children */}
      <Routes>
        {/*Route for home component */}
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}>
           {/*define routes for its children */}
            {/*Route for donor component */}
            <Route path="donor" element={<Donor/>}></Route>
            {/*Route for donee component */}
            <Route path="donee" element={<Donee/>}></Route>
        </Route>
       
      </Routes>
    </div>
  );
}

export default App;
