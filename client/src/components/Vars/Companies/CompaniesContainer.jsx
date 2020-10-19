import React from "react";
import {connect} from "react-redux";
import Companies from "./Companies";
import classes from "./companiesContainer.module.css"
import {
    addCompany, deleteCompany,
    loadingCompaniesTableData,
    updateCompany
} from "../../../redux/companies-reducer";

class CompaniesContainer extends React.Component {
    componentDidMount() {
        this.props.loadingCompaniesTableData()
    }

    render() {
        return <div className={classes.companiesContainer}><Companies
            companiesTableData={this.props.companiesTableData}
            addCompany={this.props.addCompany}
            updateCompany={this.props.updateCompany}
            deleteCompany={this.props.deleteCompany}
        /></div>

    }


}
const mapStateToProps = (state) => ({
    companiesTableData: state.companiesPage.companiesTableData,
})

export default connect(mapStateToProps, {
    loadingCompaniesTableData,
    addCompany,
    updateCompany,
    deleteCompany
})(CompaniesContainer)