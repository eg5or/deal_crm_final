import React from "react";
import Clients from "./Clients";
import {connect} from "react-redux";
import {clientsAPI, employeesAPI} from "../../API/api";
import {setClientsDataTable, setManagers, setNewClientData} from "../../redux/clients-reducer";
import classes from './ClientsContainer.css'

class ClientsContainer extends React.Component {
    componentDidMount() {
        clientsAPI.getAllClients().then(data => {
            this.props.setClientsDataTable(data)
        })
        employeesAPI.getAllManagers().then(data => {
            this.props.setManagers(data)
        })
    }

    addClient = async (type, name, manager) => {
        await this.props.setNewClientData(type, name, manager)
        try {
            const data = await clientsAPI.addNewClient(this.props.newClientType, this.props.newClientName, this.props.newClientManager)
        } catch (e) {
            alert(e.response.data.message)
        }
        this.props.setNewClientData('', '', '')
        clientsAPI.getAllClients().then(data => {
            this.props.setClientsDataTable(data)
        })

    }

    updateClient = async (id, type, name, manager) => {
        try {
            await clientsAPI.updateClient(id, type, name, manager)
        } catch (e) {
            alert(e.response.data.message)
        }
        clientsAPI.getAllClients().then(data => {
            this.props.setClientsDataTable(data)
        })
    }

    deleteClient = async (id) => {
        try {
            await clientsAPI.deleteClient(id)
        } catch (e) {
            alert(e.response.data.message)
        }
        clientsAPI.getAllClients().then(data => {
            this.props.setClientsDataTable(data)
        })

    }

    render() {
        return <div className={classes.clientsContainer}><Clients
            tableClientsData={this.props.tableClientsData}
            managers={this.props.managers}
            setNewClientData={this.props.setNewClientData}
            addClient={this.addClient}
            updateClient={this.updateClient}
            deleteClient={this.deleteClient}
            newClientType={this.props.newClientType}
            newClientName={this.props.newClientName}
            newClientManager={this.props.newClientManager}
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

export default connect(mapStateToProps, {setClientsDataTable, setNewClientData, setManagers})(ClientsContainer)