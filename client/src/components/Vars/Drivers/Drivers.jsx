import React from 'react';
import MaterialTable from "material-table";
import {localization} from "../../../localization/localization";


const Drivers = (props) => {

    let data = Array.from(props.driversTableData)
    return (
        <div>
            <MaterialTable
                title="Водители"
                columns={
                    [
                        {title: 'Имя', field: 'name'},
                        {title: 'Телефон', field: 'tel'},
                        {title: 'Авто', field: 'auto'},
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
                                props.addDriver(newData.name, newData.tel, newData.auto)
                                resolve();
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                props.updateDriver(oldData._id, newData.name, newData.tel, newData.auto)
                                resolve();
                            }, 1000);
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                props.deleteDriver(oldData._id)
                                resolve();
                            }, 1000);
                        })

                }}
                localization={localization}
            />
        </div>
    )
}

export default Drivers;