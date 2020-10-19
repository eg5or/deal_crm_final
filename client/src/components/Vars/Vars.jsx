import React from 'react';
import classes from './Vars.module.css'
import {Route} from "react-router-dom";
import DriversContainer from "./Drivers/DriversContainer";
import ForwardersContainer from "./Forwarders/ForwardersContainer";
import EmployeesContainer from "./Employees/EmployeesContainer";
import CompaniesContainer from "./Companies/CompaniesContainer";

const Vars = (props) => {
    return (
        <div className={classes.varsContainer}>
            <Route path='/vars/drivers' render={() => <DriversContainer />}/>
            <Route path='/vars/forwarders' render={() => <ForwardersContainer />}/>
            <Route path='/vars/employees' render={() => <EmployeesContainer />}/>
            <Route path='/vars/companies' render={() => <CompaniesContainer />}/>
        </div>
    )
}

export default Vars;