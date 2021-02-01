import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate'


export class Employee extends Component {

    constructor(props) {    
        super(props);    
        this.state = { 
        offset: 0,
        tableData: [],
        perPage: 7,
        currentPage: 0,
        Eid:'',
        Ename:'',
        Eservice:'',
        Eshift:'',
        Erole:'',
        Salary:'',
        
        formErrors: {}
    }
    this.updateUser = this.updateUser.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this);
}

handleFormValidation() {    
    const { Eid,Ename,Eservice,Eshift,Erole,Salary } = this.state;    
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
                    formErrors["empidErr"] = "Invalid EmpID! ID must be numeric.";    
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
                    formErrors["salaryErr"] = "Invalid salary! use only numeric characters .";    
                }  
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
        alert('Registerd Succesfully') 
        window.location.href = "/employee"   
        this.setState(this.initialState) 
        
    }
    
      
}
changeHandler = (e) =>{
    this.setState({[e.target.name] : e.target.value})
}

componentDidMount()
{
    this.receivedData()
}

receivedData() {
    

    axios
        .get('https://localhost:44384/api/Employee')
        .then(res => {

            var data = res.data;
            var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                orgtableData: res.data,
                tableData:slice
            })
        });
    
}

handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.receivedData()
    });

};

setUser(item1, item2,item3, item4, item5, item6){
    this.setState({
        posts:[],
        Eid : `${item1}`,
        Ename : `${item2}`,
        Eservice : `${item3}`,
        Eshift : `${item4}`,
        Erole : `${item5}`,
        Salary : `${item6}`,
    })
}

updateUser(){
    //e.preventDefault()

    if (this.handleFormValidation()) {  
    
    console.log(this.state.Ename)
    //var id = this.setState({CustID:`${items.CustID}`})
    axios.put(`https://localhost:44384/api/Employee/${this.state.Eid}`, this.state)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })

    }
  }

  deleteUser(Eid){
      axios.delete(`https://localhost:44384/api/Employee/${Eid}`)
      .then(response =>{
          console.log(response);
          console.log(response.data);
          const posts = this.state.tableData.filter(item=> item.Eid !== Eid);
          this.setState({posts});
      })
  }



    
    render() {
        const {  empidErr, empnameErr ,serviceErr, shiftErr, roleErr, salaryErr} = this.state.formErrors; 
        const {posts}= this.state;
        const { Eid,Ename,Eservice,Eshift,Erole,Salary } = this.state;  

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
                <Link class="nav-link" style={{color:"white"}} to="/fdisplay"> Food </Link>
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
                <Link class="nav-link" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" style={{color:"white"}} to="/Create" ><i class="fa fa-plus " aria-hidden="true"></i></Link>
                </li>
                <li class="nav-item active">
                <Link class="nav-link" style={{color:"white"}} to="/">Logout</Link>
                </li>
                </div>
                </ul>
                
                
            </div>
            </nav> 

            <div className="myDiv">
            <div class="row">
            <div class="col-sm" >
            <h4 style={{marginLeft:"5px"}}> Employee Details</h4>
            <table class="table mt-4 ml-2">
                <thead>
                    <tr style={{backgroundColor: '#550F5D', color:'white'}}>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Employee name</th>
                    <th scope="col">Employee Service</th>
                    <th scope="col">Employee Shift</th>
                    <th scope="col">Emloyee Role</th>
                    <th scope="col">Employee Salary</th>
                    <th></th>
                    <th></th>
                   
                    </tr>
                </thead>
                <tbody>
                {
                        this.state.tableData.map((item, i) =>
                        <tr key={i}>
                                <td>{item.Eid}</td>
                                <td>{item.Ename}</td>
                                <td>{item.Eservice}</td>
                                <td>{item.Eshift}</td>
                                <td>{item.Erole}</td>
                                <td>{item.Salary}</td>
                               
                                <td><button style={{backgroundColor: "rgb(255, 51, 0)",  color : "white",marginLeft:"25%", height:"30px", width: "65px", borderRadius: "5px" }} onClick={() => this.deleteUser(item.Eid)} >Delete</button></td>
                                <td><button style={{backgroundColor: "rgb(255, 51, 0)",  color : "white",marginLeft:"25%", height:"30px", width: "65px", borderRadius: "5px" }} onClick = {() => this.setUser(item.Eid, item.Ename,item.Eservice,item.Eshift, item.Erole,item.Salary)}>Update</button>
                                </td>
                        </tr>
                        )
                    }

                    
                    
                </tbody>
                </table>
                <div style={{marginLeft:"150px"}}>
               
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                </div>
               </div>
                <div class="col-sm"  >
                <div >
                        <form  className="form" onSubmit={this.updateUser} >
                            <h3>Update details</h3>
                        <div class="form-group">
                            
                            <input type="text" placeholder="Enter Employee ID" name="Eid"   class="form-control" id="date1"
                            value={Eid}    
                            onChange={this.changeHandler}    
                                
                            className={empidErr ? ' showError' : ''} />
                            {empidErr &&    
                              <div style={{ color: "red", paddingBottom: 10 }}>{empidErr}</div>    
                            } 
                        </div>

                        <div class="form-group">
                            
                            <input type="text"  placeholder="Enter Employee Name"  name="Ename"  class="form-control" 
                            value={Ename}    
                            onChange={this.changeHandler}    
                                
                            className={empnameErr ? ' showError' : ''}/>
                            {empnameErr &&    
                              <div style={{ color: "red", paddingBottom: 10 }}>{empnameErr}</div>    
                            } 
                        </div>

                        <div class="form-group">
                            
                            <input type="text"  placeholder="Enter Service" name="Eservice"  class="form-control" 
                            value={Eservice}    
                            onChange={this.changeHandler}    
                                
                            className={serviceErr ? ' showError' : ''}/>
                            {serviceErr &&    
                              <div style={{ color: "red", paddingBottom: 10 }}>{serviceErr}</div>    
                            } 
                        </div>

                        <div class="form-group">
                            
                            <input type="text"  placeholder="Shift" name="Eshift"  class="form-control" 
                            value={Eshift}    
                            onChange={this.changeHandler}    
                                
                            className={shiftErr ? ' showError' : ''}/>
                            {shiftErr &&    
                              <div style={{ color: "red", paddingBottom: 10 }}>{shiftErr}</div>    
                            } 
                        </div>

                        <div class="form-group">
                            
                            <input type="text"  placeholder="Role" name="Erole" class="form-control" 
                            value={Erole}    
                            onChange={this.changeHandler}    
                                
                            className={roleErr ? ' showError' : ''}/>
                            {roleErr &&    
                              <div style={{ color: "red", paddingBottom: 10 }}>{roleErr}</div>    
                            } 
                        </div>

                        <div class="form-group">
                            
                            <input type="text"  placeholder="Salary"  name="Salary" class="form-control" 
                            value={Salary}    
                            onChange={this.changeHandler}    
                                
                            className={salaryErr ? ' showError' : ''}/>
                            {salaryErr &&    
                              <div style={{ color: "red", paddingBottom: 10 }}>{salaryErr}</div>    
                            } 
                        </div>

                        <div class="modal-footer">
                        
                        <button type="submit"  class="btn btn-primary" style={{backgroundColor: "rgb(255, 51, 0)",  color : "white", float :"left"}}  >Update</button>
                        
                        </div>

                        </form> 
                        </div>
                        </div> 
                        </div>
                        </div>


            
            

               


            </React.Fragment>
            
        )
    }

}


export default Employee

