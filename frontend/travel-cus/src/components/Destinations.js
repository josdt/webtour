// import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Popup from "reactjs-popup";
import Detail from "./Detail.js"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"



import axios from 'axios';
import { logDOM, render } from '@testing-library/react';

const Destinations = () => {

  const url = "http://localhost:8080/travel/showtour"
  const [tours, setTours] = useState([])

  useEffect(() => {
    const fetchData = fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTours(data);
        setFoundTours(data)
      });
  }, [])


  const [title, setTitle] = useState('');

  // the search result
  const [foundTours, setFoundTours] = useState(tours);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = tours.filter((tour) => {
        return tour.tour.title.toLowerCase().search(keyword.toLowerCase()) > -1;
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundTours(results);
    } else {
      setFoundTours(tours);

      // If the text field is empty, show all users
    }

    setTitle(keyword);
  };



  return (
    <section className='destinations'>
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">Tìm kiếm tour:</div>
        </div>
        <input type="search" value={title} onChange={filter} class="form-control" placeholder="nhập vào từ khoá bạn muốn tìm kiếm..." />
      </div>
      <h3 className="text-warning"><strong>Điểm đến nổi bật!</strong></h3>
      <div className="list-tour">
        {foundTours.map(tour =>
          <div key={tour.tour.idTour} className='grid'>
            <div>
              <img src={`assets/imgs/${tour.images}`}></img>
              <h3 className="text-primary"><strong>{tour.tour.title}</strong></h3>
              <p>
                {tour.tour.description}
              </p>
              <p className="pro-price">
                <strong>{tour.tour.price} đ</strong>
              </p>

              <Link className='text-infor' to={`/detail/${tour.tour.idTour}`} >
                Chi tiết tour
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Destinations