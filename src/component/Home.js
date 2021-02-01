import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'


function Home() {
    return (

        <React.Fragment>
        
        <nav class="navbar navbar-expand-lg   ">
            <a style={{color: "white"}} class="navbar-brand"  href="#">MyHotel</a>
            <button  class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <Link style={{color: "white"}} class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
                </li>
                <li class="nav-item active">
                    <Link style={{color: "white"}} class="nav-link" to="/admin">Management </Link>
                </li>
                
                </ul>
                <ul  class="navbar-nav mr-auto" style={{marginLeft:"65%", textDecorationColor: "black"}}>
                <div class="form-inline my-2 my-lg-0">
                <li class="nav-item active">
                <Link style={{color: "white"}} class="nav-link" to="/registration">Sign Up</Link>
                </li>
                <li class="nav-item active">
                <Link style={{color: "white"}} class="nav-link" to="/login">Login</Link>
                </li>
                </div>
                </ul>
                
                
            </div>
            </nav> 

            <div className="myDiv">
            <div class="row">
            <div class="col-sm" >
            <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel" style={{width : "950px", height  : "300px" }}>
                {/* <ol class="carousel-indicators"> */}
                    {/* <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li> */}
                    {/* <li data-target="#carouselExampleCaptions" data-slide-to="1"></li> */}
                    {/* <li data-target="#carouselExampleCaptions" data-slide-to="2"></li> */}
                {/* </ol> */}
                <div class="carousel-inner" >
                    <div class="carousel-item active">
                    <img src="https://cdn.pixabay.com/photo/2019/08/19/13/58/bed-4416515_960_720.jpg" class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Luxury Room</h5>
                        <p>Get the best luxurious room at best price</p>
                    </div>
                    </div>
                    <div class="carousel-item">
                    <img src="https://cdn.pixabay.com/photo/2014/07/10/17/17/hotel-389256__340.jpg" class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Lobby</h5>
                        <p>Lobby view of our hotel for customer comfort.</p>
                    </div>
                    </div>
                    <div class="carousel-item">
                    <img src="https://cdn.pixabay.com/photo/2016/02/19/10/01/hotel-1209021__340.jpg" class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Outside View</h5>
                        <p>Our hotel outside view enjoyable.</p>
                    </div>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
                </div>  
                </div>
                
                <div class="col-sm">
                <div class="card" style={{width: "18rem", marginTop: "5%", marginLeft: "10%"}}>
                
                <div class="card-body">
                    <h5 class="card-title">Room Booking</h5>
                    <p class="card-text">We have the best rooms in country. You are one step away from booking. Check our luxurious room. Book now!! </p>
                    <div class="card-body" style={{backgroundColor:"rgb(255, 51, 0)", color:"white"}}>
                    <p class="card-text" style={{fontWeight:"bold"}} >Take look...!!</p>
                    </div>
                </div>
                </div>

                <div class="card" style={{width: "18rem", marginTop: "15%", marginLeft: "10%"}}>
                
                <div class="card-body">
                    <h5 class="card-title">Food Delivery</h5>
                    <p class="card-text">We provide you delivery at your door step.  Hurry up Now!!</p>
                    <div class="card-body" style={{backgroundColor:"rgb(255, 51, 0)", color:"white"}}>
                    <p class="card-text" style={{fontWeight:"bold"}} >Order Now...!!</p>
                    </div>
                </div>
                </div>
                
                </div> 

                </div>             
                </div>      



        </React.Fragment>
    )
}

export default Home
