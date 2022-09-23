import React, { useInsertionEffect } from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"

const Login = () => {

  const urllogin = "http://localhost:8080/travel/employee/login/"
  const init = {
    phone: "",
    password: ""
  }

  const [login, setLogin] = useState(init)
  const submitLogin = (e) => {
    e.preventDefault();
    axios.get(urllogin + login.phone + "/" + login.password)
      .then((response) =>{
        console.log(response);
        if(response.data.phone === login.phone){
          if(response.data.role === "admin"){
            sessionStorage.setItem("role","admin")
          }else{
            sessionStorage.setItem("role","employee")
          }
          sessionStorage.setItem("idEmp",response.data.idEmployee);
          window.location=`/profile/${response.data.idEmployee}`
          
        }else window.location="/"
        
      }
      )
      .catch(function (error) {
        console.log("Lỗi đăng nhập");
      });
  }
  const handleDataLogin = (event) => {
    const newData = { ...login }
    newData[event.target.name] = event.target.value
    setLogin(newData)
    console.log(newData)
  }


  return (
    <div className="bg-gradient-primary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-flex">
                    <div className="flex-grow-1 bg-login-image" style={{ backgroundImage: 'url("assets/img/dogs/image3.jpeg")' }} />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h4 className="text-dark mb-4">Welcome Back!</h4>
                      </div>
                      <form onSubmit={submitLogin} className="user">
                        <div className="form-group"><input className="form-control form-control-user" type="text" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter phone" name="phone" value={login.phone} onChange={handleDataLogin} /></div>
                        <div className="form-group"><input className="form-control form-control-user" type="password" id="exampleInputPassword" placeholder="Password" name="password" value={login.password} onChange={handleDataLogin} /></div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <div className="form-check"><input className="form-check-input custom-control-input" type="checkbox" id="formCheck-1" /><label className="form-check-label custom-control-label" htmlFor="formCheck-1">Remember Me</label></div>
                          </div>
                        </div><button className="btn btn-primary btn-block text-white btn-user" type="submit">Login</button>
                        <hr /><a className="btn btn-primary btn-block text-white btn-google btn-user" role="button"><i className="fab fa-google" />&nbsp; Login with Google</a><a className="btn btn-primary btn-block text-white btn-facebook btn-user" role="button"><i className="fab fa-facebook-f" />&nbsp; Login with Facebook</a>
                        <hr />
                      </form>
                      <div className="text-center"><a className="small" href="forgot-password.html">Forgot Password?</a></div>
                      <div className="text-center"><a className="small" href="register.html">Create an Account!</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

