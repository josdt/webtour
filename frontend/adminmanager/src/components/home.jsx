import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Header from './header';
import Navbar from './navbar';



const Home = () => {


    const submitLogout = () => {
        sessionStorage.removeItem("idEmp");
        sessionStorage.removeItem("role");
    }
    return (
        <div id="wrapper">
            <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
                <div className="container-fluid d-flex flex-column p-0"><a
                    className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
                    href="#">
                    <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-laugh-wink" /></div>
                    <div className="sidebar-brand-text mx-3"><span>Quản lý Tour</span></div>
                </a>
                    <hr className="sidebar-divider my-0" />
                    <ul className="navbar-nav text-light" id="accordionSidebar">
                        <li className="nav-item"><a className="nav-link" href="/"><i
                            className="fas fa-tachometer-alt" /><span>Trang chủ</span></a></li>
                        <li className="nav-item"><a className="nav-link active" href={`/profile/${sessionStorage.getItem("idEmp")}`}><i
                            className="fas fa-user" /><span>Thông tin cá nhân</span></a></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i
                                    className="fa fa-briefcase" />
                                <span>Quản lý</span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/place"><i className="fa fa-file-picture-o" /><span> Địa danh</span></a>
                                <a className="dropdown-item" href="/vehicle"><i className="fa fa-automobile" /><span> Phương tiện</span></a>
                                <a className="dropdown-item" href="/service"><i className="fa fa-angellist" /><span> Dịch vụ</span></a>
                                <a className="dropdown-item" href="/tour"><i className="fa fa-yelp" /><span> Tour</span></a>
                                <a className="dropdown-item" href="/employee"><i className="fa fa-street-view" /><span> Nhân viên</span></a>
                                <a className="dropdown-item" href="/customer"><i className="fa fa-street-view" /><span> Khách hàng</span></a>
                                <a className="dropdown-item" href="/booking"><i className="fa fa-check-circle-o" /><span> Booking</span></a>
                                <a className="dropdown-item" href="/ask"><i className="fa fa-question-circle-o" /><span> Forum</span></a>
                                <a className="dropdown-item" href="/placetour"><i className="fa fa-link" /><span> Địa danh-tour</span></a>
                                <a className="dropdown-item" href="/vehicletour"><i className="fa fa-link" /><span> Phương tiện-tour</span></a>
                                <a className="dropdown-item" href="/servicetour"><i className="fa fa-link" /><span> Dịch vụ-tour</span></a>
                            </div>
                        </li>
                        <li className="nav-item"><a className="nav-link active" onClick={submitLogout} href="/"><i
                            className="fas fa-user" /><span>Đăng xuất</span></a></li>
                    </ul>
                    <div className="text-center d-none d-md-inline"><button className="btn rounded-circle border-0"
                        id="sidebarToggle" type="button" /></div>
                </div>
            </nav>
            <div className="container-fluid">

                <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="text-primary font-weight-bold m-0">Projects</h6>
                        </div>
                        <div className="card-body">
                            <h4 className="small font-weight-bold">Server migration<span className="float-right">20%</span></h4>
                            <div className="progress mb-4">
                                <div className="progress-bar bg-danger" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} style={{ width: '20%' }}><span className="sr-only">20%</span></div>
                            </div>
                            <h4 className="small font-weight-bold">Sales tracking<span className="float-right">40%</span></h4>
                            <div className="progress mb-4">
                                <div className="progress-bar bg-warning" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{ width: '40%' }}><span className="sr-only">40%</span></div>
                            </div>
                            <h4 className="small font-weight-bold">Customer Database<span className="float-right">60%</span></h4>
                            <div className="progress mb-4">
                                <div className="progress-bar bg-primary" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{ width: '60%' }}><span className="sr-only">60%</span></div>
                            </div>
                            <h4 className="small font-weight-bold">Payout Details<span className="float-right">80%</span></h4>
                            <div className="progress mb-4">
                                <div className="progress-bar bg-info" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} style={{ width: '80%' }}><span className="sr-only">80%</span></div>
                            </div>
                            <h4 className="small font-weight-bold">Account setup<span className="float-right">Complete!</span></h4>
                            <div className="progress mb-4">
                                <div className="progress-bar bg-success" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} style={{ width: '100%' }}><span className="sr-only">100%</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="text-primary font-weight-bold m-0">Todo List</h6>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div className="row align-items-center no-gutters">
                                    <div className="col mr-2">
                                        <h6 className="mb-0"><strong>Lunch meeting</strong></h6><span className="text-xs">10:30 AM</span>
                                    </div>
                                    <div className="col-auto">
                                        <div className="custom-control custom-checkbox"><input className="custom-control-input" type="checkbox" id="formCheck-1" /><label className="custom-control-label" htmlFor="formCheck-1" /></div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row align-items-center no-gutters">
                                    <div className="col mr-2">
                                        <h6 className="mb-0"><strong>Lunch meeting</strong></h6><span className="text-xs">11:30 AM</span>
                                    </div>
                                    <div className="col-auto">
                                        <div className="custom-control custom-checkbox"><input className="custom-control-input" type="checkbox" id="formCheck-2" /><label className="custom-control-label" htmlFor="formCheck-2" /></div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row align-items-center no-gutters">
                                    <div className="col mr-2">
                                        <h6 className="mb-0"><strong>Lunch meeting</strong></h6><span className="text-xs">12:30 AM</span>
                                    </div>
                                    <div className="col-auto">
                                        <div className="custom-control custom-checkbox"><input className="custom-control-input" type="checkbox" id="formCheck-3" /><label className="custom-control-label" htmlFor="formCheck-3" /></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <div className="card text-white bg-primary shadow">
                                <div className="card-body">
                                    <p className="m-0">Primary</p>
                                    <p className="text-white-50 small m-0">#4e73df</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div className="card text-white bg-success shadow">
                                <div className="card-body">
                                    <p className="m-0">Success</p>
                                    <p className="text-white-50 small m-0">#1cc88a</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div className="card text-white bg-info shadow">
                                <div className="card-body">
                                    <p className="m-0">Info</p>
                                    <p className="text-white-50 small m-0">#36b9cc</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div className="card text-white bg-warning shadow">
                                <div className="card-body">
                                    <p className="m-0">Warning</p>
                                    <p className="text-white-50 small m-0">#f6c23e</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div className="card text-white bg-danger shadow">
                                <div className="card-body">
                                    <p className="m-0">Danger</p>
                                    <p className="text-white-50 small m-0">#e74a3b</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div className="card text-white bg-secondary shadow">
                                <div className="card-body">
                                    <p className="m-0">Secondary</p>
                                    <p className="text-white-50 small m-0">#858796</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home

