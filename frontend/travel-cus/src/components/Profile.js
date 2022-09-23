
import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";


const Profile = () => {


    const url = "http://localhost:8080/travel/customer/"
    const [customer, setCustomer] = useState([])

    const { idCus } = useParams()

    useEffect(() => {
        const fetchData = fetch(url+idCus)
            .then(response => response.json())
            .then(data => {
                setCustomer(data)
            });
    }, [])

    return (
        <div>
            <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                    <div className="container-fluid">
                        <h3 className="text-dark mb-4">Profile</h3>
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <div className="card mb-3">
                                    <div className="card-body text-center shadow"><img className="rounded-circle mb-3 mt-4" src="/assets/imgs/dogs/image3.jpeg" width={160} height={160} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col">
                                        <div className="card shadow mb-3">
                                            <div className="card-header py-3">
                                                <p className="text-primary m-0 font-weight-bold">Thông tin cá nhân</p>
                                            </div>
                                            <div className="card-body">
                                                <form>
                                                    <div className="form-row">
                                                        <div className="col">
                                                            <div className="form-group"><label htmlFor="username"><strong>Tên</strong></label><input className="form-control" type="text" id="username" placeholder={customer.name} /></div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="form-group"><label htmlFor="email"><strong>Giới tính</strong></label><input className="form-control" type="text" id="gender" placeholder={customer.gender} /></div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col">
                                                            <div className="form-group"><label htmlFor="first_name"><strong>Email</strong></label><input className="form-control" type="text" id="first_name" placeholder={customer.email} /></div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="form-group"><label htmlFor="last_name"><strong>Điện thoại</strong></label><input className="form-control" type="text" id="last_name" placeholder={customer.phone} /></div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group"><button className="btn btn-primary btn-sm" type="submit">Cập nhật</button></div>
                                                </form>
                                            </div>
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

export default Profile