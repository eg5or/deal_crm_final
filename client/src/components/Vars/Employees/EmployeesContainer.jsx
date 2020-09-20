import React from "react";
import {connect} from "react-redux";
import {employeesAPI} from "../../../API/api";
import Employees from "./Employees";
import classes from "./EmployeesContainer.css"
import {setDataEmployeesTable, setNewEmployeeData} from "../../../redux/employees-reducer";

class EmployeesContainer extends React.Component {
    componentDidMount() {
        employeesAPI.getAllEmployees().then(data => {
            this.props.setDataEmployeesTable(data)
        })
    }

    addEmployee = async (position, name, head, location, tel, intel, birthday) => {
        await this.props.setNewEmployeeData(position, name, head, location, tel, intel, birthday)
        try {
            const data = await employeesAPI.addNewEmployee(
                this.props.newEmployeePosition,
                this.props.newEmployeeName,
                this.props.newEmployeeHead,
                this.props.newEmployeeLocation,
                this.props.newEmployeeTel,
                this.props.newEmployeeIntel,
                this.props.newEmployeeBirthday
            )
        } catch (e) {
            alert(e.response.data.message)
        }
        this.props.setNewEmployeeData('', '', '', '', '', '', '')
        employeesAPI.getAllEmployees().then(data => {
            this.props.setDataEmployeesTable(data)
        })

    }

    updateEmployee = async (id, position, name, head, location, tel, intel, birthday) => {
        try {
            await employeesAPI.updateEmployee(id, position, name, head, location, tel, intel, birthday)
        } catch (e) {
            alert(e.response.data.message)
        }
        employeesAPI.getAllEmployees().then(data => {
            this.props.setDataEmployeesTable(data)
        })
    }

    deleteEmployee = async (id) => {
        try {
            await employeesAPI.deleteEmployee(id)
        } catch (e) {
            alert(e.response.data.message)
        }
        employeesAPI.getAllEmployees().then(data => {
            this.props.setDataEmployeesTable(data)
        })

    }

    render() {
        return <div className={classes.employeesContainer}><Employees
            employeesTableData={this.props.employeesTableData}
            setNewEmployeeData={this.props.setNewEmployeeData}
            addEmployee={this.addEmployee}
            updateEmployee={this.updateEmployee}
            deleteEmployee={this.deleteEmployee}
            newEmployeePosition={this.props.newEmployeePosition}
            newEmployeeName={this.props.newEmployeeName}
            newEmployeeHead={this.props.newEmployeeHead}
            newEmployeeLocation={this.props.newEmployeeLocation}
            newEmployeeTel={this.props.newEmployeeTel}
            newEmployeeIntel={this.props.newEmployeeIntel}
            newEmployeeBirthday={this.props.newEmployeeBirthday}
        /></div>

    }


}
const mapStateToProps = (state) => ({
    employeesTableData: state.employeesPage.employeesTableData,
    newEmployeePosition: state.employeesPage.newEmployeePosition,
    newEmployeeName: state.employeesPage.newEmployeeName,
    newEmployeeHead: state.employeesPage.newEmployeeHead,
    newEmployeeLocation: state.employeesPage.newEmployeeLocation,
    newEmployeeTel: state.employeesPage.newEmployeeTel,
    newEmployeeIntel: state.employeesPage.newEmployeeIntel,
    newEmployeeBirthday: state.employeesPage.newEmployeeBirthday
})

export default connect(mapStateToProps, {setDataEmployeesTable, setNewEmployeeData})(EmployeesContainer)