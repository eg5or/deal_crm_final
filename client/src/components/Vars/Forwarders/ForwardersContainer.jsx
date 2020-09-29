import React from "react";
import {connect} from "react-redux";
import Forwarders from "./Forwarders";
import classes from "./ForwardersContainer.css"
import {
    addForwarder,
    deleteForwarder, loadingForwarderTableData,
    updateForwarder
} from "../../../redux/forwarders-reducer";

class ForwardersContainer extends React.Component {
    componentDidMount() {
        this.props.loadingForwarderTableData()
    }

    render() {
        return <div className={classes.forwardersContainer}><Forwarders
            forwardersTableData={this.props.forwardersTableData}
            addForwarder={this.props.addForwarder}
            updateForwarder={this.props.updateForwarder}
            deleteForwarder={this.props.deleteForwarder}
        /></div>
    }
}

const mapStateToProps = (state) => ({
    forwardersTableData: state.forwardersPage.forwardersTableData,
})

export default connect(mapStateToProps, {
    loadingForwarderTableData,
    addForwarder,
    updateForwarder,
    deleteForwarder
})(ForwardersContainer)