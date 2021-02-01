import React from "react";
import Registration from "./Registration";
import firebaseDb from "./firebase";

const Registration_crud = () => {

    const add = obj => {
        firebaseDb.child('register').push(
            obj,
            err =>{
                if(err)
                console.log(err);
            }
        )
    }

    return(
        <React.Fragment>
        
        <Registration add={add}/>
        </React.Fragment>
    )
}

export default Registration_crud;