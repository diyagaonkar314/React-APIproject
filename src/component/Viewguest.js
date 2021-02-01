import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

export class Viewguest extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            offset: 0,
            tableData: [],
            perPage: 7,
            currentPage: 0
             
          
        }
        this.handlePageClick = this.handlePageClick.bind(this);

    }

    componentDidMount()
    {
       this.receivedData()
    }

    receivedData() {
        axios
            .get('https://localhost:44384/api/Customer')
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


    
    render() {
        const {posts} = this.state
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
                    <Link class="nav-link" style={{color:"white"}} to="/room"> Rooms </Link>
                    </li>
                    <li class="nav-item active">
                    <Link class="nav-link" style={{color:"white"}} to="/employee"> Emloyee </Link>
                    </li>
                    <li class="nav-item dropdown">
                    <Link class="nav-link dropdown-toggle" style={{color: "white", backgroundColor:"#550F5D"}}  to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Services
                        </Link>
                        <div class="dropdown-menu"  style={{color: "white", backgroundColor:"#550F5D"}} aria-labelledby="navbarDropdown">
                        <Link class="dropdown-item" style={{color:"white"}} to="/viewbooking">View Bookings</Link>
                        <div class="dropdown-divider"></div>
                        <Link class="dropdown-item" style={{color:"white"}} to="/viewguest">View Customer List</Link>
                        <div class="dropdown-divider"></div>
                         <Link class="dropdown-item" style={{color:"white"}} to="/viewhotel">View Food Booking</Link>
                        
                        </div>
                    </li>
    
                    </ul>
                    <ul  class="navbar-nav mr-auto" style={{marginLeft:"70%", textDecorationColor: "black"}}>
                    <div class="form-inline my-2 my-lg-0">
                    
                    <li class="nav-item active">
                    <Link class="nav-link" style={{color:"white"}} to="/">Logout</Link>
                    </li>
                    </div>
                    </ul>
                    
                    
                </div>
                </nav> 
                <h1>Customer Details</h1>
                <table class="table mt-4 ml-2">
                <tbody>
                    <tr style={{backgroundColor: '#550F5D', color:'white'}}> 
                    <th scope="col"> ID</th>
                    <th scope="col"> Name</th>
                    <th scope="col"> Email</th>
                    <th scope="col"> Phone</th>
                    <th scope="col"> City</th>
                    <th scope="col"> DOB</th>
                    <th scope="col">Pincode</th>
                    <th scope="col">Nationality</th>
                    <th scope="col"> Gender</th>

                    </tr>

                    {
                        this.state.tableData.map((item, i) =>
                        <tr key={i}>
                                <td>{item.Cid}</td>
                                <td>{item.Cname}</td>
                                <td>{item.Cemail}</td>
                                <td>{item.Cphone}</td>
                                <td>{item.Ccity}</td>
                                <td>{item.Cdob}</td>
                                <td>{item.Cpincode}</td>
                                <td>{item.Cnation}</td>
                                <td>{item.Cgen}</td>
                                






                               
                                
                        </tr>
                        )
                    }
                    
                </tbody>
            </table>
                
            <div style={{marginLeft:"600px"}}>
               
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
                </React.Fragment>
        )
    }
}

export default Viewguest
