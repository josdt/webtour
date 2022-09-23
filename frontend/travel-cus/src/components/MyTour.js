import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"

const MyTour = () => {

    const urlbooking = "http://localhost:8080/travel/booking/"
    const url = "http://localhost:8080/travel/booking/customer/"
    const [bookings, setBookings] = useState([])


    useEffect(() => {
        const fetchData = fetch(url + sessionStorage.getItem("idCus"))
            .then(response => 
                response.json()
            )
            .then(data => {
                console.log(data);
                setBookings(data)
            });
    }, [])


    const init = {
        idTour: "",
        idCustomer: sessionStorage.getItem("idCus"),
        judge: ""
    }

    const [judge, setJudge] = useState(init)
    const submitUpdateJugde = (e) => {
        e.preventDefault();
        axios.put(urlbooking + '/judge', judge)
            .then((response) =>
                console.log(response),
                window.location = `/mytour/${sessionStorage.getItem("idCus")}`
            )
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleDataJudge = (event) => {
        const newData = { ...judge }
        newData[event.target.name] = event.target.value
        setJudge(newData)
        console.log(newData)
    }



    const submitDelete = (idcus, idtour) => {
        axios.delete(urlbooking + idcus + '/' + idtour)
            .then((response) =>
                console.log(response),
                window.location = `/mytour/${sessionStorage.getItem("idCus")}`
            )
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div id="wrapper">
            <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                    <div className="container-fluid">
                        <h3 className="text-dark mb-4">Thông tin đặt tour</h3>
                        <form className="form-row" onSubmit={submitUpdateJugde}>
                            <div className="form-group col-md-2">
                                <label htmlFor="formGroupExampleInput"><strong>Mã tour</strong></label>
                                <select className="form-control" name='idTour' value={judge.idTour} onChange={handleDataJudge}>
                                    <option selected>Chọn tour...</option>
                                    {bookings.map(booking =>
                                        <option value={booking.idTour}>{booking.idTour}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group col-md-10">
                                <label htmlFor="formGroupExampleInput"><strong>Đánh giá</strong></label>
                                <input type="text" required className="form-control" id="formGroupExampleInput" placeholder="nhập nội dung đánh giá tour" name='judge' value={judge.judge} onChange={handleDataJudge} />
                            </div>
                            <button class="btn btn-primary btn-block">Đánh giá</button>
                        </form>
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                    <table className="table my-0" id="dataTable">
                                        <thead>
                                            <tr>

                                                <th>Mã tour</th>
                                                <th>Mã khách hàng</th>
                                                <th>Ngày đặt</th>
                                                <th>Số lượng</th>
                                                <th>Tổng tiền</th>
                                                <th>Đánh giá</th>
                                                <th>#</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map(booking =>
                                                <tr key={booking.id}>
                                                    <td>{booking.idTour}</td>
                                                    <td>{booking.idCustomer}</td>
                                                    <td>{booking.dateBooking}</td>
                                                    <td>{booking.quantityPeople}</td>
                                                    <td>{booking.totalPrice}</td>
                                                    <td>{booking.judge}</td>
                                                    <td><button class="btn btn-danger" onClick={() => submitDelete(booking.idCustomer, booking.idTour)} >Huỷ tour</button></td>
                                                </tr>
                                            )}

                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th><strong>Mã tour</strong></th>
                                                <th><strong>Mã khách hàng</strong></th>
                                                <td><strong>Ngày đặt</strong></td>
                                                <td><strong>Số lượng</strong></td>
                                                <td><strong>Tổng tiền</strong></td>
                                                <td><strong>Đánh giá</strong></td>
                                                <td><strong>#</strong></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyTour