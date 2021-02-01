import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";
import ReactPaginate from 'react-paginate'

export class Viewbooking extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            offset: 0,
            tableData: [],
            bookData:[],
            perPage: 7,
            currentPage: 0,
            Dfrom: ''
            

        }
        this.handlePageClick = this.handlePageClick.bind(this);

    }

    componentDidMount()
    {
       this.receivedData()
       
    }


    receivedData() {
        axios
            .get('https://localhost:44384/api/RBook')
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

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    } 

    submitHandler = (e) => {
        e.preventDefault()
        console.log("Entered")
        axios
        .get(`https://localhost:44384/api/RBook?Dfrom=${this.state.Dfrom}T00:00:00`)
        .then(res => {
            console.log(res.data);
            this.setState({
               
                bookData:res.data
                
                
               
            })
        })
        .catch(error => {
            console.log(error)
        })
        
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
        const{Dfrom} = this.state
        
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
                <Link class="nav-link dropdown-toggle" style={{color: "white"}}  to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Services
                    </Link>
                    <div class="dropdown-menu" style={{color: "white", backgroundColor:"#550F5D"}}aria-labelledby="navbarDropdown">
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

            <div className="row">
            <h1>Booking Details</h1>
                <div className="col">
                <table class="table mt-4 ml-2">
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
                    
                    </tr>

                    {
                        this.state.tableData.map((item, i) =>
                        <tr key={i}>
                                <td>{item.RBookid}</td>
                                <td>{item.Cid}</td>
                                <td>{item.Rid}</td>
                                <td>{item.Dfrom}</td>
                                <td>{item.Tfrom}</td>
                                <td>{item.Rtype}</td>
                                <td>{item.Rprice}</td>
                                <td>{item.Pcount}</td>
                                   
                        </tr>
                        )
                    }
                    
                </tbody>
            </table>
            <div style={{marginLeft:"500px"}}>
               
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
                <div className="col">
                    <form onSubmit={this.submitHandler}>
                    <table class="table mt-4 ml-2">
                            <tbody>
                                <tr style={{backgroundColor: '#550F5D', color:'white'}}>
                                <th scope="col"> Bookibg ID</th>
                                <th scope="col"> Coustmer ID</th>
                                <th scope="col"> Room ID</th>
                                {/* <th scope="col"> From Date</th>
                                <th scope="col"> To Date</th> */}
                                <th scope="col"> Room Type</th>
                                <th scope="col">Price</th>
                                <th scope="col">No. of Person</th>
                                
                                </tr>

                                {
                                    this.state.bookData.map((item, i) =>
                                    <tr key={i}>
                                            <td>{item.RBookid}</td>
                                            <td>{item.Cid}</td>
                                            <td>{item.Rid}</td>
                                            {/* <td>{item.Dfrom}</td>
                                            <td>{item.Tfrom}</td> */}
                                            <td>{item.Rtype}</td>
                                            <td>{item.Rprice}</td>
                                            <td>{item.Pcount}</td>
                                            
                                    </tr>
                                    )
                                }
                                
                            </tbody>
                        </table>

                       
                            
                            <input  type="Date" name="Dfrom" value={Dfrom} onChange={this.changeHandler}/>
                            <button style={{backgroundColor: "rgb(255, 51, 0)",  color : "white", height:"30px", width: "65px", borderRadius: "5px" }} type="submit" >Enter</button>
                            
                        
                    </form>
                </div>

            </div>
        </React.Fragment>
        )
    }
}

export default Viewbooking
