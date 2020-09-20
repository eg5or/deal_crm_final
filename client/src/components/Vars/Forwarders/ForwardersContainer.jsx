import React from "react";
import {connect} from "react-redux";
import {forwardersAPI} from "../../../API/api";
import Forwarders from "./Forwarders";
import classes from "./ForwardersContainer.css"
import {setDataForwardersTable, setNewForwarderData} from "../../../redux/forwarders-reducer";

class ForwardersContainer extends React.Component {
    componentDidMount() {
        forwardersAPI.getAllForwarders().then(data => {
            this.props.setDataForwardersTable(data)
        })
    }

    addForwarder = async (name, tel, auto) => {
        await this.props.setNewForwarderData(name, tel)
        try {
            const data = await forwardersAPI.addNewForwarder(this.props.newForwarderName, this.props.newForwarderTel)
        } catch (e) {
            alert(e.response.data.message)
        }
        this.props.setNewForwarderData('', '', '')
        forwardersAPI.getAllForwarders().then(data => {
            this.props.setDataForwardersTable(data)
        })

    }

    updateForwarder = async (id, name, tel, auto) => {
        try {
            await forwardersAPI.updateForwarder(id, name, tel)
        } catch (e) {
            alert(e.response.data.message)
        }
        forwardersAPI.getAllForwarders().then(data => {
            this.props.setDataForwardersTable(data)
        })
    }

    deleteForwarder = async (id) => {
        try {
            await forwardersAPI.deleteForwarder(id)
        } catch (e) {
            alert(e.response.data.message)
        }
        forwardersAPI.getAllForwarders().then(data => {
            this.props.setDataForwardersTable(data)
        })

    }

    render() {
        return <div className={classes.forwardersContainer}><Forwarders
            forwardersTableData={this.props.forwardersTableData}
            setNewForwarderData={this.props.setNewForwarderData}
            addForwarder={this.addForwarder}
            updateForwarder={this.updateForwarder}
            deleteForwarder={this.deleteForwarder}
            newForwarderName={this.props.newForwarderName}
            newForwarderTel={this.props.newForwarderTel}
        /></div>

    }


}
const mapStateToProps = (state) => ({
    forwardersTableData: state.forwardersPage.forwardersTableData,
    newForwarderName: state.forwardersPage.newForwarderName,
    newForwarderTel: state.forwardersPage.newForwarderTel,
})

export default connect(mapStateToProps, {setDataForwardersTable, setNewForwarderData})(ForwardersContainer)