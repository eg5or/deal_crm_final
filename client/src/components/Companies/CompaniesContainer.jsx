import React from "react";
import Companies from "./Companies";
import {connect} from "react-redux";
import {companiesAPI} from "../../API/api";
import {setDataTable, setNewCompanyData} from "../../redux/companies-reducer";
import classes from './CompaniesContainer.css'

class CompaniesContainer extends React.Component {
    componentDidMount() {
        companiesAPI.getAllCompanies().then(data => {
            this.props.setDataTable(data)
        })
    }

    addCompany = async (type, name, manager) => {
        await this.props.setNewCompanyData(type, name, manager)
        try {
            const data = await companiesAPI.addNewCompany(this.props.newCompanyType, this.props.newCompanyName, this.props.newCompanyManager)
        } catch (e) {
            alert(e.response.data.message)
        }


        this.props.setNewCompanyData('', '', '')
        companiesAPI.getAllCompanies().then(data => {
            this.props.setDataTable(data)
        })

    }

    updateCompany = async (id, type, name, manager) => {
        try {
            await companiesAPI.updateCompany(id, type, name, manager)
        } catch (e) {
            alert(e.response.data.message)
        }
        companiesAPI.getAllCompanies().then(data => {
            this.props.setDataTable(data)
        })
    }

    deleteCompany = async (id) => {
        try {
            await companiesAPI.deleteCompany(id)
        } catch (e) {
            alert(e.response.data.message)
        }
        companiesAPI.getAllCompanies().then(data => {
            this.props.setDataTable(data)
        })

    }

    render() {
        return <div className={classes.companiesContainer}><Companies
            tableData={this.props.tableData}
            setNewCompanyData={this.props.setNewCompanyData}
            addCompany={this.addCompany}
            updateCompany={this.updateCompany}
            deleteCompany={this.deleteCompany}
            newCompanyType={this.props.newCompanyType}
            newCompanyName={this.props.newCompanyName}
            newCompanyManager={this.props.newCompanyManager}
            /></div>

    }


}
const mapStateToProps = (state) => ({
    tableData: state.companiesPage.tableData,
    newCompanyType: state.companiesPage.newCompanyType,
    newCompanyName: state.companiesPage.newCompanyName,
    newCompanyManager: state.companiesPage.newCompanyManager
})

export default connect(mapStateToProps, {setDataTable, setNewCompanyData})(CompaniesContainer)