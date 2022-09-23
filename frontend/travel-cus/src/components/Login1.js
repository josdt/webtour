import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"
import { render } from '@testing-library/react';

const Login = () => {


  const urllogin = "http://localhost:8080/travel/customer/login/"

  const init = {
    phone: "",
    password: "",
  }

  const [login, setLogin] = useState(init)
  const submitLogin = (e) => {
    e.preventDefault();
    axios.get(urllogin + login.phone + '/' + login.password)
      .then((response) => {
        localStorage.setItem("id", response.data.idCustomer);
        window.location = `profile/${response.data.idCustomer}`
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
    <>
      <section className='showcase login'>
        <div className='showcase-overlay'>
          <form onSubmit={submitLogin} className='form-control'>
            <input type='text' id='phone' placeholder='Số điện thoại' name='phone' value={login.phone} required onChange={handleDataLogin} />
            <input type='password' id='password' placeholder='Mật khẩu' name='password' value={login.password} required onChange={handleDataLogin} />
            <button type='submit'>Đăng nhập</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login
