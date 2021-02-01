import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';



export class RoomCreate extends Component {

    constructor(props){
        super(props)
        this.state = {
           
            Rtype : '',
            Rstatus : '',
            Rprice : '',

            formErrors: {}
        }
    }

    handleFormValidation(){

        const {Rtype, Rstatus, Rprice} = this.state;    
        let formErrors = {};    
        let formIsValid = true; 

        console.log("Welcome");
        console.log(Rtype);
        if(!Rtype){
        
       
            formIsValid = false;
            formErrors["RtErr"] = "Room Type is required";
            
        }
        else
            {
                    var pin = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;    
                    if (!pin.test(Rtype)) {    
                        formIsValid = false;    
                        formErrors["RtErr"] = "Invalid Room Type! use only alphabetic characters.";    
                    }  
            }

            if(!Rstatus){
        
       
                formIsValid = false;
                formErrors["RsErr"] = " Status is required";
                
            }
            else
                {
                        var rs = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;    
                        if (!rs.test(Rstatus)) {    
                            formIsValid = false;    
                            formErrors["RsErr"] = "Invalid status! use only alphabetic characters.";    
                        }  
                }

                if(!Rprice){
        
                    formIsValid = false;
                    formErrors["RpErr"] = "Price is required";
                    
                }
                else
                    {
                            var pr = /^[0-9]{4,7}$/;    
                            if (!pr.test(Rprice)) {    
                                formIsValid = false;    
                                formErrors["RpErr"] = "Invalid Price! use only alphabetic characters.";    
                            }  
                    }


    this.setState({ formErrors: formErrors });   
    console.log(formIsValid) 
    return formIsValid;
    }
    
    
    changeHandler = (e) => {
        this.setState ({[e.target.name]: e.target.value})
    }

    // handleSubmit = (e) => {    
    //     e.preventDefault();   
        
    
    //     if(this.handleFormValidation())
    //     {
    //         console.log("Entered");
    //     }
    // }  
    submitHandler = e => {
        e.preventDefault()
        console.log(this.state);

        if (this.handleFormValidation()) {    
        console.log("Entered");
        this.setState(this.initialState) 
        
        axios.post('https://localhost:44384/api/Room', this.state)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

        alert('Registerd Succesfully') 
        window.location.href = "/room"
        }
       
        
    }

    render() {
        const{Rtype, Rstatus, Rprice} = this.state
        const{RtErr, RsErr, RpErr} = this.state.formErrors;
        return (
            
                <>

<nav class="navbar navbar-expand-lg navbar-light ">
            <a class="navbar-brand" style={{color:"white"}} href="#">MyHotel</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <Link class="nav-link" style={{color:"white"}} to="/">Home </Link>
                </li>
                <li class="nav-item active">
                <Link class="nav-link" style={{color:"white"}} to="/room"> Rooms </Link>
                </li>
                <li class="nav-item active">
                <Link class="nav-link" style={{color:"white"}} to="/employee"> Emloyee </Link>
                </li>
                <li class="nav-item active">
                <Link class="nav-link" style={{color:"white"}} to="/fDisplay"> Food </Link>
                </li>
                
                <li class="nav-item dropdown">
                <Link class="nav-link dropdown-toggle" style={{color:"white"}} to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Services
                    </Link>
                    <div class="dropdown-menu" style={{color: "white", backgroundColor:"#550F5D"}} aria-labelledby="navbarDropdown">
                    <Link class="dropdown-item" style={{color:"white"}} to="/viewbooking">View Bookings</Link>
                    <div class="dropdown-divider"></div>
                    <Link class="dropdown-item" style={{color:"white"}} to="/viewguest">View Customer List</Link>
                    <div class="dropdown-divider"></div>
                    <Link class="dropdown-item" style={{color:"white"}} to="/viewhotel">View Food Booking</Link>
                    
                    </div>
                </li>

                </ul>
                <ul  class="navbar-nav mr-auto" style={{marginLeft:"60%", textDecorationColor: "black"}}>
                <div class="form-inline my-2 my-lg-0">
                <li class="nav-item active">
                <Link class="nav-link" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" style={{color:"white"}} to="/rCreate" ><i class="fa fa-plus " aria-hidden="true"></i></Link>
                </li>
                <li class="nav-item active">
                <Link class="nav-link" style={{color:"white"}} to="/">Logout</Link>
                </li>
                </div>
                </ul>
                
                
            </div>
            </nav> 
        
                <form className="form2" onSubmit={this.submitHandler}>

                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Room</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="modal-body">
                        
                        <div class="form-group">
                            
                            <input type="text" placeholder="Enter Room type" name="Rtype"   class="form-control" 
                            value={Rtype}    
                            onChange={this.changeHandler}   
                                
                            className={ RtErr ? ' showError' : ''}  />
                            {RtErr &&    
                              <div style={{ color: "red", paddingBottom: 10 }}>{RtErr}</div>    
                            }  
                        </div>

                        <div class="form-group">
                            
                            <input type="text" placeholder="Enter Room status" name="Rstatus"   class="form-control" 
                            value={Rstatus}    
                            onChange={this.changeHandler}    
                                
                           className={ RsErr ? ' showError' : ''}/>
                            {RsErr &&    
                              <div style={{ color: "red", paddingBottom: 10 }}>{RsErr}</div>    
                            } 
                        </div>

                        <div class="form-group">
                            
                            <input type="text" placeholder="Enter Room price" name="Rprice"   class="form-control" 
                            value={Rprice}    
                            onChange={this.changeHandler} 
                                
                            className={ RpErr ? ' showError' : ''} />  
                            {RpErr &&    
                              <div style={{ color: "red", paddingBottom: 10 }}>{RpErr}</div>    
                            } 
                        </div>
                </div>
                <div class="modal-footer">
                        
                        <button type="submit"   class="btn btn-primary" style={{backgroundColor: "rgb(255, 51, 0)",  color : "white", marginRight:"150px"}}  >Save</button>
                </div>


                </div>
                </div>
                
                </form>  


                </>
            
        )
    }
}

export default RoomCreate
