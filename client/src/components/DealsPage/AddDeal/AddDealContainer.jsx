import React from 'react';
import AddDeal from './AddDeal';
import {connect} from 'react-redux';
import {
    closeDropDownClients,
    newClientInputText, openDropDownClients,
    setButtonToggle,
    setDataClientTable,
    setDataFoundClients
} from '../../../redux/add-deal-reducer';
import {companiesAPI} from '../../../API/api';
import {transformString} from '../../../utils/transformString';

class AddDealContainer extends React.Component {
    componentDidMount() {
        companiesAPI.getAllCompaniesNames().then(data => {
            this.props.setDataClientTable(data)
        })
    }

    handleClick = () => {
        this.props.setButtonToggle()
    }

    searchClients = async (text) => {
        const clientTable = this.props.dataClientTable
        let val = text.toLowerCase()
        let result = clientTable.filter(item => item.name.toLowerCase().startsWith(val));
        this.props.setDataFoundClients(result)
        this.props.openDropDownClients()
    }

    render() {
        // console.log('dataFoundClients ', this.props.dataFoundClients)
        return <AddDeal
            handleClick={this.handleClick}
            buttonToggle={this.props.buttonToggle}
            dataClientTable={this.props.dataClientTable}
            clientInputText={this.props.clientInputText}
            newClientInputText={this.props.newClientInputText}
            dataFoundClients={this.props.dataFoundClients}
            searchClients={this.searchClients}
            closeDropDownClients={this.props.closeDropDownClients}
            toggleDropDownClients={this.props.toggleDropDownClients}
        />
    }


}
const mapStateToProps = (state) => ({
    buttonToggle: state.addDealBlock.buttonToggle,
    dataClientTable: state.addDealBlock.dataClientTable,
    clientInputText: state.addDealBlock.clientInputText,
    dataFoundClients: state.addDealBlock.dataFoundClients,
    toggleDropDownClients: state.addDealBlock.toggleDropDownClients,
})

export default connect(mapStateToProps, {
    setButtonToggle,
    setDataClientTable,
    newClientInputText,
    setDataFoundClients,
    openDropDownClients,
    closeDropDownClients
})(AddDealContainer)