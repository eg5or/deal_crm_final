import React, {useEffect} from "react";
import {connect} from "react-redux";
import Employees from "./Employees";
import classes from "./EmployeesContainer.module.css"
import {deleteEmployee, getEmployees, updateEmployee} from "../../../redux/employees-reducer";

class EmployeesContainer extends React.Component {
    componentDidMount() {
        this.props.getEmployees()
    }

    render() {
        return <div className={classes.employeesContainer}><Employees
            employeesTableData={this.props.employeesTableData}
            updateEmployee={this.props.updateEmployee}
            deleteEmployee={this.props.deleteEmployee}
            getEmployees={getEmployees}
        /></div>

    }
}

const mapStateToProps = (state) => ({
    employeesTableData: state.employeesPage.employeesTableData,
})

export default connect(mapStateToProps, {getEmployees, updateEmployee, deleteEmployee})(EmployeesContainer)