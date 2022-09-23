import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"

const SignUp = () => {

  const urlregister = "http://localhost:8080/travel/customer"

  const init = {
    name:"",
    gender:"",
    email:"",
    phone: "",
    password: ""
  }
  
  const [regis, setRegis] = useState(init)
  const submitRegis = (e) => {
    e.preventDefault();
    axios.post(urlregister, regis)
        .then((response) =>
        console.log(response),
            window.location = "/login"
        )
        .catch(function (error) {
            console.log("Lỗi đăng ký");
        });
  }
  const handleDataRegis = (event) => {
    const newData = { ...regis }
    newData[event.target.name] = event.target.value
    setRegis(newData)
    console.log(newData)
  }


  return (
    <>
      <section className='showcase login'>
        <div className='showcase-overlay'>
          <form onSubmit={submitRegis} className='form-control'>
            <input type='text'name='name'id='name'placeholder='Họ và tên'required onChange={handleDataRegis}/>
            <input type='gender'name='gender'id='gender'placeholder='Giới tính'required onChange={handleDataRegis}/>
            <input type='email'name='email'id='email'placeholder='Địa chỉ Email'required onChange={handleDataRegis}/>
            <input type='text'name='phone'id='phone'placeholder='Số điện thoại'required onChange={handleDataRegis}/>
            <input type='password'name='password'id='password'placeholder='Mật khẩu' onChange={handleDataRegis}/>
            <button type='submit'>Tạo tài khoản</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default SignUp
