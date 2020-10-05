import React from 'react';
import classes from './AddDeal.module.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ArchiveIcon from '@material-ui/icons/Archive';
import {setFilter} from "../../../redux/deals-reducer";

const AddDeal = (props) => {

    // == Левый блок ==
    // ** Дата - ввод даты
    // ** Клиент - выбор клиента
    // создаем ссылку на input для ввода клиента
    let newClientInputElement = React.createRef()
    let newDataInputElement = React.createRef()
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
    const onAddDeal = () => {
        props.addDeal(new Date(newDataInputElement.current.value), props.clientInputText, props.currentEmployeeName)
        props.handleClick()
    }
    //
    const [filter, setFilter] = React.useState();
    switch (filter) {
        case 'noDealDone':
            const filter5 = {
                status: 'dealDone',
                bool: false
            }
            props.loadingDealsPage(filter5)
            break
        case 'noDelivered':
            const filter = {
                status: 'delivered',
                bool: false
            }
            props.loadingDealsPage(filter)
            break
        case 'delivered':
            const filter1 = {
                status: 'delivered',
                bool: true
            }
            props.loadingDealsPage(filter1)
            break
        case 'noPaid':
            const filter2 = {
                status: 'clientPaid',
                bool: false
            }
            props.loadingDealsPage(filter2)
            break
        case 'noDocs':
            const filter3 = {
                status: 'docCollected',
                bool: false
            }
            props.loadingDealsPage(filter3)
            break
        case 'withDocs':
            const filter4 = {
                status: 'docCollected',
                bool: true
            }
            props.loadingDealsPage(filter4)
            break
    }
    const filterChange = (event, newFilter) => {
        setFilter(newFilter);
    };
    //
    return <div>
        <div className={`${classes.buttonArea} ${classes.most_light_bg}`}>
            <div>
                <Button
                    onClick={props.handleClick}
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    {props.buttonToggle ? 'Отмена' : 'Добавить сделку'}
                </Button>
            </div>
            {!props.buttonToggle && <div className={classes.filters}>
                <Grid item>
                    <ToggleButtonGroup size="small" value={filter} exclusive onChange={filterChange}>
                        {(props.position !== 'secretary') && <ToggleButton value="noDealDone">
                            <ArchiveIcon fontSize="small" /> Не готовые
                        </ToggleButton>}
                        <ToggleButton value="noDelivered">
                            <ArchiveIcon fontSize="small" /> Не вывезли
                        </ToggleButton>
                        <ToggleButton value="delivered">
                            <ArchiveIcon fontSize="small" /> Уже вывезли
                        </ToggleButton>
                        <ToggleButton value="noPaid">
                            <ArchiveIcon fontSize="small" /> Не оплачены
                        </ToggleButton>
                        <ToggleButton value="noDocs">
                            <ArchiveIcon fontSize="small" /> Нет документов
                        </ToggleButton>
                        <ToggleButton value="withDocs">
                            <ArchiveIcon fontSize="small" /> С документами
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </div>}
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
                                inputRef={newDataInputElement}
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
                <div className={`${classes.addButtonBlock} ${classes.most_dark_bg} ${classes.light_txt}`} onClick={onAddDeal}>
                    <span className={classes.addButtonText} >+ Добавить сделку</span>
                </div>
            </div>
        </div>
    </div>
}

export default AddDeal;