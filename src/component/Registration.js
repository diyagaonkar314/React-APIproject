import React from 'react'
import {Link} from 'react-router-dom'
import './reg.css'
import axios from 'axios'


class Registration extends React.Component{ 

    constructor(props) {    
        super(props);    
        this.state = { 
    
        Cid: '',
        Cname: '',
        Cemail: '',
        Cphone: '',
        Ccity: '',
        Cdob: '',
        Cpincode:'',
        Cnation: '',
        Cgen:'',
        Cpass:'',
        formErrors: {}
    }
}

    handleFormValidation() {    
        const { Cid, Cname,Cemail, Cphone, Ccity, Cdob, Cpincode, Cnation, Cgen, Cpass, cpass } = this.state;    
        let formErrors = {};    
        let formIsValid = true;  
        
        
        if(!Cid){
            formIsValid = false;
            formErrors["CidErr"]= "Customer ID is requried";
        }
        else{
            var type =  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,10}/;
            if(!type.test(Cid)){
                formIsValid = false;
                formErrors["CidErr"] = "Id must be alpha numeric minimum 5 and maximum 10 characters";
            }
        }
    
        //Student name     
        if (!Cname) {    
            formIsValid = false;    
            formErrors["fnameErr"] = "Name is required.";    
        } 
        else{
            var pattern = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;    
            if (!pattern.test(Cname)) {    
                formIsValid = false;    
                formErrors["fnameErr"] = "Invalid Name!use only alphabetic characters";    
            }  
        }   
    
        //Email    
        if (!Cemail) {    
            formIsValid = false;    
            formErrors["emailIdErr"] = "Email id is required.";    
        }    
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Cemail))) {    
    
            formIsValid = false;    
            formErrors["emailIdErr"] = "Invalid email id.";    
        }    
    
        //DOB    
        if (!Cdob) {    
            formIsValid = false;    
            formErrors["dobErr"] = "Date of birth is required.";    
        }    
        else {    
            var ptr = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;    
            if (ptr.test(Cdob)) {    
                formIsValid = false;    
                formErrors["dobErr"] = "Invalid date of birth";    
            }    
        }    
    
        //Phone number    
        if (!Cphone) {    
            formIsValid = false;    
            formErrors["phoneNumberErr"] = "Phone number is required.";    
        }    
        else {    
            var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;    
            if (!mobPattern.test(Cphone)) {    
                formIsValid = false;    
                formErrors["phoneNumberErr"] = "Invalid phone number! use only numeric characters.";    
            }    
        }    

        if (!Cpincode) {    
            formIsValid = false;    
            formErrors["pincodeErr"] = "Pincode is required.";    
        }    
        else {    
            var pin = /^[0-9]{6}$/;    
            if (!pin.test(Cpincode)) {    
                formIsValid = false;    
                formErrors["pincodeErr"] = "Invalid Pincode! use only numeric characters.";    
            }    
        } 
    
        if (Cnation === '' || Cnation === "select") {    
            formIsValid = false;    
            formErrors["nationErr"] = "Select your nationality.";    
        }  
        
        if (Cgen === '' || Cgen === "select") {    
            formIsValid = false;    
            formErrors["genderErr"] = "Select gender.";    
        }

        if (!Ccity) {    
            formIsValid = false;    
            formErrors["addressErr"] = "city is required.";    
        }
        else{
            var ptr = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;    
            if (!ptr.test(Ccity)) {    
                formIsValid = false;    
                formErrors["fnameErr"] = "Invalid city!use only alphabetic characters";    
            }  
        } 


        if(!Cpass){
            formIsValid = false;
            formErrors["passErr"] = "Password is required";
        }
        else{
            var passPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}/;
            if (!passPattern.test(Cpass)){
                formIsValid = false;
                formErrors["passErr"] = "Password is invalid! Password must be combination of alphanumeric and one uppercase letter";
                
            }
        }

        if(!cpass){
            formIsValid = false;
            formErrors["cpassErr"] = "Password is required";
        }
        else if(cpass !== Cpass){
            formIsValid = false;
            formErrors["cpassErr"] = "Password is not matching";
        }

        this.setState({ formErrors: formErrors });    
        return formIsValid; 
    }    
    
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }  
    
    // handleSubmit = (e) => {    
    //     e.preventDefault();    
    
    //     if (this.handleFormValidation()) {  

    //         alert('You have been successfully registered.');   
    //         //this.setState(this.initialState)
    //         window.location.href = "/login";
    //     }    
    // }  

    
