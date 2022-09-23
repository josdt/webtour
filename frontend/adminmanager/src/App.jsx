import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from './components/navbar'
import Header from './components/header'
import Home from './components/home'
import Profile from './components/profile'
import Place from './components/place'
import Vehicle from './components/vehicle'
import Service from './components/service'
import Tour from './components/tour'
import Employee from './components/employee'
import Customer from './components/customer'
import Booking from './components/booking'
import Ask from './components/ask'
import PlaceTour from './components/placetour'
import VehicleTour from './components/vehicletour'
import ServiceTour from './components/servicetour'
import Login from './components/login'

function App() {
  return (
    <div >
          <BrowserRouter>
            <Routes>
            <Route path='/' element={<Login />} />
              <Route path='/home' element={<Home />} />
              <Route path='/profile/:idEmp' element={<Profile />} />
              <Route  path='/place' element={<Place />} />
              <Route  path='/vehicle' element={<Vehicle />} />
              <Route  path='/service' element={<Service />} />
              <Route  path='/tour' element={<Tour />} />
              <Route  path='/employee' element={<Employee />} />
              <Route  path='/customer' element={<Customer />} />
              <Route  path='/booking' element={<Booking />} />
              <Route  path='/ask' element={<Ask />} />
              <Route  path='/placetour' element={<PlaceTour />} />
              <Route  path='/vehicletour' element={<VehicleTour />} />
              <Route  path='/servicetour' element={<ServiceTour />} />
            </Routes>
          </BrowserRouter>
          <a className='border rounded d-inline scroll-to-top' href="#wrapper"><i className='fas fa-angle-up'></i></a>
   
    </div>
  );
}

export default App;
