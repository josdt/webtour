import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";


const Details = () => {
    const { id } = useParams()

    const urltour = "http://localhost:8080/travel/tour/"
    const [tour, setTour] = useState([])

    useEffect(() => {
        const fetchData = fetch(urltour + id)
            .then(response => response.json())
            .then(data => {
                setTour(data)
                console.log(data)
            });
    }, [])

    const urlplace = "http://localhost:8080/travel/placetourshow/"
    const [places, setPlaces] = useState([])

    useEffect(() => {
        const fetchData = fetch(urlplace + id)
            .then(response => response.json())
            .then(data => {
                setPlaces(data)
                console.log(data)
            });
    }, [])


    const urlservice = "http://localhost:8080/travel/servicetourshow/"
    const [services, setServices] = useState([])

    useEffect(() => {
        const fetchData = fetch(urlservice + id)
            .then(response => response.json())
            .then(data => {
                setServices(data)
                console.log(data)
            });
    }, [])


    const urlvehicle = "http://localhost:8080/travel/vehicletourshow/"
    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        const fetchData = fetch(urlvehicle + id)
            .then(response => response.json())
            .then(data => {
                setVehicles(data)
                console.log(data)
            });
    }, [])


    const urlask = "http://localhost:8080/travel/ask/"
    const [asks, setAsks] = useState([])

    useEffect(() => {
        const fetchData = fetch(urlask + id)
            .then(response => response.json())
            .then(data => {
                setAsks(data)
                console.log(data)
            });
    }, [])


    const urlbooking = "http://localhost:8080/travel/booking/tour/"
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        const fetchData = fetch(urlbooking + id)
            .then(response => response.json())
            .then(data => {
                setBookings(data)
                console.log(data)
            });
    }, [])


    const urlcreatebooking = "http://localhost:8080/travel/booking"
    const init = {
        idCustomer: sessionStorage.getItem("idCus"),
        idTour: id,
        quantityPeople:null
    }

    const [booking, setBooking] = useState(init)
    const submitCreateBooking = (e) => {
        e.preventDefault();
        if(sessionStorage.getItem("idCus") === null){
            window.location = "/login"
        }else{
            axios.post(urlcreatebooking, booking)
                .then((response) =>{
                    console.log(response);
                    window.location = "/"
                }
                )
                .catch(function (error) {
                    console.log(error);
                });
        }
        
    }
    const handleDataBooking = (event) => {
        const newData = { ...booking }
        newData[event.target.name] = event.target.value
        setBooking(newData)
        console.log(newData)
    }


    const urlcreateQuestion = "http://localhost:8080/travel/ask"
    const initquestion = {
        idCustomer: sessionStorage.getItem("idCus"),
        idTour: id,
        question: ''
    }

    const [ask, setAsk] = useState(initquestion)
    const submitCreateAsk = (e) => {
        e.preventDefault();
        if(sessionStorage.getItem("idCus") === null){
            window.location = "/login"
        }else{
            axios.post(urlask, ask)
            .then((response) =>
                console.log(response),
                window.location = `/detail/${id}`
            )
            .catch(function (error) {
                console.log(error);
            });
        }
        
    }
    const handleDataAsk = (event) => {
        const newData = { ...ask }
        newData[event.target.name] = event.target.value
        setAsk(newData)
        console.log(newData)
    }

    return (
        <div>
            <div >
                <div className="col-md-12">
                    <section className="panel">
                        <div className="panel-body row">
                            <div className="col-7">
                                <div className="pro-img-details">
                                    {places.map(place =>
                                        <div >
                                            <img src={`/assets/imgs/${place.image}`} alt="" />
                                            <span className="posted_in row">.</span>
                                        </div>
                                    )}
                                </div>

                                <form onSubmit={submitCreateAsk}>
                                    <div className="form-group">
                                        <label><strong>Nhập câu hỏi:</strong></label>
                                        <input type="text" required className="form-control" name='question' value={ask.question} onChange={handleDataAsk} />
                                    </div>
                                    <p>
                                        <button className="btn btn-round btn-primary"> Đặt câu hỏi</button>
                                    </p>
                                </form>

                                <div>
                                    <h4 className="pro-price"><strong>Thảo luận</strong></h4>
                                    <span className="tagged_as">
                                        {asks.map(ask =>
                                            <div className="posted_in col">
                                                <span className="posted_in row"><strong>Khách hàng {ask.idCustomer} : </strong>{ask.question} </span>
                                                <span className="posted_in row">Trả lời: {ask.answer} </span>
                                            </div>
                                        )}
                                    </span>
                                </div>

                            </div>
                            <div className="col-5">
                                <h4 className="text-primary">
                                    <strong>{tour.title}</strong>
                                </h4>
                                <p>
                                    {tour.description}
                                </p>
                                <div className="product_meta">
                                    <span className="posted_in"> <strong>Ngày khởi hành:</strong> {tour.dateStart} </span>
                                    <span className="tagged_as"><strong>Ngày kết thúc:</strong> {tour.dateEnd} </span>
                                    <span className="tagged_as"><strong>Dịch vụ:</strong>
                                        {services.map(service =>
                                            <div >
                                                <span className="posted_in col">{service.name} </span>
                                            </div>
                                        )}
                                    </span>
                                    <span className="tagged_as"><strong>Điểm đến:</strong>
                                        {places.map(place =>
                                            <div >
                                                <span className="posted_in col">{place.name} </span>
                                            </div>
                                        )}
                                    </span>
                                    <span className="tagged_as"><strong>Phương tiện:</strong>
                                        {vehicles.map(vehicle =>
                                            <div >
                                                <span className="posted_in col">{vehicle.name} - {vehicle.idVehicle}</span>
                                            </div>
                                        )}
                                    </span>
                                </div>

                                <div className="m-bot15"> <strong>Giá : </strong>  <span className="pro-price"> {tour.price} đ</span></div>
                                <form onSubmit={submitCreateBooking}>
                                    <div className="form-group">
                                        <label><strong>Chọn số lượng:</strong></label>
                                        <input type="number" required min={1} className="form-control" name='quantityPeople' value={booking.quantityPeople} onChange={handleDataBooking} />
                                    </div>
                                    <p>
                                        <button className="btn btn-round btn-danger"> Đặt tour</button>
                                    </p>
                                </form>

                                <div>
                                    <h4 className="pro-price"><strong>Đánh giá:</strong></h4>
                                    <span className="tagged_as">
                                        {bookings.map(booking =>
                                            <div className="posted_in col">
                                                <span className="posted_in row"><strong>Khách hàng {booking.idCustomer} : </strong>{booking.judge} </span>
                                            </div>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
export default Details