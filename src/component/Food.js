import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

export class Food extends Component {

  constructor(props){
    super(props)
    this.state = {
        offset: 0,
        tableData: [],
        perPage: 7,
        currentPage: 0,
        Cid : localStorage.getItem("user"),
        Fid : '',
        Quantity : '',
        Fprice : ''
       

    }

    this.handlePageClick = this.handlePageClick.bind(this); 
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

  submitHandler = e => {
    e.preventDefault()

        
           
        this.setState(this.initialState) 
        console.log(this.state);

        axios.post('https://localhost:44384/api/FBook', this.state)
        .then(response => {
            console.log(response)

        })
        .catch(error => {
            console.log(error)
        })

       window.location.href = "/foodbill"
}

handleLogout = () => {
    
    localStorage.clear();

  };


    render() {
      const {Fid, Fname, Fprice, Cid, Quantity} = this.state
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
                <Link class="nav-link dropdown-toggle" style={{color:"white"}} to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Services
                    </Link>
                    <div class="dropdown-menu" style={{color: "white", backgroundColor:"#550F5D"}} aria-labelledby="navbarDropdown">
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
                <Link class="nav-link" style={{color:"white"}} to="/">Logout</Link>
                </li>
                </div>
                </ul>
             
            </div>
            </nav>

            <div className="myDiv">
            <div class="row">
            <div class="col col-6" >
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
                               
                                <td><button style={{backgroundColor: "rgb(255, 51, 0)",  color : "white",marginLeft:"25%", height:"30px", width: "100px", borderRadius: "5px" }}  onClick={() => this.setUser(item.Fid, item.Fname, item.Fprice)} >Order</button>
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
                    <h3>Order your Food</h3>
                        
                    <div class="form-group">
                            
                            <input type="text" placeholder="Enter Food Id" name="Cid"   class="form-control" id="date1"
                            value={Cid}    
                            onChange={this.changeHandler}  readOnly/>
                            
                        </div>

                        <div class="form-group">
                            
                            <input type="text" placeholder="Enter Food Id" name="Fid"   class="form-control" id="date1"
                            value={Fid}    
                            onChange={this.changeHandler} readOnly/>
                            
                        </div>

                        <div class="form-group">
                            
                            <input type="text" placeholder="Enter Room status" name="Fname"   class="form-control" id="date1"
                            value={Fname}    
                            onChange={this.changeHandler} readOnly/>
                            
                        </div>

                        <div class="form-group">
                            
                            <input type="text" placeholder="Enter Room price" name="Fprice"   class="form-control" id="date1"
                            value={Fprice}    
                            onChange={this.changeHandler}  readOnly/>
   


                            
                        </div>

                        <div class="form-group">
                            
                            <input type="text" placeholder="Enter Quantity" name="Quantity"   class="form-control" id="date1"
                            value={Quantity}    
                            onChange={this.changeHandler}  required/>
   


                            
                        </div>

                        <div class="modal-footer">
                        
                        <button type="submit"  class="btn btn-primary" style={{backgroundColor: "rgb(255, 51, 0)",  color : "white", float :"left"}}  >Order Now</button>
                        
                        </div>
                </form>
                </div>
                <div className="col col-2">
                <img className="image" style={{marginLeft:"50px"}} height="600px" src={process.env.PUBLIC_URL + '/food.jpg'} alt="manali"/>

                </div>

            </div>
            </div>           
       </React.Fragment>
        )
    }
}

export default Food
