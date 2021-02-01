import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class Foodbill extends Component {
    handleLogout = () => {
    
        localStorage.clear();
    
      };
    render() {
        return (
            <React.Fragment>

            <nav class="navbar navbar-expand-lg navbar-light ">
            <Link class="navbar-brand" style={{color:"white"}} to="">MyHotel</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                
                <li class="nav-item active">
                    
                </li>

                <li class="nav-item dropdown">
                <Link class="nav-link dropdown-toggle" style={{color:"white"}} to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Services
                    </Link>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link class="dropdown-item" style={{color:"white"}} to="/book">Book Your Room</Link>
                    
                    <div class="dropdown-divider"></div>
                    <Link class="dropdown-item" style={{color:"white"}} to="#">Order Food</Link>
                    </div>
                </li>

                </ul>
                <ul  class="navbar-nav mr-auto" style={{marginLeft:"75%", textDecorationColor: "black"}}>
                <div class="form-inline my-2 my-lg-0">
                <li class="nav-item active">
                <Link class="nav-link" style={{color:"white"}} to="/userD"><i class="fa fa-user" aria-hidden="true"></i></Link>
                </li>
                
                
                <li class="nav-item active">
                <Link class="nav-link" onClick={this.handleLogout} style={{color:"white"}} to="/">Logout</Link>
                </li>
                </div>
                </ul>
                
                
            </div>
            </nav>

            <div class="card">
                <div class="card-header">
                    Confirmation with you.
                </div>
                <div class="card-body">
                    <h5 class="card-title">Thank you for ordering food..!! <i class="far fa-smile-beam"></i></h5>
                    <p>
                    <label >Your order</label>
                    {""} has been {""}
                   <label >recived by our restaurant</label>
                    <br/>
                    You will recive your order soon..!!
                    <br/>
                    Our Delivery Boy will contact you with given number <br/>
                    Have a nice day</p>
                    <p style={{fontWeight:"bold"}}>
                    Pay Your Bill at Door Step..!!
                    </p>
                    <Link to="/food" class="btn btn-primary" style={{backgroundColor: "rgb(255, 51, 0)",  color : "white"}}>View more</Link>
                </div>
            </div>

            


            </React.Fragment>
        )
    }
}

export default Foodbill
