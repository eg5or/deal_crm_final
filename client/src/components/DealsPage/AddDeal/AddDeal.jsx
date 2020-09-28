import React from 'react';
import classes from './AddDeal.module.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ClientInvoice from "../DealsItems/Deal/ClientInvoice/ClientInvoice";
import {closeDialog} from "../../../redux/add-deal-reducer";

const AddDeal = (props) => {

    // == Левый блок ==
    // ** Дата - ввод даты
    // ** Клиент - выбор клиента
    // создаем ссылку на input для ввода клиента
    let newClientInputElement = React.createRef()
    // ф-я для flux - при изменении текста
    let onClientInputChange = () => {
        let text = newClientInputElement.current.value
        props.newClientInputText(text) // обновляем переменную в state
        props.searchClients(text) // ф-я из Контейнера для поиска/фильтрации клиентов

        // убираем панель найденных клиентов, если input пустой
        if (text === '') {
            props.closeDropDownClients()
        }
    }

    // вставляем выбранное значение из найденных в поле ввода
    let setFoundClientToInput = (text) => {
        props.newClientInputText(text)
        props.closeDropDownClients()
    }

    return <div>
        <div className={`${classes.filters} ${classes.most_light_bg}`}>
            <Button
                onClick={props.handleClick}
                variant="contained"
                color="primary"
                size="large"
            >
                {props.buttonToggle ? 'Отмена' : 'Добавить сделку'}
            </Button>
        </div>
        <div className={classes.addDeal} style={
            {
                height: (props.buttonToggle ? '470px' : 0)
            }
        }>
            <div className={`${classes.deal} ${classes.most_light_bg}`}>
                <div className={classes.leftBlock}>
                    <div className={classes.title}>
                        <div className={classes.date}>
                            <TextField
                                id="date"
                                label="Дата сделки"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth={true}
                            />
                        </div>
                        <div className={classes.client}>
                            <TextField
                                id="client"
                                label="Клиент"
                                type='text'
                                name='client'
                                inputRef={newClientInputElement}
                                onChange={onClientInputChange}
                                on
                                value={props.clientInputText}
                                size="small"
                                fullWidth={true}
                            />
                        </div>
                        <div className={classes.dropDownClients} style={
                            {
                                height: (props.toggleDropDownClients ? '470px' : 0)
                            }
                        }>
                            <div className={`${classes.dropDownClientsTitle} ${classes.middle_txt}`}>Выберите клиента:
                            </div>
                            {props.dataFoundClients
                                .map(client => <div
                                    className={classes.dropDownClientsItems}
                                    onClick={() => setFoundClientToInput(client.name)}
                                >
                                    {client.name}
                                </div>)}
                        </div>
                        <div className={classes.manager}>{props.currentEmployeeName}</div>
                    </div>
                    <div className={classes.leftUnderManager}>* начните вводить название клиента и тут появятся
                        подсказки
                    </div>
                </div>
                <div className={`${classes.rightBlock} ${classes.dark_bg}`}>
                    <div className={classes.titleDeliver}>Инструкция</div>
                    <div className={classes.text}>
                        <p>
                            Для того, чтобы добавить сделку, введите дату, затем начните вводить в поле "Клиент" первые
                            буквы вашего клиента.
                            Ниже появятся совпадения, найденные в базе данных. Если ваш клиент появился в списке, вы
                            можете щелкнуть по
                            нему и его название автоматически вставится в поле ввода. Если в списке ниже пусто или ваш
                            клиент отсутствует,
                            то либо вы опечатались, либо клиент отсутствует в базе данных. В последнем случае,
                            обратитесь к администратору.
                        </p>
                        <p>
                            Далее нажмите на кнопку "Добавить сделку". Сделка подгрузится в общем списке и вы сможете
                            добавить туда дополнительные данные, такие как:
                        </p>
                        <ul>
                            <li>Счета клиента</li>
                            <li>Счета поставщиков</li>
                            <li>Документы по сделке</li>
                            <li>Водители</li>
                            <li>Экспедиторы</li>
                            <li>Комментарий</li>
                        </ul>
                    </div>
                </div>
                <div className={`${classes.addButtonBlock} ${classes.most_dark_bg} ${classes.light_txt}`}>
                    <span className={classes.addButtonText}>+ Добавить сделку</span>
                </div>
            </div>
        </div>
    </div>
}

export default AddDeal;