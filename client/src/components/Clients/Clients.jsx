import React from 'react';
import MaterialTable from "material-table";
import {transformString} from '../../utils/transformString'
import {localization} from "../../localization/localization";


const Clients = (props) => {

    let data = props.tableClientsData
    let managersArray = props.managers.map(manager => manager.name)
    const managers = {}
    for (const item of managersArray) {
        const translitItem = transformString.toTranslit(item.toLowerCase().split(' ').join(''))
        managers[translitItem] = item;
    }
    return (
        <div>
            <MaterialTable
                title="Компании"
                columns={
                    [
                        {title: 'Тип', field: 'type'},
                        {title: 'Название', field: 'name'},
                        {title: 'Менеджер', field: 'manager', lookup: managers},
                        {title: 'Сделки', field: 'deals', type: 'numeric'},
                    ]}
                data={data}
                options={{
                    pageSize: 20,
                    pageSizeOptions: [10, 20, 50],
                    filtering: true,
                    addRowPosition: "first",
                    columnsButton: true,
                    searchAutoFocus: true,
                    draggable: false
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                props.addClient(newData.type, newData.name, newData.manager)
                                resolve();
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                props.updateClient(oldData._id, newData.type, newData.name, newData.manager)
                                resolve();
                            }, 1000);
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                props.deleteClient(oldData._id)
                                resolve();
                            }, 1000);
                        })

                }}
                localization={localization}
            />
        </div>
    )
}

export default Clients;