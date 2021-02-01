import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './table.css'
import ReactPaginate from 'react-paginate'

export class Room extends Component {
    
        constructor(props) {
            super(props);
            this.state = { 
                offset: 0,
                tableData: [],
                perPage: 7,
                currentPage: 0, 
                posts: [],
                Rid: '',
                Rtype : '',
                Rstatus:'',
                Rprice: '',
                formErrors: {}

            }
            this.updateUser = this.updateUser.bind(this)
            this.handlePageClick = this.handlePageClick.bind(this);
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
                                formErrors["RsErr"] = "Invalid status!use only alphabetic characters.";    
                            }  
                    }
    
                    if(!Rprice){
            
                        formIsValid = false;
                        formErrors["RpErr"] = "Price is required";
                        
                    }
                    else
                        {
                                var pr = /^[0-9]{4,6}$/;    
                                if (!pr.test(Rprice)) {    
                                    formIsValid = false;    
                                    formErrors["RpErr"] = "Invalid Price! use only numeric characters.";    
                                }  
                        }
    
    
        this.setState({ formErrors: formErrors });   
        console.log(formIsValid) 
        return formIsValid;
        }
        

        componentDidMount()
    {
        this.receivedData()
    }

    receivedData() {
        axios
            .get('https://localhost:44384/api/Room')
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


    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    setUser(item1,item2,item3,item4){
        this.setState({
            posts:[],
            Rid : `${item1}`,
            Rtype : `${item2}`,
            Rstatus : `${item3}`,
            Rprice:`${item4}`
           
        })
    }


    updateUser(){
        //e.preventDefault()
        if (this.handleFormValidation()) {  
        console.log(this.state.Rid)
        //var id = this.setState({CustID:`${items.CustID}`})
        axios.put(`https://localhost:44384/api/Room/${this.state.Rid}`, this.state)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }
      }

    render() {
        const{RtErr, RsErr, RpErr} = this.state.formErrors;
        const {posts} = this.state
        const {Rid, Rtype, Rstatus,Rprice } = this.state
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
                <li class="nav-item dropdown">
                <Link class="nav-link dropdown-toggle" style={{color:"white"}} to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Services
                    </Link>
                    <div class="dropdown-menu" style={{color: "white", backgroundColor:"#550F5D"}}  aria-labelledby="navbarDropdown">
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
            <div className="myDiv">
            <div class="row">
            <div class="col-sm" >
            <h4 style={{marginLeft:"5px"}}> Room Details</h4>
            <table class="table mt-4 ml-2">
                <thead>
                    <tr style={{backgroundColor: '#550F5D', color:'white'}}>
                    <th scope="col">Room IDe</th>
                    <th scope="col">Room Type</th>
                    <th scope="col">Room Status</th>
                    <th scope="col">Room Price</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {
                        this.state.tableData.map((item, i) =>
                        <tr key={i}>
                                <td>{item.Rid}</td>
                                <td>{item.Rtype}</td>
                                <td>{item.Rstatus}</td>
                                <td>{item.Rprice}</td>
                               
                                <td><button style={{backgroundColor: "rgb(255, 51, 0)",  color : "white",marginLeft:"25%", height:"30px", width: "100px", borderRadius: "5px" }}  onClick = {() => this.setUser(item.Rid, item.Rtype,item.Rstatus,item.Rprice)} >Update</button>
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
                <div class="col-sm" >
                <form  className="form" onSubmit={this.updateUser} >
                    <h3>Update details</h3>
                        <div class="form-group">
                            
                            <input type="text" placeholder="Enter Room ID" name="Rid"   class="form-control" id="date1"
                            value={Rid}    
                            onChange={this.changeHandler} readOnly />
                            
                        </div>

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
                        <div class="modal-footer">
                        
                        <button type="submit"  class="btn btn-primary" style={{backgroundColor: "rgb(255, 51, 0)",  color : "white", float :"left"}}  >Update</button>
                        
                        </div>
                </form>
                </div>
                </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Room
