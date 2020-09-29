import React from 'react';
import MaterialTable from "material-table";
import {localization} from "../../../localization/localization";


const Forwarders = (props) => {

    let data = Array.from(props.forwardersTableData)
    return (
        <div>
            <MaterialTable
                title="Экспедиторы"
                columns={
                    [
                        {title: 'Имя', field: 'name'},
                        {title: 'Телефон', field: 'tel'}
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
                                props.addForwarder(newData.name, newData.tel)
                                resolve();
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                props.updateForwarder(oldData._id, newData.name, newData.tel)
                                resolve();
                            }, 1000);
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                props.deleteForwarder(oldData._id)
                                resolve();
                            }, 1000);
                        })

                }}
                localization={localization}
            />
        </div>
    )
}

export default Forwarders;