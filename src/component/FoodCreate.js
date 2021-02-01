import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

export class FoodCreate extends Component {
    constructor(props){
        super(props)
        this.state = {
           
            Fname : '',
            Fprice : '',
            

            formErrors: {}
        }
    }

    handleFormValidation(){

        const {Fname, Fprice} = this.state;    
        let formErrors = {};    
        let formIsValid = true; 

        
        if(!Fname){
        
       
            formIsValid = false;
            formErrors["RtErr"] = "Food name is required";
            
        }
        else
            {
                    var pin = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;    
                    if (!pin.test(Fname)) {    
                        formIsValid = false;    
                        formErrors["RtErr"] = "Invalid Food name is inavlid! use only alphabetic characters.";    
                    }  
            }

            

                if(!Fprice){
        
                    formIsValid = false;
                    formErrors["RpErr"] = "Price is required";
                    
                }
                else
                    {
                            var pr = /^[0-9]+$/;    
                            if (!pr.test(Fprice)) {    
                                formIsValid = false;    
                                formErrors["RpErr"] = "Invalid Price! use only numeric character";    
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
        
        axios.post('https://localhost:44384/api/Food', this.state)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

        alert('Registerd Succesfully') 
        window.location.href = "/fDisplay"
        }
       
        
    }

    render() {
        const{ Fname, Fprice} = this.state
        const{RtErr, RpErr} = this.state.formErrors;
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
                        <h5 class="modal-title" id="exampleModalLabel">Add Food</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="modal-body">
                        
                        <div class="form-group">
                            
                            <input type="text" placeholder="Enter Room type" name="Fname"   class="form-control" 
                            value={Fname}    
                            onChange={this.changeHandler}   
                                
                            className={ RtErr ? ' showError' : ''}  />
                            {RtErr &&    
                              <div style={{ color: "red", paddingBottom: 10 }}>{RtErr}</div>    
                            }  
                        </div>

                        

                        <div class="form-group">
                            
                            <input type="text" placeholder="Enter Room price" name="Fprice"   class="form-control" 
                            value={Fprice}    
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

export default FoodCreate
