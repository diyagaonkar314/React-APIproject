import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

export class FoodDisplay extends Component {
    constructor(props){
        super(props)
        this.state = {
            offset: 0,
            tableData: [],
            perPage: 7,
            currentPage: 0,
            Fid : '',
            Fname : '',
            Fprice : '',
            formErrors: {}

        }

        this.updateUser = this.updateUser.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this);
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
                        formErrors["RtErr"] = "Invalid Food name is inavlid.";    
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
                                formErrors["RpErr"] = "Invalid Price.";    
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
            .get('https://localhost:44384/api/Food')
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


    setUser(item1,item2,item3){
        
        //console.log(items);
        this.setState({
            Fid:`${item1}`,
            Fname: `${item2}`,
            Fprice: `${item3}`,   
        }) 
       
      }

      changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
        
      }

      updateUser(){
        //e.preventDefault()
        if (this.handleFormValidation()) {  
        console.log(this.state.Fid)
        //var id = this.setState({CustID:`${items.CustID}`})
        axios.put(`https://localhost:44384/api/Food/${this.state.Fid}`, this.state)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }
      }


    render() {
        const{RtErr, RpErr} = this.state.formErrors;
        const {Fid, Fname, Fprice} = this.state
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
            <Link class="nav-link" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" style={{color:"white"}} to="/fCreate" ><i class="fa fa-plus " aria-hidden="true"></i></Link>
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
            <h4 style={{marginLeft:"5px"}}> Food Details</h4>
            <table class="table mt-4 ml-2">
                <tbody>
                    <tr style={{backgroundColor: '#550F5D', color:'white'}}>
                    <th scope="col">Food ID</th>
                    <th scope="col">Food Name</th>
                    <th scope="col">Food Price</th>
                    <th></th>
                    
                    </tr>

                    {
                        this.state.tableData.map((item, i) =>
                        <tr key={i}>
                                <td>{item.Fid}</td>
                                <td>{item.Fname}</td>
                                <td>{item.Fprice}</td>
                               
                                <td><button style={{backgroundColor: "rgb(255, 51, 0)",  color : "white",marginLeft:"25%", height:"30px", width: "100px", borderRadius: "5px" }} onClick={() => this.setUser(item.Fid, item.Fname, item.Fprice)} >Update</button>
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
                            
                            <input type="text" placeholder="Enter Food Id" name="Fid"   class="form-control" id="date1"
                            value={Fid}    
                            onChange={this.changeHandler}  />
                            
                        </div>

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
                        <div class="modal-footer">
                        
                        <button type="submit"  class="btn btn-primary" style={{backgroundColor: "rgb(255, 51, 0)",  color : "white", float :"left"}}  >Update</button>
                        
                        </div>
                </form>
                </div>
                

            </div>
            </div>
            </>
        )
    }
}

export default FoodDisplay
