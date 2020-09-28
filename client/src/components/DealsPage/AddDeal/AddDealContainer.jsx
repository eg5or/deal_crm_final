import React from 'react';
import AddDeal from './AddDeal';
import {connect} from 'react-redux';
import {
    closeDialog,
    closeDropDownClients,
    newClientInputText, openDialog, openDropDownClients,
    setButtonToggle, setDataClientInvoices,
    setDataClientTable,
    setDataFoundClients
} from '../../../redux/add-deal-reducer';
import {clientInvoicesAPI, clientsAPI} from '../../../API/api';

class AddDealContainer extends React.Component {
    componentDidMount() {
        // загружаем список клиентов для поиска в поле ввода
        clientsAPI.getAllClientsNames().then(data => {
            this.props.setDataClientTable(data)
        })
        // загружаем все счета клиентов для этой сделки
        clientInvoicesAPI.getAllClientInvoicesForDeal('103').then(data => {
            this.props.setDataClientInvoices(data)
        })
    }

    // ф-я для открывания блока добавления сделки
    handleClick = () => {
        this.props.setButtonToggle()
    }

    // ф-я поиска клиентов
    searchClients = async (text) => {
        const clientTable = this.props.dataClientTable
        let val = text.toLowerCase()
        let result = clientTable.filter(item => item.name.toLowerCase().startsWith(val));
        this.props.setDataFoundClients(result)
        this.props.openDropDownClients()
    }

    render() {
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
            clientInvoicesData={this.props.clientInvoicesData}
            toggleDialog={this.props.toggleDialog}
            openDialog={this.props.openDialog}
            closeDialog={this.props.closeDialog}
        />
    }


}
const mapStateToProps = (state) => ({
    buttonToggle: state.addDealBlock.buttonToggle, // переключатель для показа блока (boolean)
    dataClientTable: state.addDealBlock.dataClientTable, // таблица во всеми клиентами (массив объектов)
    clientInputText: state.addDealBlock.clientInputText, // текст поля ввода
    dataFoundClients: state.addDealBlock.dataFoundClients, // отфильтрованный массив найденных клиентов (массив объектов)
    toggleDropDownClients: state.addDealBlock.toggleDropDownClients, // переключатель для показа выпадающего списка найденных клиентов (boolean)
    clientInvoicesData: state.addDealBlock.clientInvoicesData, // счета клиента
    toggleDialog: state.addDealBlock.toggleDialog, // состояние диалога
})

export default connect(mapStateToProps, {
    setButtonToggle,
    setDataClientTable,
    newClientInputText,
    setDataFoundClients,
    openDropDownClients,
    closeDropDownClients,
    setDataClientInvoices,
    openDialog,
    closeDialog
})(AddDealContainer)