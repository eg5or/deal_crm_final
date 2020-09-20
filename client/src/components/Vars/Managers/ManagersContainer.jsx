import React from "react";
import {connect} from "react-redux";
import {managersAPI} from "../../../API/api";
import Managers from "./Managers";
import classes from "./ManagersContainer.css"
import {setDataManagersTable, setNewManagerData} from "../../../redux/managers-reducer";

class ManagersContainer extends React.Component {
    componentDidMount() {
        managersAPI.getAllManagers().then(data => {
            this.props.setDataManagersTable(data)
        })
    }

    addManager = async (name, head, tel) => {
        await this.props.setNewManagerData(name, head, tel)
        try {
            const data = await managersAPI.addNewManager(this.props.newManagerName, this.props.newManagerHead, this.props.newManagerTel)
        } catch (e) {
            alert(e.response.data.message)
        }
        this.props.setNewManagerData('', '', '')
        managersAPI.getAllManagers().then(data => {
            this.props.setDataManagersTable(data)
        })

    }

    updateManager = async (id, name, head, tel) => {
        try {
            await managersAPI.updateManager(id, name, head, tel)
        } catch (e) {
            alert(e.response.data.message)
        }
        managersAPI.getAllManagers().then(data => {
            this.props.setDataManagersTable(data)
        })
    }

    deleteManager = async (id) => {
        try {
            await managersAPI.deleteManager(id)
        } catch (e) {
            alert(e.response.data.message)
        }
        managersAPI.getAllManagers().then(data => {
            this.props.setDataManagersTable(data)
        })

    }

    render() {
        return <div className={classes.managersContainer}><Managers
            managersTableData={this.props.managersTableData}
            setNewManagerData={this.props.setNewManagerData}
            addManager={this.addManager}
            updateManager={this.updateManager}
            deleteManager={this.deleteManager}
            newManagerName={this.props.newManagerName}
            newManagerHead={this.props.newManagerHead}
            newManagerTel={this.props.newManagerTel}
        /></div>

    }


}
const mapStateToProps = (state) => ({
    managersTableData: state.managersPage.managersTableData,
    newManagerName: state.managersPage.newManagerName,
    newManagerHead: state.managersPage.newManagerHead,
    newManagerTel: state.managersPage.newManagerTel
})

export default connect(mapStateToProps, {setDataManagersTable, setNewManagerData})(ManagersContainer)