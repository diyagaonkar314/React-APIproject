import React, { Component } from 'react'
import {Link} from 'react-router-dom'
//import './Bill.css'

export class Bill extends Component {
    render() {
        return (
            <React.Fragment>
                
        <nav class="navbar navbar-expand-lg navbar-light">
            <Link class="navbar-brand" style={{color:"white"}} to="/">MyHotel</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                <Link class="nav-link" style={{color:"white"}} to="/">Home <span class="sr-only">(current)</span></Link>
                </li>
                <li class="nav-item active">
                    
                </li>
                <li class="nav-item dropdown">
                    <Link class="nav-link dropdown-toggle" to="#" style={{color: "white", backgroundColor:"#550F5D"}}id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Services
                    </Link>
                    <div class="dropdown-menu" style={{color: "white", backgroundColor:"#550F5D"}} aria-labelledby="navbarDropdown">
                    <Link class="dropdown-item" style={{color:"white"}} to="/book">Book Your Room</Link>
                    <div class="dropdown-divider"></div>
                    <Link class="dropdown-item" style={{color:"white"}} to="/food">Order Food</Link>
                    </div>
                </li>

                </ul>
                <ul  class="navbar-nav mr-auto" style={{marginLeft:"75%", textDecorationColor: "black"}}>
                <div class="form-inline my-2 my-lg-0">
                
                <li class="nav-item active">
                <Link class="nav-link" style={{color:"white"}} to="/">Logout</Link>
                </li>
                </div>
                </ul>
                
                
            </div>
            </nav>


            <div class="card mt-2 ml-2" style={{width: "50rem"}}>
                <div class="card-body">
                    <h5 class="card-title">Booking Details</h5>
                    <form autoComplete="off">
                    <h6 class="card-subtitle mb-2 text-muted">No. of Person</h6>
                    
                    
                        <div className="form-group input-group ">
                            <div className="input-group-prepend">
                                <div className="input-group-text">

                                    <i className="fas fa-user"></i>
                                </div>
                            </div>
                            <input type="number" value ="1" className="form-control" name="fullName"/>

                        </div>

                        <div className="form-row">

                        <div className="form-group input-group col-md-6">
                            <div className="input-group-prepend ">
                                <div className="input-group-text">

                                    <i className="fas fa-bed"></i>
                                </div>
                            </div>
                            <input value ="2x" className="form-control" name="room"    />

                        </div>

                        <div className="form-group input-group col-md-6">
                            <div className="input-group-prepend">
                                <div className="input-group-text">

                                    <i className="fas fa-rupee-sign"></i>
                                </div>
                            </div>
                            <input className="form-control" placeholder="Email" name="email" value="2500"/>

                        </div>

                    </div>

                    <div className="form-group input-group ">
                            <div className="input-group-prepend">
                                <div className="input-group-text">

                                    <i className="fas fa-calendar-day"></i>
                                </div>
                            </div>
                            <input placeholder ="No.of days" className="form-control" name="days"/>

                        </div>

                    <div className="form-group">
                            <textarea className="form-control" placeholder="Specification" name="address" 
                            />
                        </div>

                        <div className="form-group">
                            <Link type="submit" value="Confirm Booking" style={{backgroundColor: "rgb(255, 51, 0)",  color : "white"}}  className="btn btn-primary " to="/confirm">Confirm Booking</Link>
                        </div>

                    </form>    
                     
                    
                </div>
                </div>


            </React.Fragment>
        )
    }
}

export default Bill
