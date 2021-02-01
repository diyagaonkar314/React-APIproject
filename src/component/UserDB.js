import React from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import '../component/userCss.css'

class UserDB extends React.Component
{
    constructor(props) {
        super(props)
    
        this.state = {
            
            tableData: [],
            bookData:[],
            formErrors: {},
              

        
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
                formErrors["CidErr"] = "Id must be alpha numeric minimum 5 and maximum 10 letters";
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
                formErrors["fnameErr"] = "Invalid Name";    
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
                formErrors["phoneNumberErr"] = "Invalid phone number.";    
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
                formErrors["pincodeErr"] = "Invalid Pincode.";    
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
            formErrors["addressErr"] = "Address is required.";    
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
    
componentDidMount(){

    var a = localStorage.getItem("user")
    console.log(a)
    axios

    .get(`https://localhost:44384/api/Customer/${a}`)
    .then(res => {

        var data = res.data;
        
        
        this.setState({
            
            tableData:res.data
        })
    });

    
    this.receivedData()
}


receivedData () {
    console.log("Enterd")
    var b = localStorage.getItem("user")
    console.log(b)

    axios
        .get(`https://localhost:44384/api/RBook?Cid=${b}`)
        .then(res => {

            this.setState({
               
                bookData:res.data
               
            })
        })
        .catch(error => {
            console.log(error)
        })


        
}

deleteUser(RBookid){
    //e.preventDefault()
    axios.delete(`https://localhost:44384/api/RBook/${RBookid}`)
    .then(response =>{
        console.log(response);
        console.log(response.data);
        const posts = this.state.bookData.filter(item=> item.RBookid !== RBookid);
        this.setState({posts});
    })
}

 handleLogout = () => {
    
    localStorage.clear();

  };

    render()
    {
         
        return(
            <React.Fragment>
                
        <nav class="navbar navbar-expand-lg navbar-light ">
            <Link class="navbar-brand" style={{color:"white"}} to="/">MyHotel</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                <Link class="nav-link"style={{color:"white"}} to="/">Home <span class="sr-only">(current)</span></Link>
                </li>
                <li class="nav-item active">
                    
                </li>
                <li class="nav-item dropdown">
                <Link class="nav-link dropdown-toggle" style={{color:"white", backgroundColor:"#550F5D"}} to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Services
                    </Link>
                    <div class="dropdown-menu" style={{color: "white", backgroundColor:"#550F5D"}}  aria-labelledby="navbarDropdown">
                    <Link class="dropdown-item" style={{color:"white"}} to="/book">Book Your Room</Link>
                    
                    <div class="dropdown-divider"></div>
                    <Link class="dropdown-item" style={{color:"white"}} to="/food">Order Food</Link>
                    </div>
                </li>

                </ul>
                <ul  class="navbar-nav mr-auto" style={{marginLeft:"75%", textDecorationColor: "black"}}>

                <div class="form-inline my-2 my-lg-0">
                
                <li class="nav-item active">
                    
                <Link class="nav-link" style={{color:"white"}} to="/userD"><i class="fa fa-user" aria-hidden="true"></i></Link>
                </li>
                </div>

                <div class="form-inline my-2 my-lg-0">
                
                <li class="nav-item active">
                <Link class="nav-link" onClick={this.handleLogout} style={{color:"white"}} to="/">Logout</Link>
                </li>
                </div>

                
                </ul>
                
                
            </div>
            </nav>
            

    <div className="row">
        <div className="col col-8">
        <h3>Booking Details</h3>
                <table Style={{marginLeft:"10px"}} class="table mt-4 ml-2">
                <tbody>
                    <tr style={{backgroundColor: '#550F5D', color:'white'}}>
                    <th scope="col"> Bookibg ID</th>
                    <th scope="col"> Coustmer ID</th>
                    <th scope="col"> Room ID</th>
                    <th scope="col"> From Date</th>
                    <th scope="col"> To Date</th>
                    <th scope="col"> Room Type</th>
                    <th scope="col">Price</th>
                    <th scope="col">No. of Person</th>
                    <th></th>
                    
                    </tr>

                    {
                        this.state.bookData.map((item, i) =>
                        <tr key={i}>
                                <td>{item.RBookid}</td>
                                <td>{item.Cid}</td>
                                <td>{item.Rid}</td>
                                <td>{item.Dfrom}</td>
                                <td>{item.Tfrom}</td>
                                <td>{item.Rtype}</td>
                                <td>{item.Rprice}</td>
                                <td>{item.Pcount}</td>
                                <td><td><button style={{backgroundColor: "rgb(255, 51, 0)",  color : "white",marginLeft:"25%", height:"30px", width: "65px", borderRadius: "5px" }} onClick={() => this.deleteUser(item.RBookid)} >Cancel</button></td></td>
                                   
                        </tr>
                        )
                    }
                    
                </tbody>
            </table>
        </div>

        <div  className = "col col-3">
            <h3>Profile</h3>
        <table style={{ border:'2px solid RGB(255,117,24)'}}  class="table mt-4 ml-2">
                <tbody>
                <tr style={{backgroundColor: '#550F5D', color:'white'}}> 
                    <td > ID</td>
                    <td>{this.state.tableData.Cid}</td>
                </tr>
                <tr style={{backgroundColor: '#550F5D', color:'white'}}> 
                    <td > Name</td>
                    <td>{this.state.tableData.Cname}</td>
                </tr>
                <tr style={{backgroundColor: '#550F5D', color:'white'}}> 
                    <td > Email</td>
                    <td>{this.state.tableData.Cemail}</td>
                </tr>
                <tr style={{backgroundColor: '#550F5D', color:'white'}}> 
                    <td > Pincode</td>
                    <td>{this.state.tableData.Cpincode}</td>
                </tr>
                <tr style={{backgroundColor: '#550F5D', color:'white'}}> 
                    <td > City</td>
                    <td>{this.state.tableData.Ccity}</td>
                </tr>
                
                <tr style={{backgroundColor: '#550F5D', color:'white'}}> 
                    <td > Phone</td>
                    <td>{this.state.tableData.Cphone}</td>
                </tr>
                <tr style={{backgroundColor: '#550F5D', color:'white'}}> 
                    <td > Nationality</td>
                    <td>{this.state.tableData.Cnation}</td>
                </tr>
                <tr style={{backgroundColor: '#550F5D', color:'white'}}> 
                    <td > Gender</td>
                    <td>{this.state.tableData.Cgen}</td>
                </tr>
                <tr style={{backgroundColor: '#550F5D', color:'white'}}> 
                    <td > Password</td>
                    <td>{this.state.tableData.Cpass}</td>
                </tr>
                    
                    

                   
                    

                   
                </tbody>
            </table>
                    
        </div>
    </div>
    

    
             
       

            </React.Fragment>
        )
    }
}


export default UserDB