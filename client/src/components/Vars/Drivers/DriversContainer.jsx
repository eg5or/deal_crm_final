import React from "react";
import {connect} from "react-redux";
import {driversAPI} from "../../../API/api";
import Drivers from "./Drivers";
import classes from "./DriversContainer.css"
import {setDataDriversTable, setNewDriverData} from "../../../redux/drivers-reducer";

class DriversContainer extends React.Component {
    componentDidMount() {
        driversAPI.getAllDrivers().then(data => {
            this.props.setDataDriversTable(data)
        })
    }

    addDriver = async (name, tel, auto) => {
        await this.props.setNewDriverData(name, tel, auto)
        try {
            const data = await driversAPI.addNewDriver(this.props.newDriverName, this.props.newDriverTel, this.props.newDriverAuto)
        } catch (e) {
            alert(e.response.data.message)
        }
        this.props.setNewDriverData('', '', '')
        driversAPI.getAllDrivers().then(data => {
            this.props.setDataDriversTable(data)
        })

    }

    updateDriver = async (id, name, tel, auto) => {
        try {
            await driversAPI.updateDriver(id, name, tel, auto)
        } catch (e) {
            alert(e.response.data.message)
        }
        driversAPI.getAllDrivers().then(data => {
            this.props.setDataDriversTable(data)
        })
    }

    deleteDriver = async (id) => {
        try {
            await driversAPI.deleteDriver(id)
        } catch (e) {
            alert(e.response.data.message)
        }
        driversAPI.getAllDrivers().then(data => {
            this.props.setDataDriversTable(data)
        })

    }

    render() {
        return <div className={classes.driversContainer}><Drivers
            driversTableData={this.props.driversTableData}
            setNewDriverData={this.props.setNewDriverData}
            addDriver={this.addDriver}
            updateDriver={this.updateDriver}
            deleteDriver={this.deleteDriver}
            newDriverName={this.props.newDriverName}
            newDriverTel={this.props.newDriverTel}
            newDriverAuto={this.props.newDriverAuto}
        /></div>

    }


}
const mapStateToProps = (state) => ({
    driversTableData: state.driversPage.driversTableData,
    newDriverName: state.driversPage.newDriverName,
    newDriverTel: state.driversPage.newDriverTel,
    newDriverAuto: state.driversPage.newDriverAuto
})

export default connect(mapStateToProps, {setDataDriversTable, setNewDriverData})(DriversContainer)