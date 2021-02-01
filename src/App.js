//import logo from './logo.svg';
import './App.css';
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './component/Home';
import BookRoom from './component/BookRoom'
import Bill from './component/Bill';
import Confirmation from './component/Confirmation';
import Food from './component/Food';
import Foodbill from './component/Foodbill';
import Registration from './component/Registration';
import Login from './component/Login';
import Admin from './component/Admin';
import Room from './component/Room';
import Employee from './component/Employee';
import Viewbooking from './component/Viewbooking';
import Viewguest from './component/Viewguest';
import Viewhotel from './component/Viewhotel';
import UserDB from './component/UserDB';
import fetchData from './component/fetchData';
import EmployeeCreate from './component/EmployeeCreate';
import RoomCreate from './component/RoomCreate';
import FoodDisplay from './component/FoodDisplay';
import FoodCreate from './component/FoodCreate';

// import Registration_crud from './component/Registration_crud'


function App() {
  return (
    <React.Fragment>
    <Router>
      <Switch>
      <Route exact path="/"component ={Home}/>
      <Route path="/book"component ={BookRoom}/>
      <Route path="/bill"component ={Bill}/>
      <Route path="/confirm" component={Confirmation}/> 
     <Route path="/food" component={Food}/> 
     <Route path="/foodbill" component={Foodbill}/>
     <Route path="/registration" component={Registration}/>
     <Route path="/login" component={Login}/>
     <Route path="/admin" component={Admin}/>
     <Route path="/room" component={Room}></Route>
     <Route path="/employee" component={Employee}></Route>
     <Route path="/viewbooking" component={Viewbooking}></Route>
     <Route path="/viewguest" component={Viewguest}></Route>
     <Route path="/viewhotel" component={Viewhotel}></Route>
     <Route path="/userD" component={UserDB}></Route>
     <Route path="/fetchData" component={fetchData}></Route>
     {/* <Route path="/registration" component={Registration_crud}></Route> */}
     <Route path="/create" component={EmployeeCreate}></Route>
     <Route path="/rCreate" component={RoomCreate}></Route>
     <Route path="/fDisplay" component={FoodDisplay}></Route>
     <Route path="/fCreate" component={FoodCreate}></Route>

      </Switch>
      </Router>

      
    </React.Fragment>
  );
}

export default App;
