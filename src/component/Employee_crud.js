// import React, { useState, useEffect } from 'react';
// import Employee from './Employee';
// import firebaseDb from './firebase';

// const Employee_crud = () =>{
//     var [employeeObjects , setContactObjects] = useState(0)
//     var [currentId, setCurrentId] = useState('')


//     useEffect(() =>{

//         firebaseDb.child('employee').on('value', snapshot => {
//             if(snapshot.val() != null)
//             setContactObjects({
//                 ...snapshot.val()
//             })
//             else
//             setContactObjects({})
//         })

//     },[])

//     const addOrEdit = obj => {

//         if(currentId==='')
//         firebaseDb.child('employee').push(
//             obj,
//             err =>{
//                 if(err){
//                     console.log(err)
//                 }
//                 else
//                 setCurrentId('')
//             }
//         )
//         else
//         firebaseDb.child(`employee/${currentId}`).set(
//             obj,
//             err =>{
//                 if(err){
//                     console.log(err)
//                 }
//                 else
//                 setCurrentId('')
//             }
//         )
         
//     }

//     const onDelete = key => {
//         if(window.confirm('Are you sure to delete this record?')){
//             firebaseDb.child(`employee/${key}`).remove(
                
//                 err =>{
//                     if(err){
//                         console.log(err)
//                     }
//                     else
//                     setCurrentId('')
//                 }
//             )

//         }
//     }

//     return ( 
//         <React.Fragment>
//             <Employee {...({addOrEdit, currentId, employeeObjects})} />
//             <div className="row">
                
//                 <div className="col-md-7">
    
//                     <table className="table table-borderless table-stripped">
//                        <thead className="thead-light">
//                         <tr>
//                         <th>EmpID</th>
//                         <th>Emp Name</th>
//                         <th>Service</th>
//                         <th>Shift</th>
//                         <th>Role</th>
//                         <th>Salary</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                                 {
//                                     Object.keys(employeeObjects).map(id => {
//                                         return <tr key={id}>
                                            
//                                             <td>{employeeObjects[id].empID}</td>
//                                             <td>{employeeObjects[id].empName}</td>
//                                             <td>{employeeObjects[id].service}</td>
//                                             <td>{employeeObjects[id].shift}</td>
//                                             <td>{employeeObjects[id].role}</td>
//                                             <td>{employeeObjects[id].salary}</td>



//                                             <td>
//                                                 <a className="btn text-primary" onClick={ () => {setCurrentId(id)}}>
//                                                 <i className="fas fa-pencil-alt"></i>
//                                                 </a>
//                                                 <a className="btn text-danger" onClick={ () => onDelete(id)}>
//                                                 <i className="far fa-trash-alt"></i>
//                                                 </a>
                                                
//                                             </td>
//                                         </tr>
//                                     })
//                                 }
//                         </tbody>
//                     </table>
    
//                 </div>
//             </div>
//         </React.Fragment>
//     )
// }

// export default Employee_crud;