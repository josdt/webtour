import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Customer = () => {

  const urlgetcustomer = "http://localhost:8080/travel/customer"
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const fetchData = fetch(urlgetcustomer)
      .then(response => response.json())
      .then(data => {
        setCustomers(data)
      });
  }, [])


  const [error, setError] = useState("")

  const submitBlock = (idC) => {
    axios.put(urlgetcustomer + '/block/' + idC)
      .then((response) =>{
        console.log(response);
        window.location = ("/customer")
      }
      
      )
      .catch(function (error) {
        console.log(error);
      });
  }

  const status = (status) =>{
    let s = status;
    s = s.toLowerCase();
    if(s === 'active'){
      return false;
    }else {
      return true;
    }
  }

  const submitLogout = () => {
    sessionStorage.removeItem("idEmp");
    sessionStorage.removeItem("role");
}

const check = (role, status) =>{
  let r = role;
  r = r.toLowerCase();
  let s = status;
  s = s.toLowerCase();
  if(r === 'admin'){
    if(s === 'active'){
      return false;
    }else{
      return true;
    }
  }else {
    return true;
  }
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
            <li className="nav-item"><a className="nav-link" href="/home"><i
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
                <a className="dropdown-item" href="/place"><i className="fa fa-file-picture-o"/><span> Địa danh</span></a>
                <a className="dropdown-item" href="/vehicle"><i className="fa fa-automobile"/><span> Phương tiện</span></a>
                <a className="dropdown-item" href="/service"><i className="fa fa-angellist"/><span> Dịch vụ</span></a>
                <a className="dropdown-item" href="/tour"><i className="fa fa-yelp"/><span> Tour</span></a>
                <a className="dropdown-item" href="/employee"><i className="fa fa-street-view"/><span> Nhân viên</span></a>
                <a className="dropdown-item" href="/customer"><i className="fa fa-street-view"/><span> Khách hàng</span></a>
                <a className="dropdown-item" href="/booking"><i className="fa fa-check-circle-o"/><span> Booking</span></a>
                <a className="dropdown-item" href="/ask"><i className="fa fa-question-circle-o"/><span> Forum</span></a>
                <a className="dropdown-item" href="/placetour"><i className="fa fa-link"/><span> Địa danh-tour</span></a>
                <a className="dropdown-item" href="/vehicletour"><i className="fa fa-link"/><span> Phương tiện-tour</span></a>
                <a className="dropdown-item" href="/servicetour"><i className="fa fa-link"/><span> Dịch vụ-tour</span></a>
              </div>
            </li>
            <li className="nav-item"><a className="nav-link active" onClick={submitLogout} href="/"><i
                            className="fas fa-user" /><span>Đăng xuất</span></a></li>
          </ul>
          <div className="text-center d-none d-md-inline"><button className="btn rounded-circle border-0"
            id="sidebarToggle" type="button" /></div>
        </div>
      </nav>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
        <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars" /></button>
                    <form className="form-inline d-none d-sm-inline-block mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div className="input-group"><input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                            <div className="input-group-append"><button className="btn btn-primary py-0" type="button"><i className="fas fa-search" /></button></div>
                        </div>
                    </form>
                    <ul className="navbar-nav flex-nowrap ml-auto">
                        <li className="nav-item dropdown d-sm-none no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-toggle="dropdown" href="#"><i className="fas fa-search" /></a>
                            <div className="dropdown-menu dropdown-menu-right p-3 animated--grow-in" aria-labelledby="searchDropdown">
                                <form className="form-inline mr-auto navbar-search w-100">
                                    <div className="input-group"><input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                                        <div className="input-group-append"><button className="btn btn-primary py-0" type="button"><i className="fas fa-search" /></button></div>
                                    </div>
                                </form>
                            </div>
                        </li>
                        <li className="nav-item dropdown no-arrow mx-1">
                            <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-toggle="dropdown" href="#"><span className="badge badge-danger badge-counter">3+</span><i className="fas fa-bell fa-fw" /></a>
                                <div className="dropdown-menu dropdown-menu-right dropdown-list animated--grow-in">
                                    <h6 className="dropdown-header">alerts center</h6><a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="mr-3">
                                            <div className="bg-primary icon-circle"><i className="fas fa-file-alt text-white" /></div>
                                        </div>
                                        <div><span className="small text-gray-500">December 12, 2019</span>
                                            <p>A new monthly report is ready to download!</p>
                                        </div>
                                    </a><a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="mr-3">
                                            <div className="bg-success icon-circle"><i className="fas fa-donate text-white" /></div>
                                        </div>
                                        <div><span className="small text-gray-500">December 7, 2019</span>
                                            <p>$290.29 has been deposited into your account!</p>
                                        </div>
                                    </a><a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="mr-3">
                                            <div className="bg-warning icon-circle"><i className="fas fa-exclamation-triangle text-white" /></div>
                                        </div>
                                        <div><span className="small text-gray-500">December 2, 2019</span>
                                            <p>Spending Alert: We've noticed unusually high spending for your account.</p>
                                        </div>
                                    </a><a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item dropdown no-arrow mx-1">
                            <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-toggle="dropdown" href="#"><span className="badge badge-danger badge-counter">7</span><i className="fas fa-envelope fa-fw" /></a>
                                <div className="dropdown-menu dropdown-menu-right dropdown-list animated--grow-in">
                                    <h6 className="dropdown-header">alerts center</h6><a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="dropdown-list-image mr-3"><img className="rounded-circle" src="assets/img/avatars/avatar4.jpeg" />
                                            <div className="bg-success status-indicator" />
                                        </div>
                                        <div className="font-weight-bold">
                                            <div className="text-truncate"><span>Hi there! I am wondering if you can help me with a problem I've been having.</span></div>
                                            <p className="small text-gray-500 mb-0">Emily Fowler - 58m</p>
                                        </div>
                                    </a><a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="dropdown-list-image mr-3"><img className="rounded-circle" src="assets/img/avatars/avatar2.jpeg" />
                                            <div className="status-indicator" />
                                        </div>
                                        <div className="font-weight-bold">
                                            <div className="text-truncate"><span>I have the photos that you ordered last month!</span></div>
                                            <p className="small text-gray-500 mb-0">Jae Chun - 1d</p>
                                        </div>
                                    </a><a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="dropdown-list-image mr-3"><img className="rounded-circle" src="assets/img/avatars/avatar3.jpeg" />
                                            <div className="bg-warning status-indicator" />
                                        </div>
                                        <div className="font-weight-bold">
                                            <div className="text-truncate"><span>Last month's report looks great, I am very happy with the progress so far, keep up the good work!</span></div>
                                            <p className="small text-gray-500 mb-0">Morgan Alvarez - 2d</p>
                                        </div>
                                    </a><a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="dropdown-list-image mr-3"><img className="rounded-circle" src="assets/img/avatars/avatar5.jpeg" />
                                            <div className="bg-success status-indicator" />
                                        </div>
                                        <div className="font-weight-bold">
                                            <div className="text-truncate"><span>Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</span></div>
                                            <p className="small text-gray-500 mb-0">Chicken the Dog · 2w</p>
                                        </div>
                                    </a><a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                                </div>
                            </div>
                            <div className="shadow dropdown-list dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown" />
                        </li>
                        <div className="d-none d-sm-block topbar-divider" />
                        <li className="nav-item dropdown no-arrow">
                            <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-toggle="dropdown" href="#"><span className="d-none d-lg-inline mr-2 text-gray-600 small">Valerie Luna</span><img className="border rounded-circle img-profile" src="assets/img/avatars/avatar1.jpeg" /></a>
                                <div className="dropdown-menu shadow dropdown-menu-right animated--grow-in"><a className="dropdown-item" href="#"><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />&nbsp;Profile</a><a className="dropdown-item" href="#"><i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />&nbsp;Settings</a><a className="dropdown-item" href="#"><i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />&nbsp;Activity log</a>
                                    <div className="dropdown-divider" /><a className="dropdown-item" href="#"><i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />&nbsp;Logout</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
          <div className="container-fluid">
            <h3 className="text-dark mb-4">Quản lý danh mục khách hàng</h3>
            <div className="card shadow">
              <div className="card-header py-3">
                <p className="text-primary m-0 font-weight-bold">Thông tin Khách hàng</p>
              </div>
              {
              error.length > 0 ?
                <div className="text-danger " ><strong>{error}</strong></div>
                : null
            }
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 text-nowrap">
                    <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable"><label>Show&nbsp;<select className="form-control form-control-sm custom-select custom-select-sm">
                      <option value={10} selected>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>&nbsp;</label></div>
                  </div>
                  <div className="col-md-6">
                    <div className="text-md-right dataTables_filter" id="dataTable_filter"><label><input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" /></label></div>
                  </div>
                </div>
                <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                  <table className="table my-0" id="dataTable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Giới tính</th>
                        <th>Email</th>
                        <th>Điện thoại</th>
                        <th>Mật khẩu</th>
                        <th>Trạng thái</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map(customer =>
                        <tr>
                          <td>{customer.idCustomer}</td>
                          <td>{customer.name}</td>
                          <td>{customer.gender}</td>
                          <td>{customer.email}</td>
                          <td>{customer.phone}</td>
                          <td>{customer.password}</td>
                          <td>{customer.status}</td>
                          <td><button class="btn btn-danger" disabled={check(sessionStorage.getItem("role"),customer.status)} onClick={() => submitBlock(customer.idCustomer)} >Khoá tài khoản</button></td>
                        </tr>
                      )}

                    </tbody>
                    <tfoot>
                      <tr>
                        <td><strong>ID</strong></td>
                        <td><strong>Tên</strong></td>
                        <td><strong>Giới tính</strong></td>
                        <td><strong>Email</strong></td>
                        <td><strong>Điện thoại</strong></td>
                        <td><strong>Mật khẩu</strong></td>
                        <td><strong>Trạng thái</strong></td>
                        <td><strong>#</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                      <ul className="pagination">
                        <li className="page-item disabled"><a className="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>
                      </ul>
                    </nav>
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

export default Customer