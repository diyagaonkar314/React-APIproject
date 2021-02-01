import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


export class EmployeeCreate extends Component {

    constructor(props) {    
        super(props);    
        this.state = { 
            
            Eid:'',
            Ename:'',
            Eservice:'',
            Eshift:'',
            Erole:'',
            Salary:'',
        
        formErrors: {}
    }
}

handleFormValidation() {    
    const { Eid, Ename, Eservice,Eshift,Erole,Salary } = this.state;    
    let formErrors = {};    
    let formIsValid = true; 

    if(!Eid){
        
       
        formIsValid = false;
        formErrors["empidErr"] = "Employee ID is required";
        
    }
    else
        {
                var pin = /^[0-9]{3}$/;    
                if (!pin.test(Eid)) {    
                    formIsValid = false;    
                    formErrors["empidErr"] = "Invalid EmpID! use only numeric characters.";    
                }  
        }
     
    if(!Ename){
        formIsValid = false;
        formErrors["empnameErr"] = "Employee name is required";
    }
    else
    {
                var enme = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;    
                if (!enme.test(Ename)) {    
                    formIsValid = false;    
                    formErrors["empnameErr"] = "Invalid Employee name! use only alphabetic characters.";    
                }  
    }


    if(!Eservice){
        formIsValid = false;
        formErrors["serviceErr"] = "Please provide the service ";
    }
    else
    {
                var ser =/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;    
                if (!ser.test(Eservice)) {    
                    formIsValid = false;    
                    formErrors["serviceErr"] = "Invalid service! use only alphabetic characters.";    
                }  
    }
    

    if(!Eshift){
        formIsValid = false;
        formErrors["shiftErr"] = "Please provide the shift";
    }
    else
    {
                var shif = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;    
                if (!shif.test(Eshift)) 
                {    
                    formIsValid = false;    
                    formErrors["shiftErr"] = "Invalid shift! use only alphabetic characters.";    
                }  
    }

    if(!Erole){
        formIsValid = false;
        formErrors["roleErr"] = "Please provide the role";
    }
    else
    {
                var rl = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;    
                if (!rl.test(Erole)) {    
                    formIsValid = false;    
                    formErrors["roleErr"] = "Invalid role! use only alphabetic characters.";    
                }  
    }

    if(!Salary){
        formIsValid = false;
        formErrors["salaryErr"] = "Please provide the salary";
    }
    else
    {
                var sal = /^[0-9]{5,6}$/;    
                if (!sal.test(Salary)) {    
                    formIsValid = false;    
                    formErrors["salaryErr"] = "Invalid salary! use only numeric characters.";    
                }  
    }


    this.setState({ formErrors: formErrors });    
    return formIsValid;
}

changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
}


handleSubmit = (e) => {    
    e.preventDefault();    

    if (this.handleFormValidation()) {    
           
        this.setState(this.initialState) 
        
    }
    
      
}

submitHandler = e => {
    e.preventDefault()

    if (this.handleFormValidation()) {    
           
        this.setState(this.initialState) 
        console.log(this.state);

        axios.post('https://localhost:44384/api/Employee', this.state)
        .then(response => {
            console.log(response)

        })
        .catch(error => {
            console.log(error)
        })
        

        alert('Registerd Succesfully') 
        window.location.href = "/employee"
    }
    
    

    

       
}


    
    render() {
        const {  empidErr, empnameErr ,serviceErr, shiftErr, roleErr, salaryErr} = this.state.formErrors; 
        const { Eid, Ename, Eservice,Eshift,Erole,Salary } = this.state;    
        
        return (

            <React.Fragment>
        
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
                <li class="nav-item dropdown"></li>
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
                <Link class="nav-link" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" style={{color:"white"}} ><i class="fa fa-plus " aria-hidden="true"></i></Link>
                </li>
                <li class="nav-item active">
                <Link class="nav-link" style={{color:"white"}} to="/">Logout</Link>
                </li>
                </div>
                </ul>
                
                
            </div>
            </nav> 
            
            <div>
            <form  className="form" onSubmit={this.submitHandler}  >       
                    <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Employee</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        
                        <div class="form-group">
                            
                            <input type="text" placeholder="Enter Employee ID" name="Eid"   class="form-control" 
                            value={Eid}    
                            onChange={this.changeHandler}    
                                
                            className={empidErr ? ' showError' : ''}/>
                            {empidErr &&    
                              <div style={{ color: "red", paddingBottom: 10 }}>{empidErr}</div>    
                            } 
                        </div>
                        <div class="form-group">
                            
                            <input type="text"  placeholder="Enter Employee Name"  name="Ename"  class="form-control" id="date1"
                            value={Ename}    
                            onChange={this.changeHandler}    
                                
                            className={empnameErr ? ' showError' : ''}/>
                            {empnameErr &&    
                              <div style={{ color: "red", paddingBottom: 10 }}>{empnameErr}</div>    
                            } 
                        </div>
                        <div class="form-group">
                            
                            <input type="text"  placeholder="Enter Service" name="Eservice"  class="form-control" id="date2"
                            value={Eservice}    
                            onChange={this.changeHandler}    
                                
                            className={serviceErr ? ' showError' : ''}/>
                            {serviceErr &&    
                              <div style={{ color: "red", paddingBottom: 10 }}>{serviceErr}</div>    
                            } 
                        </div>
                        <div class="form-group">
                            
                            <input type="text"  placeholder="Shift" name="Eshift"  class="form-control" id="date2"
                            value={Eshift}    
                            onChange={this.changeHandler}    
                                
                            className={shiftErr ? ' showError' : ''}/>
                            {shiftErr &&    
                              <div style={{ color: "red", paddingBottom: 10 }}>{shiftErr}</div>    
                            } 
                        </div>
                        <div class="form-group">
                            
                            <input type="text"  placeholder="Role" name="Erole" class="form-control" id="date2"
                            value={Erole}    
                            onChange={this.changeHandler}    
                                
                            className={roleErr ? ' showError' : ''}/>
                            {roleErr &&    
                              <div style={{ color: "red", paddingBottom: 10 }}>{roleErr}</div>    
                            } 
                        </div>
                        <div class="form-group">
                            
                            <input type="text"  placeholder="Salary"  name="Salary" class="form-control" id="date1"
                            value={Salary}    
                            onChange={this.changeHandler}    
                                
                            className={salaryErr ? ' showError' : ''}/>
                            {salaryErr &&    
                              <div style={{ color: "red", paddingBottom: 10 }}>{salaryErr}</div>    
                            } 
                        </div>
                       
                    </div>
                    <div class="modal-footer">
                        
                        <button type="submit"   class="btn btn-primary" style={{backgroundColor: "rgb(255, 51, 0)",  color : "white", marginRight:"150px"}}  >Save</button>
                    </div>
                    </div>
                </div>
                </form>
                </div>

               


            </React.Fragment>
            
        )
    }

}


export default EmployeeCreate

