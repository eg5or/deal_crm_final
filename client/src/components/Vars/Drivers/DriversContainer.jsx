import React from "react";
import {connect} from "react-redux";
import Drivers from "./Drivers";
import classes from "./DriversContainer.css"
import {
    addDriver, deleteDriver,
    loadingDriversTableData,
    updateDriver
} from "../../../redux/drivers-reducer";

class DriversContainer extends React.Component {
    componentDidMount() {
        this.props.loadingDriversTableData()
    }

    render() {
        return <div className={classes.driversContainer}><Drivers
            driversTableData={this.props.driversTableData}
            addDriver={this.props.addDriver}
            updateDriver={this.props.updateDriver}
            deleteDriver={this.props.deleteDriver}
        /></div>

    }


}
const mapStateToProps = (state) => ({
    driversTableData: state.driversPage.driversTableData,
})

export default connect(mapStateToProps, {
    loadingDriversTableData,
    addDriver,
    updateDriver,
    deleteDriver
})(DriversContainer)