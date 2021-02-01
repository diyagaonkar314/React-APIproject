import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class Admin extends Component {
    constructor(props) {    
        super(props);    
        this.state = { 
    
        email: '',
        password:'',
        formErrors: {}
    }
}

handleFormValidation() {    
    const {  email, password } = this.state;    
    let formErrors = {};    
    let formIsValid = true; 

    

    if(!email){
        formIsValid = false;
        formErrors["emailErr"] = "Email is required";
    }

    else if(!password){
        formIsValid = false;
        formErrors["passErr"] = "Password is required";
    }

    else if(!(email=="admin@gmail.com" && password=="Admin1234")){
        formIsValid = false;
        formErrors["valErr"] = "Invalid Email and Password";
    }

    

    this.setState({ formErrors: formErrors });    
    return formIsValid;
}

handleChange = (e) => {    
    const { name, value } = e.target;    
    this.setState({ [name]: value });    
}    

handleSubmit = (e) => {    
    e.preventDefault();    

    if (this.handleFormValidation()) {    
        alert('Login Successfull')    
        window.location.href = "/employee" ;
        
        
    }
    
      
}
    render() {
        const {  emailErr, passErr ,valErr} = this.state.formErrors;
        return (
            <React.Fragment>
        
        <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" style={{color:"white"}} href="#">MyHotel</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <Link class="nav-link" style={{color:"white"}} to="/">Home </Link>
                </li>
                
                </ul>
                <ul  class="navbar-nav mr-auto" style={{marginLeft:"80%", textDecorationColor: "black"}}>
                <div class="form-inline my-2 my-lg-0">
                
                <li class="nav-item active">
                <Link class="nav-link" style={{color:"white"}} to="/admin">Login</Link>
                </li>
                </div>
                </ul>
                
                
            </div>
            </nav> 

            <div className="containe-sm">
            <h1 >Admin Login</h1>
            <form className="form1" id="lform" name="validform" onSubmit={this.handleSubmit}>
            
            <div class="form-group">
            
              <input type="text" class="form-control myform" id="exampleInputEmail1"  name="email" placeholder="Enter your email"
              value={this.state.email}    
              onChange={this.handleChange}    
                  
              className={emailErr ? ' showError' : ''}/>
              {emailErr &&    
                <div style={{ color: "red", paddingBottom: 10 }}>{emailErr}</div>    
              }
            </div>
            <div class="form-group">
              
              <input type="password" class="form-control myform" id="exampleInputPassword1" name="password" placeholder="Enter your password"
              value={this.state.password}    
              onChange={this.handleChange}    
                
              className={passErr ? ' showError' : ''}/>
              {passErr &&    
                    <div style={{ color: "red", paddingBottom: 10 }}>{passErr}</div>    
                } 
            </div>
            <button type="submit" style={{backgroundColor: "rgb(255, 51, 0)",  color : "white",marginLeft:"20%"}}  class="btn btn-primary">Login</button>
            {valErr &&    
                    <div style={{ color: "red", paddingBottom: 10 }}>{valErr}</div>    
            }
            </form>

            </div>

            </React.Fragment>
        )
    }
}

export default Admin
