import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Showcase from './components/Showcase'
import Destinations from './components/Destinations'
import Footer from './components/Footer'
import Login from './components/login'
import Register from './components/register'
import Error from './components/Error'
import Detail from './components/Detail'
import Profile from './components/Profile'
import MyTour from './components/MyTour'
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/'>
          <Showcase />
          <Destinations />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/mytour/:idCus'>
          <MyTour />
        </Route>
        <Route exact path='/detail/:id'>
          <Detail />
        </Route>
        <Route exact path='/profile/:idCus'>
          <Profile />
        </Route>
        
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
