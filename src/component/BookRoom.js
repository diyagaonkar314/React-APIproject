import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './table.css'
import ReactPaginate from 'react-paginate'
import './BookRoom.css'



class BookRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            offset: 0,
            tableData: [],
            perPage: 7,
            currentPage: 0,
            Rid: '',
            Rtype : '',
            Rprice: '',
            Cid: localStorage.getItem("user"),
            Dfrom: '',
            Tfrom:'',
            Pcount:''

        }
       this.handlePageClick = this.handlePageClick.bind(this);
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

    setUser(item1,item2,item3,item4){
        this.setState({
            posts:[],
            Rid : `${item1}`,
            Rtype : `${item2}`,
            Rstatus : `${item3}`,
            Rprice:`${item4}`

           
        })
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }  


    submitHandler = e => {
        e.preventDefault()
    
       
            console.log(this.state);
    
            axios.post('https://localhost:44384/api/RBook', this.state)
            .then(response => {
                console.log(response)
    
            })
            .catch(error => {
                console.log(error)
            })
            
    
            //alert('Registerd Succesfully') 
            window.location.href = "/confirm"
        }

        handleLogout = () => {
    
            localStorage.clear();
        
          };

    render(){
        
        const {Rid, Rtype, Rprice,Dfrom,Cid, Tfrom, Pcount} = this.state
    return (
        <React.Fragment>

        <nav class="navbar navbar-expand-lg navbar-light ">
            <Link class="navbar-brand" style={{color:"white"}} to="">MyHotel</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                
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
            <div class ="row mt-1">

        

        <div  class="col-sm-4">
            <div className="card text-white  "  >
                <div className="card-header " style={{backgroundColor:"rgb(255,117,24)"}}> <label className="myName"><strong>Deluxe Room (2+1)</strong></label>
                </div>
                    <div className="card-body">
                        <img className="image" width="350px" height="210px" src={process.env.PUBLIC_URL + '/Deluxe.jpg'} alt="manali"/>
                        <br></br>
                        
                    </div>
                </div>
            
        </div>

        <div class="col-sm-4" >
            <div className="card text-white  " >
                <div className="card-header " style={{backgroundColor:"rgb(255,117,24)"}} ><label className="myName"><strong>Premium Room (2+2)</strong></label></div>
                    <div className="card-body">
                        <img className="image2" width="350px" src={process.env.PUBLIC_URL + '/Classic.jpg'} alt="Kerla"/>
                        <br></br>
                        
                    </div>
                    
                </div>
            
        </div>
    

        <div class="col-sm-4">
            <div className="card text-white "  >
                <div className="card-header " style={{backgroundColor:"rgb(255,117,24)"}} ><label className="myName"><strong>Classic Room (2)</strong></label></div>
                    <div className="card-body">
                        <img width="350px" src={process.env.PUBLIC_URL + '/Premium.jpg'} alt="goa"/>
                        <br></br>
                        
                    </div>
                </div>
            
        </div>

        </div>

            <hr/>
            
            <div className="myDiv">
            <div class="row">
            <div class="col-7" >
            
            <h4 style={{marginLeft:"5px"}}> Room Details</h4>
            <table class="table mt-4 ml-2" >
                <thead>
                    <tr style={{backgroundColor: '#550F5D', color:'white'}}>
                    <th scope="col" >Room ID</th>
                    <th scope="col">Room Type</th>
                    <th scope="col">Room Status</th>
                    <th scope="col">Room Price</th>
                    <th scope="col"></th>
                    
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
                               
                               
                                <td><button  style={{backgroundColor: "rgb(255, 51, 0)",  color : "white",marginLeft:"25%", height:"30px", width: "100px", borderRadius: "5px" }}  onClick = {() => this.setUser(item.Rid, item.Rtype,item.Rstatus,item.Rprice)} >Book Now</button>
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
                <div class="col col-3" >
                <form  className="form" onSubmit={this.submitHandler} >
                    <h3>Book Your Room</h3>

                    <div class="form-group">
                            
                            <input type="text" placeholder="Enter Customer ID" name="Cid"   class="form-control" id="date1"
                            value={Cid}    
                            onChange={this.changeHandler} readOnly />
                            
                        </div>


                        <div class="form-group">
                            
                            <input type="text" placeholder="Enter Room ID" name="Rid"   class="form-control" id="date1"
                            value={Rid}    
                            onChange={this.changeHandler} readOnly  required/>
                            
                        </div>



                        <div class="form-group">
                            
                            <input type="text" placeholder="Enter Room Type" name="Rtype"   class="form-control" id="date1"
                            value={Rtype}    
                            onChange={this.changeHandler} readOnly required />
                            
                        </div>

                        

                        <div class="form-group">
                            
                            <input type="text" placeholder="Enter Room price" name="Rprice"   class="form-control" id="date1"
                            value={Rprice}    
                            onChange={this.changeHandler}  readOnly required/>
   
                        </div>

                        
                        <div class="form-group">
                            
                            <input type="date" placeholder="Enter Room price" name="Dfrom"   class="form-control" id="myDate"
                            value={Dfrom}    
                            onChange={this.changeHandler}  required/>
   
                        </div>
                        
                        <div class="form-group">
                            
                            <input type="date" placeholder="Enter Room price" name="Tfrom"   class="form-control" id="date1"
                            value={Tfrom}    
                            onChange={this.changeHandler}  required/>
   
                        </div>

                        
                        <div class="form-group">
                            
                            <input type="text" placeholder="Enter number of person" name="Pcount"   class="form-control" id="date1"
                            value={Pcount}    
                            onChange={this.changeHandler} required />
   
                        </div>

                        <div class="modal-footer">
                        
                        <button type="submit"  class="btn btn-primary" style={{backgroundColor: "rgb(255, 51, 0)",  color : "white", float :"left"}}  >Process</button>
                        
                        </div>
                </form>
                </div>

                <div className=" col col-2 Box">

                    
                    <p style={{color:" #550F5D", fontWeight:"bold"}}>
                        Hurry up now!!
                        <br/>
                        Make your vacation memomrable one
                        Get the best hospitality for your family
                        <br/>
                        <br/>
                        Bookings are open
                        Get the best room...!
                    </p>
                    <br/>
                    <br/>
                    <p>
                        For any querries <br/><strong>
                            contact us : 888-000-8282
                            <br/>
                            email : myhotel@gmial.com
                            </strong>
                            <address>
                                M.G. Road,Banglore-581001
                            </address>

                    </p>
                    
                </div>
                </div>
                </div>
            



            
        </React.Fragment>
    )
}
}


export default BookRoom
