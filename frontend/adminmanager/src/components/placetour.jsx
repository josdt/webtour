import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"

const PlaceTour = () => {

    const urltour = "http://localhost:8080/travel/gettour"
    const [tours, setTours] = useState([])

    useEffect(() => {
        const fetchData = fetch(urltour)
            .then(response => response.json())
            .then(data => {
                setTours(data);
            });
    }, [])

    const [idTour, setIdTour] = useState("")
    const handleSelectionTour = (event) => {
        console.log(event.target.value)
        setIdTour(event.target.value)
    }


    const urlplace = "http://localhost:8080/travel/place"
    const [places, setPlaces] = useState([])

    useEffect(() => {
        const fetchData = fetch(urlplace)
            .then(response => response.json())
            .then(data => {
                setPlaces(data)
            });
    }, [])

    const [idPlace, setIdPlace] = useState("")
    const handleSelectionPlace = (event) => {
        console.log(event.target.value)
        setIdPlace(event.target.value)
    }




    const urlplacetour = "http://localhost:8080/travel/placetour"
    const [placetours, setPlaceTours] = useState([])

    const submitGetPlaceTour = (e) => {
        e.preventDefault();
        axios.get(urlplacetour + '/' + idTour)
            .then(response =>{
                setPlaceTours(response.data);
                console.log(response.data);
            }
                
            )
            .catch(function (error) {
                console.log(error);
            });
    }


    const init = {
        idTour: "",
        idPlace: "",
    }

    const [error, setError] = useState("")

    const [placetour, setPlaceTour] = useState(init)
    const submitCreatePlaceTour = (e) => {
        e.preventDefault();
        axios.post(urlplacetour, placetour,{ headers: { 'id': sessionStorage.getItem("idEmp") } })
            .then((response) =>{
                if (response.data === "" || response.data === null || response.data === undefined) {
                  setError("C???nh b??o: B???n kh??ng ph???i l?? qu???n l??, kh??ng c?? quy???n ch???nh s???a d??? li???u!")
                } else {
                  console.log(response)
                  window.location = ("/placetour")
                }
              }
                

            )
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleDataPlaceTour = (event) => {
        const newData = { ...placetour }
        newData[event.target.name] = event.target.value
        setPlaceTour(newData)
        console.log(newData)
    }

    const submitDelete = (idTour, idPlace) => {
        axios.delete(urlplacetour+'/'+idTour+'/'+idPlace,{ headers: { 'id': sessionStorage.getItem("idEmp") } })
            .then((response) =>{
                if (response.data === "" || response.data === null || response.data === undefined) {
                  setError("C???nh b??o: B???n kh??ng ph???i l?? qu???n l??, kh??ng c?? quy???n ch???nh s???a d??? li???u!")
                } else {
                  console.log(response)
                  window.location = ("/placetour")
                }
              }
              
            )
            .catch(function (error) {
                console.log(error);
            });
    }


    const submitLogout = () => {
        sessionStorage.removeItem("idEmp");
        sessionStorage.removeItem("role");
    }

    const checkrole = (role) =>{
        let r = role;
        r = r.toLowerCase();
        if(r === 'admin'){
          return false;
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
          <div className="sidebar-brand-text mx-3"><span>Qu???n l?? Tour</span></div>
        </a>
          <hr className="sidebar-divider my-0" />
          <ul className="navbar-nav text-light" id="accordionSidebar">
            <li className="nav-item"><a className="nav-link" href="/home"><i
              className="fas fa-tachometer-alt" /><span>Trang ch???</span></a></li>
            <li className="nav-item"><a className="nav-link active" href={`/profile/${sessionStorage.getItem("idEmp")}`}><i
              className="fas fa-user" /><span>Th??ng tin c?? nh??n</span></a></li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i
                  className="fa fa-briefcase" />
                  <span>Qu???n l??</span>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/place"><i className="fa fa-file-picture-o"/><span> ?????a danh</span></a>
                <a className="dropdown-item" href="/vehicle"><i className="fa fa-automobile"/><span> Ph????ng ti???n</span></a>
                <a className="dropdown-item" href="/service"><i className="fa fa-angellist"/><span> D???ch v???</span></a>
                <a className="dropdown-item" href="/tour"><i className="fa fa-yelp"/><span> Tour</span></a>
                <a className="dropdown-item" href="/employee"><i className="fa fa-street-view"/><span> Nh??n vi??n</span></a>
                <a className="dropdown-item" href="/customer"><i className="fa fa-street-view"/><span> Kh??ch h??ng</span></a>
                <a className="dropdown-item" href="/booking"><i className="fa fa-check-circle-o"/><span> Booking</span></a>
                <a className="dropdown-item" href="/ask"><i className="fa fa-question-circle-o"/><span> Forum</span></a>
                <a className="dropdown-item" href="/placetour"><i className="fa fa-link"/><span> ?????a danh-tour</span></a>
                <a className="dropdown-item" href="/vehicletour"><i className="fa fa-link"/><span> Ph????ng ti???n-tour</span></a>
                <a className="dropdown-item" href="/servicetour"><i className="fa fa-link"/><span> D???ch v???-tour</span></a>
              </div>
            </li>
            <li className="nav-item"><a className="nav-link active" onClick={submitLogout} href="/"><i
                            className="fas fa-user" /><span>????ng xu???t</span></a></li>
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
                                            <p className="small text-gray-500 mb-0">Chicken the Dog ?? 2w</p>
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
                        <h3 className="text-dark mb-4">Qu???n l?? danh m???c ?????a danh tour</h3>
                        <form className="form-row" onSubmit={submitCreatePlaceTour}>
                            <div className="form-group col-md-6">
                                <label className="col-md-2" htmlFor="formGroupExampleInput"><strong>Tour:</strong></label>
                                <select className="col-md-6 form-control form-control-sm custom-select custom-select-sm" required name='idTour' value={placetour.idTour} onChange={handleDataPlaceTour}>
                                    <option disabled value={''} >Ch???n tour...</option>
                                    {tours.map(tour =>
                                        <option value={tour.idTour}>{tour.idTour}-{tour.title}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="col-md-3" htmlFor="formGroupExampleInput"><strong>?????a danh:</strong></label>
                                <select className="col-md-6 form-control form-control-sm custom-select custom-select-sm" required name='idPlace' value={placetour.idPlace} onChange={handleDataPlaceTour}>
                                    <option disabled value={''} >Ch???n ?????a danh...</option>
                                    {places.map(place =>
                                        <option value={place.idPlace}>{place.idPlace}-{place.name}</option>
                                    )}
                                </select>
                            </div>
                            <button class="btn btn-primary btn-block" disabled={checkrole(sessionStorage.getItem("role"))}>L??u</button>
                        </form>
                        {
              error.length > 0 ?
                <div className="text-danger " ><strong>{error}</strong></div>
                : null
            }
                        <div className="card shadow">
                            <div className="card-header py-3">
                                <p className="text-primary m-0 font-weight-bold">Th??ng tin ?????a danh tour</p>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitGetPlaceTour} id="dataTable_length" className="form-row">
                                    <label className="col-md-2"><strong>Ch???n tour</strong></label>
                                    <select className="col-md-6 form-control form-control-sm custom-select custom-select-sm" onChange={handleSelectionTour}>
                                        <option disabled selected>Ch???n tour...</option>
                                        {tours.map(tour =>
                                            <option value={tour.idTour}>{tour.idTour}-{tour.title}</option>
                                        )}
                                    </select>
                                    <div className="col-md-4">
                                        <button className="btn btn-primary">T??m ki???m</button>
                                    </div>

                                </form>
                                <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                    <table className="table my-0" id="dataTable">
                                        <thead>
                                            <tr>
                                                <th>M?? tour</th>
                                                <th>M?? ?????a danh</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {placetours.map(placetour =>
                                                <tr>
                                                    <td>{placetour.idTour}</td>
                                                    <td>{placetour.idPlace}</td>
                                                    <td><button class="btn btn-danger" disabled={checkrole(sessionStorage.getItem("role"))} onClick={() => submitDelete(placetour.idTour, placetour.idPlace)} >Xo??</button></td>
                                                </tr>
                                            )}

                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th><strong>M?? tour</strong></th>
                                                <th><strong>M?? ?????a danh</strong></th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                                            <ul className="pagination">
                                                <li className="page-item disabled"><a className="page-link" href="#" aria-label="Previous"><span aria-hidden="true">??</span></a></li>
                                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item"><a className="page-link" href="#" aria-label="Next"><span aria-hidden="true">??</span></a></li>
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


export default PlaceTour