submitHandler = e => {
    e.preventDefault()

    if (this.handleFormValidation()) {    
           
        this.setState(this.initialState) 
        console.log(this.state);

        axios.post('https://localhost:44384/api/Customer', this.state)
        .then(response => {
            console.log(response)

        })
        .catch(error => {
            console.log(error)
        })
        

        alert('Registerd Succesfully') 
        window.location.href = "/login"
    }
     
}


    
    render(){

        const { fnameErr, emailIdErr, dobErr, phoneNumberErr,pincodeErr, nationErr,addressErr, genderErr, passErr, cpassErr, CidErr } = this.state.formErrors; 
        const { Cid, Cname,Cemail, Cphone, Ccity, Cdob, Cpincode, Cnation, Cgen, Cpass ,cpass} = this.state;    

        return (

            <React.Fragment>
        
    <nav class="navbar navbar-expand-lg navbar-light">
    <Link class="navbar-brand" style={{color:"white"}} href="#">MyHotel</Link>
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
        <Link class="nav-link" style={{color:"white"}} to="/login">Login</Link>
        </li>
        </div>
        </ul>
        
        
    </div>
    </nav>

<div  className="container-sm ">
    <form className="form2" onSubmit={this.submitHandler}>
        <h3>Register Now</h3>
        <br/>
        <div class="row row-cols-2">

        
            <div class="col">
            <div class="form-group">
            
            <input type="text" class="form-control" id="exampleFormControlInput1" name="Cname"  value={Cname}    
                                onChange={this.changeHandler}    
                                  
                                className={fnameErr ? ' showError' : ''}   
                                placeholder="Enter Your Full name"/>
                                {fnameErr &&    
                                <div style={{ color: "red", paddingBottom: 10 }}>{fnameErr}</div>    
                                }  
            </div>

            </div>
            <div class="col">
            <div class="form-group">
            
            <input type="email" class="form-control" id="exampleFormControlInput1" name="Cemail"   placeholder="Enter your email"
            value={Cemail}    
            onChange={this.changeHandler}    
                
            className={emailIdErr ? ' showError' : ''}/>
            {emailIdErr &&    
            <div style={{ color: "red", paddingBottom: 10 }}>{emailIdErr}</div>    
            }    
    
        </div>
            </div>

            <div class="col">
            <div class="form-group">
            
            <input type="text" class="form-control" id="exampleFormControlInput1" name="Cphone"  placeholder="Enter your number"
            
            onChange={this.changeHandler}    
                                value={Cphone}    
                                  
                                className={phoneNumberErr ? ' showError' : ''}/>
            {phoneNumberErr &&    
                                <div style={{ color: "red", paddingBottom: 10 }}>{phoneNumberErr}</div>    
                            } 
            </div>
            </div>

            <div class="col">

            
            <div class="form-group">
            
            <input type="text" class="form-control" name="Ccity" placeholder="Enter your city"  id="exampleFormControlTextarea1" rows="1"
            value={Ccity}    
            onChange={this.changeHandler}    
              
            className={addressErr ? ' showError' : ''}/>
            {
                addressErr &&    
                <div style={{ color: "red", paddingBottom: 10 }}>{addressErr}</div>    
            } 
            </div>
            
            </div>
            <div class="col">
                <div class="form-group">
            <label for="exampleFormControlInput1">Date of birth</label>
            <input type="date" class="form-control" name="Cdob"  id="exampleFormControlInput1"
            value={Cdob}    
            onChange={this.changeHandler}    
            className={dobErr ? ' showError' : ''}/>
            {
                dobErr &&    
                <div style={{ color: "red", paddingBottom: 10 }}>{dobErr}</div>    
            } 
        </div>
        </div>
        
            <div class="col"><div class="form-group">
            <label for="exampleFormControlInput1">Pincode</label>
            <input type="text" class="form-control" name="Cpincode" placeholder="Enter pincode "  id="exampleFormControlInput1"
            onChange={this.changeHandler}    
            value={Cpincode}    
              
            className={pincodeErr ? ' showError' : ''}/>
            {
                pincodeErr &&    
                <div style={{ color: "red", paddingBottom: 10 }}>{pincodeErr}</div>    
            } 
        </div>
        </div>
            <div class="col">
            <div>    
                            <label htmlFor="nationality">Choose your Nationality</label>    
                            <select name="Cnation" onChange={this.changeHandler}    
                                className={nationErr ? ' showError' : ''}    
                                value={Cnation} >    
                                <option value="select">--Select--</option>    
                                <option value="male">Indian</option>
                                <option value="female">Other</option>    
                            </select>    
                            {nationErr &&    
                                <div style={{ color: "red", paddingBottom: 10 }}>{nationErr}</div>    
                            }    
                        </div> 
            </div>
            <div class="col">
            <div>    
                            <label htmlFor="gender">Gender</label>    
                            <select name="Cgen" onChange={this.changeHandler}    
                                className={genderErr ? ' showError' : ''}    
                                value={Cgen} >    
                                <option value="select">--Select--</option>    
                                <option value="male">Male</option>    
                                <option value="female">Female</option>    
                                <option value="female">Other</option>    
                            </select>    
                            {genderErr &&    
                                <div style={{ color: "red", paddingBottom: 10 }}>{genderErr}</div>    
                            }    
                        </div> 
                        </div>
            
        </div>
        
        <div class="row row-cols-2">

        <div class="col">
            <div class="form-group">
            
            <input type="Password" class="form-control" id="exampleFormControlInput1" name="Cpass"  value={Cpass}    
                                onChange={this.changeHandler}    
                                  
                                className={passErr ? ' showError' : ''}   
                                placeholder="Enter Your Password"/>
                                {passErr &&    
                                <div style={{ color: "red", paddingBottom: 10 }}>{passErr}</div>    
                                }  
            </div>

            </div>

            <div class="col">
            <div class="form-group">
            
            <input type="password" class="form-control" id="exampleFormControlInput1" name="cpass"  value={cpass}    
                                onChange={this.changeHandler}    
                                  
                                className={cpassErr ? ' showError' : ''}   
                                placeholder="Enter Your Confirm Password"/>
                                {cpassErr &&    
                                <div style={{ color: "red", paddingBottom: 10 }}>{cpassErr}</div>    
                                }  
            </div>

            </div>
            
            <div class="col">
            <div class="form-group">
                
                <input type="text" class="form-control" id="exampleFormControlInput1" name="Cid"  value={Cid}    
                                onChange={this.changeHandler}    
                                  
                                className={CidErr ? ' showError' : ''}   
                                placeholder="Enter Customer ID"/>
                                {CidErr &&    
                                <div style={{ color: "red", paddingBottom: 10 }}>{CidErr}</div>    
                                }  
            

        </div>
        </div>
        <div class="col">
        <div className ="form-group"  style ={{marginLeft : "40%", }}>
        <input type="submit"  class="btn btn-info" value= "Register Here"  style={{backgroundColor: "rgb(255, 51, 0)",  color : "white"}} />
        </div>
        </div>

        </div>
        
        

        </form>
        </div>
        
        </React.Fragment>
            
        )
    }
}


export default Registration
