import React from "react";
import Clients from "./Clients";
import {connect} from "react-redux";
import {
    addClient, deleteClient,
    loadingClientsTableData,
    updateClient
} from "../../redux/clients-reducer";
import classes from './ClientsContainer.css'

class ClientsContainer extends React.Component {
    componentDidMount() {
        this.props.loadingClientsTableData()
    }

    render() {
        return <div className={classes.clientsContainer}><Clients
            tableClientsData={this.props.tableClientsData}
            managers={this.props.managers}
            addClient={this.props.addClient}
            updateClient={this.props.updateClient}
            deleteClient={this.props.deleteClient}
            /></div>
    }
}

const mapStateToProps = (state) => ({
    tableClientsData: state.clientsPage.tableClientsData,
    managers: state.clientsPage.managers,
    newClientType: state.clientsPage.newClientType,
    newClientName: state.clientsPage.newClientName,
    newClientManager: state.clientsPage.newClientManager
})

export default connect(mapStateToProps, {
    loadingClientsTableData,
    addClient,
    updateClient,
    deleteClient
})(ClientsContainer)