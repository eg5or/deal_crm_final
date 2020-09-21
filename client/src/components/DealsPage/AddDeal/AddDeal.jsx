import React from 'react';
import classes from './AddDeal.module.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {newClientInputText} from '../../../redux/add-deal-reducer';

const AddDeal = (props) => {
    const handleChange = (event) => {
        // setAge(event.target.value);
    };

    const clients = [
        {
            id: 1,
            name: 'Бозон',
            manager: 'Артём Соловьев'
        },
        {
            id: 2,
            name: 'Гефест',
            manager: 'Артём Рыбаков'
        },
        {
            id: 3,
            name: 'Алик',
            manager: 'Артём Соловьев'
        },
        {
            id: 4,
            name: 'Баллон',
            manager: 'Артём Соловьев'
        },
        {
            id: 5,
            name: 'Гарман',
            manager: 'Артём Рыбаков'
        },
        {
            id: 6,
            name: 'Арбуз',
            manager: 'Артём Соловьев'
        },
    ]
    let newClientInputElement = React.createRef()
    let onClientInputChange = () => {
        let text = newClientInputElement.current.value
        props.newClientInputText(text)
        props.searchClients(text)
        if (text === '') {
            props.closeDropDownClients()
        }
    }

    let one = (text) => {
        props.newClientInputText(text)
        props.closeDropDownClients()
    }

    return <div className={classes.addDealBlock}>
        <div className={classes.filters}>
            <Button onClick={props.handleClick} variant="contained" color="primary" size="large">Добавить сделку</Button>
        </div>
        <div className={classes.addDeal} style={
            {
                height: (props.buttonToggle ? '550px' : 0)
            }
        }>
            <div className={classes.deal} >
                <div className={classes.leftBlock}>
                    <div className={classes.title}>
                        <div className={classes.date}>
                            <TextField
                                id="date"
                                label="Дата сделки"
                                type="date"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                                height: (props.toggleDropDownClients ? '550px' : 0)
                            }
                        }>
                            <div className={classes.dropDownClientsTitle}>Выберите клиента:</div>
                                {props.dataFoundClients
                                    .map(client =><div
                                        className={classes.dropDownClientsItems}
                                        onClick={() => one(client.name)}
                                    >
                                        {client.name}
                                    </div>)}
                        </div>
                        <div className={classes.manager}>Артём Соловьёв</div>
                    </div>
                    <div className={`${classes.approved} ${classes.buttonLeft}`}>Одобрено</div>
                    <div className={`${classes.providerPaid} ${classes.buttonLeft}`}>Закупка не оплачена</div>
                    <div className={`${classes.delivered} ${classes.buttonLeft}`}>Не вывезли</div>
                    <div className={`${classes.clientPaid} ${classes.buttonLeft}`}>Клиент не оплатил</div>
                    <div className={`${classes.docSigned} ${classes.buttonLeft}`}>Документы не подписаны</div>
                    <div className={`${classes.docCollected} ${classes.buttonLeft}`}>Документы не собраны</div>
                </div>
                <div className={classes.centerBlock}>
                    <div className={classes.clientInvoices}>
                        <div className={classes.headerClientInvoices}>
                            <div className={classes.titleClientInvoices}>счета клиенту</div>
                            <div className={classes.sumClientInvoices}>250 000 руб.</div>
                        </div>
                        <div className={`${classes.clientInvoicesItems} ${classes.docsFilesItems}`}>
                            clientInvoicesElements
                            <div className={classes.addFile}>
                                <div className={classes.plus}>+</div>
                                <div className={classes.addFileText}>Добавить<br />файл</div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.providerInvoices}>
                        <div className={classes.headerProviderInvoices}>
                            <div className={classes.titleProviderInvoices}>счета поставщиков</div>
                            <div className={classes.sumProviderInvoices}>250 000 руб.</div>
                        </div>
                        <div className={`${classes.providerInvoicesItems} ${classes.docsFilesItems}`}>
                            providerInvoicesElements
                            <div className={classes.addFile}>
                                <div className={classes.plus}>+</div>
                                <div className={classes.addFileText}>Добавить<br />файл</div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.allDocs}>
                        <div className={classes.headerAllDoc}>
                            <div className={classes.titleAllDoc}>документы</div>
                            <div className={classes.delta}>250 000 руб.</div>
                        </div>
                        <div className={`${classes.docsItems} ${classes.docsFilesItems}`}>
                            docsElements
                            <div className={classes.addFile}>
                                <div className={classes.plus}>+</div>
                                <div className={classes.addFileText}>Добавить<br />файл</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.rightBlock}>
                    <div className={classes.titleDeliver}>Доставка</div>
                    <div className={classes.sumDeliver}>29 400 руб.</div>
                    <div className={classes.drivers}>
                        <div className={classes.titleDriversForwarders}>Водители:</div>
                        <div className={classes.driversItems}>
                            driversElements
                            <div className={classes.addDriverForwarder}>+ добавить водителя</div>
                        </div>
                    </div>
                    <div className={classes.forwarders}>
                        <div className={classes.titleDriversForwarders}>Экспедиторы:</div>
                        <div className={classes.forwardersItems}>
                            forwardersElements
                            <div className={classes.addDriverForwarder}>+ добавить экспедитора</div>
                        </div>
                    </div>
                    <div className={classes.commentsBlock}>
                        <div className={`${classes.commentTitle} ${classes.commentTitleManager}`}>Комментарий менеджера:</div>
                        <div className={`${classes.editComment} ${classes.editCommentManager}`}>редактировать</div>
                        <div className={`${classes.comment} ${classes.commentManager}`}>бла бла</div>
                        <div className={`${classes.commentTitle} ${classes.commentTitleHead}`}>Комментарий руководителя:</div>
                        <div className={`${classes.editComment} ${classes.editCommentHead}`}>редактировать</div>
                        <div className={`${classes.comment} ${classes.commentHead}`}>бла бла</div>
                    </div>
                </div>
                <div className={classes.addButtonBlock}><span className={classes.addButtonText}>+ Добавить сделку</span></div>
            </div>
        </div>
    </div>
}

export default AddDeal;