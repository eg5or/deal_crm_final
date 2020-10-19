import React from 'react';
import MaterialTable from "material-table";
import {localization} from "../../../localization/localization";


const Companies = (props) => {

    let data = Array.from(props.companiesTableData)
    return (
        <div>
            <MaterialTable
                title="Компании"
                columns={
                    [
                        {title: 'Название', field: 'name'},
                        {title: 'Тип', field: 'bill', lookup: {nn: 'НН', bn: 'БН'}},
                        {title: 'Налог', field: 'tax'},
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
                                props.addCompany(newData.name, newData.bill, newData.tax)
                                resolve();
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                props.updateCompany(oldData._id, newData.name, newData.bill, newData.tax)
                                resolve();
                            }, 1000);
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                props.deleteCompany(oldData._id)
                                resolve();
                            }, 1000);
                        })

                }}
                localization={localization}
            />
        </div>
    )
}

export default Companies;