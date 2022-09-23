import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"
const Register = () => {

    const urlregister = "http://localhost:8080/travel/customer"
    const init = {
        name: "",
        gender: "",
        email: "",
        phone: "",
        password: ""
    }

    const [register, setRegister] = useState(init)
    const submitRegister = (e) => {
        e.preventDefault();
        axios.post(urlregister, register)
            .then((response) => {
                console.log(response);
                if (response.data.phone === register.phone) {
                    localStorage.setItem("idCus", response.data.idCustomer);
                    window.location = `/profile/${response.data.idCustomer}`

                } else window.location = "/"

            }
            )
            .catch(function (error) {
                console.log("Lỗi đăng nhập");
            });
    }
    const handleDataRegister = (event) => {
        const newData = { ...register }
        newData[event.target.name] = event.target.value
        setRegister(newData)
        console.log(newData)
    }

    return (
        <div>
            <div className="container">
                <div className="card shadow-lg o-hidden border-0 my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-flex">
                                <div className="flex-grow-1 bg-register-image" style={{ backgroundImage: 'url("/assets/imgs/dogs/image2.jpeg")' }} />
                            </div>
                            <div className="col-lg-7">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h4 className="text-dark mb-4">Create an Account!</h4>
                                    </div>
                                    <form onSubmit={submitRegister} className="user">
                                        <div className="form-group"><input className="form-control form-control-user" type="text" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="nhập vào họ tên" name="name" value={register.name} onChange={handleDataRegister} /></div>
                                        <div className="form-group"><input className="form-control form-control-user" type="text" id="exampleInputPassword" placeholder="giới tính" name="gender" value={register.gender} onChange={handleDataRegister} /></div>
                                        <div className="form-group"><input className="form-control form-control-user" type="text" id="exampleInputEmail" aria-describedby="email" placeholder="email" name="email" value={register.email} onChange={handleDataRegister} /></div>
                                        <div className="form-group"><input className="form-control form-control-user" type="text" id="exampleInputPassword" placeholder="số điện thoại" name="phone" value={register.phone} onChange={handleDataRegister} /></div>
                                        <div className="form-group"><input className="form-control form-control-user" type="password" id="exampleInputEmail" aria-describedby="mật khẩu" placeholder="mật khẩu" name="password" value={register.password} onChange={handleDataRegister} /></div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox small">
                                                <div className="form-check"><input className="form-check-input custom-control-input" type="checkbox" id="formCheck-1" /><label className="form-check-label custom-control-label" htmlFor="formCheck-1">Remember Me</label></div>
                                            </div>
                                        </div><button className="btn btn-primary btn-block text-white btn-user" type="submit">Register</button>
                                        <hr /><a className="btn btn-primary btn-block text-white btn-google btn-user" role="button"><i className="fab fa-google" />&nbsp; Login with Google</a><a className="btn btn-primary btn-block text-white btn-facebook btn-user" role="button"><i className="fab fa-facebook-f" />&nbsp; Login with Facebook</a>
                                        <hr />
                                    </form>
                                    <div className="text-center"><a className="small" href="forgot-password.html">Forgot Password?</a></div>
                                    <div className="text-center"><a className="small" href="login.html">Already have an account? Login!</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register