import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Login.css'


export class Login extends Component {

    constructor(props) {    
        super(props);    
        this.state = { 
    
        Cid: '',
        Cpass:'',
        formErrors: {}
    }

    this.Cid = this.Cid.bind(this);
    this.Cpass = this.Cpass.bind(this);
    this.login = this.login.bind(this);
}

Cid(event) {
    this.setState({ Cid: event.target.value })
}
Cpass(event) {
    this.setState({ Cpass: event.target.value })
}

handleFormValidation() {    
    const {  Cid, Cpass } = this.state;    
    let formErrors = {};    
    let formIsValid = true; 

    

    if(!Cid){
        formIsValid = false;
        formErrors["emailErr"] = "Email is required";
    }

    if(!Cpass){
        formIsValid = false;
        formErrors["passErr"] = "Password is required";
    }

     
   
    this.setState({ formErrors: formErrors });    
    return formIsValid;
}

handleChange = (e) => {    
    const { name, value } = e.target;    
    this.setState({ [name]: value });    
}    

// handleSubmit = (e) => {    
//     e.preventDefault();    

//     if (this.handleFormValidation()) {    
//         alert('Login Successfull')    
//         this.setState(this.initialState) 
//         window.location.href =  "/book"
//     }
    
      
// }


login(event) {
    event.preventDefault()
    
    fetch('https://localhost:44384/api/login/Login', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Cid: this.state.Cid,
            Cpass: this.state.Cpass
        
        })
    }).then((Response) => Response.json())
        .then((result) => {
            
            localStorage.setItem('user',this.state.Cid)
            console.log(result);
            
            if (result.Status == 'Invalid')
                alert('Invalid User');
            else

                //var id = result.userID
                this.props.history.push('/userD');
        })
}

    render() {
        const {  emailErr, passErr ,valErr} = this.state.formErrors; 

        return (

            <React.Fragment>
        
        <nav  class="navbar navbar-expand-lg navbar-light  navbar1 ">
            <Link class="navbar-brand navbar1 " style={{color:"white",paddingTop:"20px"}} to="/">MyHotel</Link>
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
               

                </ul>
                <ul  class="navbar-nav mr-auto" style={{marginLeft:"75%", textDecorationColor: "black"}}>
                <div class="form-inline my-2 my-lg-0">
                <li class="nav-item active">
                <Link class="nav-link" to="/registration" style={{color:"white"}}>Sign Up</Link>
                </li>
                {/* <li class="nav-item active">
                <Link class="nav-link" to="/login" style={{color:"white"}}>Login</Link>
                </li> */}
                </div>
                </ul>
                
                
            </div>
            </nav> 
            <div className="containe-sm mt-4">
            
            <form className="form1" id="lform" name="validform" onSubmit={this.login}>
            <h3 style={{marginLeft:"35%", fontSize: "35px"}}>Login</h3>
            <br/>
            <div class="form-group">
            
              <input type="text" class="form-control myform" id="exampleInputEmail1" name="Cid"  placeholder="Enter your email"
              value={this.state.Cid}    
              onChange={this.handleChange}    
                  
              className={emailErr ? ' showError' : ''}/>
              {emailErr &&    
                <div style={{ color: "red", paddingBottom: 10 }}>{emailErr}</div>    
              } 
            </div>
            <div class="form-group">
              
              <input type="password" class="form-control myform" id="exampleInputPassword1" name="Cpass" placeholder="Enter your password"
              value={this.state.Cpass}    
              onChange={this.handleChange}    
                
              className={passErr ? ' showError' : ''}/>
              {passErr &&    
                    <div style={{ color: "red", paddingBottom: 10 }}>{passErr}</div>    
                } 
            </div>
            <input type="submit" style={{backgroundColor: "rgb(255, 51, 0)",  color : "white",marginLeft:"25%"}}  value="Login"  class="btn"/>
            
            {valErr &&    
                    <div style={{ color: "red", paddingBottom: 10 }}>{valErr}</div>    
            }
            
            </form>
            </div>
            </React.Fragment>
           
        )
    }
}

export default Login
