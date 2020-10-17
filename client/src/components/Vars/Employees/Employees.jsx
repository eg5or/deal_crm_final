import React, {useEffect, useState} from 'react';
import MaterialTable from "material-table";


const Employees = (props) => {

    let data = props.employeesTableData

    const localization = {
        pagination: {
            labelDisplayedRows: '{from}-{to} из {count}',
            labelRowsSelect: 'строк',
            labelRowsPerPage: 'Строк на странице:',
            firstAriaLabel: 'Первая страница',
            firstTooltip: 'Первая страница',
            previousAriaLabel: 'Предыдущая страница',
            previousTooltip: 'Предыдущая страница',
            nextAriaLabel: 'Следующая страница',
            nextTooltip: 'Следующая страница',
            lastAriaLabel: 'Последняя страница',
            lastTooltip: 'Последняя страница'
        },
        toolbar: {
            nRowsSelected: '{0} row(s) selected',
            searchTooltip: 'Поиск',
            searchPlaceholder: 'Поиск',
            showColumnsTitle: 'Столбцы',
            showColumnsAriaLabel: 'Столбцы',
            addRemoveColumns: 'Показать столбцы:'
        },
        header: {
            actions: 'Действия'
        },
        body: {
            emptyDataSourceMessage: 'Нет записей в таблице',
            filterRow: {
                filterTooltip: 'Фильтровать'
            },
            editTooltip: 'Редактировать',
            deleteTooltip: 'Удалить',
            addTooltip: 'Добавить',
            editRow: {
                cancelTooltip: 'Отменить',
                saveTooltip: 'Сохранить',
                deleteText: 'Вы точно хотите удалить эту строку?'
            },

        }
    }

    return (
        <div>
            <MaterialTable
                title="Сотрудники"
                columns={
                    [
                        {
                            title: 'Должность', field: 'position', lookup: {
                                chief: 'Нач.отдела',
                                manager: 'Менеджер',
                                director: 'Директор',
                                secretary: 'Офис менеджер'
                            }
                        },
                        {title: 'Имя', field: 'name'},
                        {title: 'E-mail', field: 'email', editable: 'never'},
                        {title: 'Начальник', field: 'head.name'},
                        {title: 'Офис', field: 'location', lookup: {
                                korolev: 'Королёв',
                                tushino: 'Тушино'
                            }},
                        {title: 'Телефон', field: 'tel'},
                        {title: 'Внутр.тел.', field: 'intel'},
                        {title: 'День рождения', field: 'birthday'},
                    ]}
                data={data}
                options={{
                    pageSize: 20,
                    pageSizeOptions: [10, 20, 50],
                    filtering: true,
                    addRowPosition: "first",
                    columnsButton: true,
                    searchAutoFocus: true,
                    draggable: false,
                    rowStyle: {
                        fontSize: 13,
                    }
                }}
                /*editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                props.updateEmployee(
                                    oldData._id,
                                    newData.position,
                                    newData.name,
                                    newData.head,
                                    newData.location,
                                    newData.tel,
                                    newData.intel,
                                    newData.birthday
                                )
                                resolve();
                            }, 1000);
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                props.deleteEmployee(oldData._id)
                                resolve();
                            }, 1000);
                        })

                }}*/
                localization={localization}
            />
        </div>
    )
}

export default Employees;