import React, {useState} from 'react';
import classes from './deal.module.css'
import Driver from './Driver/Driver';
import Forwarder from './Forwarder/Forwarder';
import ClientInvoice from './ClientInvoice/ClientInvoice';
import ProviderInvoice from './ProviderInvoice/ProviderInvoice';
import Doc from './Doc/Doc';
import Switch from "@material-ui/core/Switch";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {useFormik} from "formik";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BusinessIcon from '@material-ui/icons/Business';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from "@material-ui/core/Grid";

const Deal = (props) => {

    let driversElements = props.drivers.map(d => <Driver key={d.id}
                                                         driverName={d.driverName}
                                                         sum={d.sum}
    />)

    let forwardersElements = props.forwarders.map(d => <Forwarder key={d.id}
                                                                  forwarderName={d.forwarderName}
                                                                  sum={d.sum}
    />)

    let clientInvoicesElements = props.clientInvoices.map(clientInvoice => <ClientInvoice
        key={clientInvoice._id}
        company={clientInvoice.company}
        fileUrl={clientInvoice.fileUrl}
        sum={clientInvoice.sum}
        typeFile={clientInvoice.typeFile}
        dealId={props.id}
        deleteFile={props.deleteFile}
    />)

    let providerInvoicesElements = props.providerInvoices.map(providerInvoice => <ProviderInvoice
        key={providerInvoice.id}
        company={providerInvoice.company}
        fileUrl={providerInvoice.fileUrl}
        sum={providerInvoice.sum}
        typeFile={providerInvoice.typeFile}
        dealId={props.id}
        deleteFile={props.deleteFile}
    />)

    let docsElements = props.allDocs.map(doc => <Doc key={doc.id}
                                                     company={doc.company}
                                                     fileUrl={doc.fileUrl}
                                                     sum={doc.sum}
                                                     typeFile={doc.typeFile}
                                                     dealId={props.id}
                                                     deleteFile={props.deleteFile}
    />)
    // Formik для окна ADD FILE
    const formik = useFormik({
        initialValues: {
            company: '',
            sum: '',
            driver: '',
            sumDriver: '',
            forwarder: '',
            sumForwarder: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    // --------------------------------------------------------
    // конвертируем ДАТУ для сделки в нормальный формат
    let convertedDate = new Date(Date.parse(props.date))
    let dateString = convertedDate.getDate() + '.' + (convertedDate.getMonth() + 1) + '.' + convertedDate.getFullYear()
    // --------------------------------------------------------
    // локальные стэйты
    const [openAddFile, setOpenAddFile] = React.useState(false);
    const [openAddDriver, setOpenAddDriver] = React.useState(false);
    const [openAddForwarder, setOpenAddForwarder] = React.useState(false);
    const [typeFile, setTypeFile] = useState('')
    // --------------------------------------------------------
    // окно DRIVERS
    // открыть
    const onAddDriverOpen = () => {
        setOpenAddDriver(true)
    }
    // закрыть
    const onAddDriverClose = () => {
        setOpenAddDriver(false)
    }
    // --------------------------------------------------------
    // Ф-я добавления водителя
    const onAddDriver = () => {
        props.addDriver(props.id, formik.values.driver, Number(formik.values.sumDriver))
        onAddDriverClose()
    }
    // --------------------------------------------------------
    // окно FORWARDERS
    // открыть
    const onAddForwarderOpen = () => {
        setOpenAddForwarder(true)
    }
    // закрыть
    const onAddForwarderClose = () => {
        setOpenAddForwarder(false)
    }
    // --------------------------------------------------------
    // Ф-я добавления экспедитора
    const onAddForwarder = () => {
        props.addForwarder(props.id, formik.values.forwarder, Number(formik.values.sumForwarder))
        onAddForwarderClose()
    }
    // --------------------------------------------------------
    // окно ADD FILE
    // открыть для ClientInvoices
    const onAddFileOpenCI = () => {
        setOpenAddFile(true)
        setTypeFile('CI')
    }
    // открыть для ProviderInvoices
    const onAddFileOpenPI = () => {
        setOpenAddFile(true)
        setTypeFile('PI')
    }
    // открыть для AllDocs
    const onAddFileOpenDOC = () => {
        setOpenAddFile(true)
        setTypeFile('DOC')
    }
    // закрыть
    const onAddFileClose = () => {
        setOpenAddFile(false)
    }
    // --------------------------------------------------------
    // Ф-я загрузки файлов (срабатывает при добавлении файлов)
    const onUploadFile = (e) => {
        if (e.target.files.length) {
            props.saveFile(e.target.files[0], props.id, formik.values.company, Number(formik.values.sum), typeFile)
            onAddFileClose()
        }
    }
    // console.log(formik.values.driver, Number(formik.values.sumDriver))
    // --------------------------------------------------------
    // вычисляем константы для Сделки:
    // Сумма счетов клиента
    const sumClientInvoices = props.clientInvoices.reduce((s, i) => s = s + Number(i.sum), 0)
    // Сумма счетов поставщиков
    const sumProviderInvoices = props.providerInvoices.reduce((s, i) => s = s + Number(i.sum), 0)
    // Сумма документов
    const sumAllDocs = props.allDocs.reduce((s, i) => s = s + Number(i.sum), 0)
    // --------------------------------------------------------
    // Сумма Доставки
    const sumAllDrivers = props.drivers.reduce((s, i) => s = s + Number(i.sum), 0)
    const sumAllForwarders = props.forwarders.reduce((s, i) => s = s + Number(i.sum), 0)
    const sumDeliver = sumAllDrivers + sumAllForwarders
    // Сумма дельты без доков
    const sumDeltaOutDocs = sumClientInvoices - sumProviderInvoices - sumDeliver
    // Сумма дельты с доками
    let sumDeltaWithDocs = 0
    if (sumAllDocs !== 0) {
        sumDeltaWithDocs = sumClientInvoices - sumAllDocs - sumDeliver
    }

    // --------------------------------------------------------

    return (
        <div className={classes.deal}>
            {/*----------------------начало-------------------ОКНО ADD FILE------------------------------------------*/}
            <Dialog onClose={onAddFileClose} aria-labelledby="customized-dialog-title" open={openAddFile}>
                <DialogTitle id="customized-dialog-title" onClose={onAddFileClose}>
                    Загрузить файл
                </DialogTitle>
                <DialogContent dividers>
                    <div>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <BusinessIcon/>
                            </Grid>
                            <Grid item>
                                {typeFile === 'CI'
                                    ? <Select
                                        native
                                        value={formik.values.company}
                                        onChange={formik.handleChange}
                                        inputProps={{
                                            name: 'company',
                                            id: 'company',
                                        }}
                                    >
                                        <option value="" disabled>
                                            Выберите компанию
                                        </option>
                                        <option value={'Демир'}>Демир</option>
                                        <option value={'АСТ'}>АСТ</option>
                                        <option value={'ТП'}>ТП</option>
                                    </Select>
                                    : <TextField
                                        id="company"
                                        label="Компания"
                                        type='text'
                                        name='company'
                                        onChange={formik.handleChange}
                                        on
                                        value={formik.values.company}
                                        size="small"
                                    />}
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <MonetizationOnIcon/>
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="sum"
                                    label="Сумма счета"
                                    type='text'
                                    name='sum'
                                    onChange={formik.handleChange}
                                    on
                                    value={formik.values.sum}
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <input className={classes.inputUpload} type={'file'} id="contained-button-file"
                               onChange={onUploadFile}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                            Загрузить
                        </Button>
                    </label>
                    <Button onClick={onAddFileClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
            {/*----------------------конец--------------------ОКНО ADD FILE------------------------------------------*/}
            {/*----------------------начало-------------------ОКНО ADD DRIVER----------------------------------------*/}
            <Dialog onClose={onAddDriverClose} aria-labelledby="customized-dialog-title" open={openAddDriver}>
                <DialogTitle id="customized-dialog-title" onClose={onAddDriverClose}>
                    Выбрать водителя
                </DialogTitle>
                <DialogContent dividers>
                    <div>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AccountCircleIcon/>
                            </Grid>
                            <Grid item>
                                <Select
                                    native
                                    value={formik.values.driver}
                                    onChange={formik.handleChange}
                                    inputProps={{
                                        name: 'driver',
                                        id: 'driver',
                                    }}
                                >
                                    <option value="" disabled>
                                        Выберите водителя
                                    </option>
                                    <option value={'Рома Кононенко'}>Рома Кононенко</option>
                                    <option value={'Юсуп Рабаданов'}>Юсуп Рабаданов</option>
                                    <option value={'Сераж'}>Сераж</option>
                                </Select>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <MonetizationOnIcon/>
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="sumDriver"
                                    label="Сумма"
                                    type='text'
                                    name='sumDriver'
                                    onChange={formik.handleChange}
                                    on
                                    value={formik.values.sumDriver}
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onAddDriver} color="primary">
                        Добавить
                    </Button>
                    <Button onClick={onAddDriverClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
            {/*----------------------конец--------------------ОКНО ADD DRIVER----------------------------------------*/}
            {/*----------------------начало-------------------ОКНО ADD FORWARDER-------------------------------------*/}
            <Dialog onClose={onAddForwarderClose} aria-labelledby="customized-dialog-title" open={openAddForwarder}>
                <DialogTitle id="customized-dialog-title" onClose={onAddForwarderClose}>
                    Выбрать водителя
                </DialogTitle>
                <DialogContent dividers>
                    <div>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AccountCircleIcon/>
                            </Grid>
                            <Grid item>
                                <Select
                                    native
                                    value={formik.values.forwarder}
                                    onChange={formik.handleChange}
                                    inputProps={{
                                        name: 'forwarder',
                                        id: 'forwarder',
                                    }}
                                >
                                    <option value="" disabled>
                                        Выберите экспедитора
                                    </option>
                                    <option value={'Ярослав Бойченко'}>Ярослав Бойченко</option>
                                    <option value={'Максим Радионов'}>Максим Радионов</option>
                                    <option value={'Сераж'}>Сераж</option>
                                </Select>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <MonetizationOnIcon/>
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="sumForwarder"
                                    label="Сумма"
                                    type='text'
                                    name='sumForwarder'
                                    onChange={formik.handleChange}
                                    on
                                    value={formik.values.sumForwarder}
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onAddForwarder} color="primary">
                        Добавить
                    </Button>
                    <Button onClick={onAddForwarderClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
            {/*----------------------конец--------------------ОКНО ADD FORWARDER-------------------------------------*/}
            <div className={classes.leftBlock}>
                <div className={classes.title}>
                    <div className={classes.date}>{dateString}</div>
                    <div className={classes.client}>{props.client}</div>
                    <div className={classes.doneSwitcher}>
                        <div className={classes.doneSwitcherContainer}>
                            <div className={classes.titleDoneSwitcher}>Готово</div>
                            <Switch color="primary"/>
                        </div>
                    </div>
                    <div className={classes.manager}>{props.manager}</div>
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
                        <div className={classes.sumClientInvoices}>{sumClientInvoices} руб.</div>
                    </div>
                    <div className={`${classes.clientInvoicesItems} ${classes.docsFilesItems}`}>
                        {clientInvoicesElements}
                        <div className={classes.addFile} onClick={onAddFileOpenCI}>
                            <div className={classes.plus}>+</div>
                            <div className={classes.addFileText}>Добавить<br/>файл</div>
                        </div>
                    </div>
                </div>
                <div className={classes.providerInvoices}>
                    <div className={classes.headerProviderInvoices}>
                        <div className={classes.titleProviderInvoices}>счета поставщиков</div>
                        <div className={classes.sumProviderInvoices}>{sumProviderInvoices} руб.</div>
                    </div>
                    <div className={`${classes.providerInvoicesItems} ${classes.docsFilesItems}`}>
                        {providerInvoicesElements}
                        <div className={classes.addFile} onClick={onAddFileOpenPI}>
                            <div className={classes.plus}>+</div>
                            <div className={classes.addFileText}>Добавить<br/>файл</div>
                        </div>
                    </div>
                </div>
                <div className={classes.allDocs}>
                    <div className={classes.headerAllDoc}>
                        <div className={classes.titleAllDoc}>документы</div>
                        <div className={classes.delta}>{sumAllDocs} руб.</div>
                    </div>
                    <div className={`${classes.docsItems} ${classes.docsFilesItems}`}>
                        {docsElements}
                        <div className={classes.addFile} onClick={onAddFileOpenDOC}>
                            <div className={classes.plus}>+</div>
                            <div className={classes.addFileText}>Добавить<br/>файл</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.rightBlock}>
                <div className={classes.titleDeliver}>Доставка</div>
                <div className={classes.sumDeliver}>{sumDeliver} руб.</div>
                <div className={classes.drivers}>
                    <div className={classes.titleDriversForwarders}>Водители:</div>
                    <div className={classes.driversItems}>
                        {driversElements}
                        <div className={classes.addDriverForwarder} onClick={onAddDriverOpen}>+ добавить водителя</div>
                    </div>
                </div>
                <div className={classes.forwarders}>
                    <div className={classes.titleDriversForwarders}>Экспедиторы:</div>
                    <div className={classes.forwardersItems}>
                        {forwardersElements}
                        <div className={classes.addDriverForwarder} onClick={onAddForwarderOpen}>+ добавить экспедитора</div>
                    </div>
                </div>
                <div className={classes.allDelta}>
                    <div className={classes.deltaOutDocs}>
                        <div className={classes.deltaTitle}>Дельта без доков</div>
                        <div className={classes.deltaSum}>{sumDeltaOutDocs} руб.</div>
                    </div>
                    <div className={classes.deltaWithDocs}>
                        <div className={classes.deltaTitle}>Дельта с доками</div>
                        <div className={classes.deltaSum}>{sumDeltaWithDocs} руб.</div>
                    </div>
                </div>
                <div className={classes.commentsBlock}>
                    <div className={`${classes.commentTitle} ${classes.commentTitleManager}`}>Комментарий менеджера:
                    </div>
                    <div className={`${classes.editComment} ${classes.editCommentManager}`}>редактировать</div>
                    <div className={`${classes.comment} ${classes.commentManager}`}>{props.commentManager}</div>
                    <div className={`${classes.commentTitle} ${classes.commentTitleHead}`}>Комментарий руководителя:
                    </div>
                    <div className={`${classes.editComment} ${classes.editCommentHead}`}>редактировать</div>
                    <div className={`${classes.comment} ${classes.commentHead}`}>{props.commentHead}</div>
                </div>
            </div>
        </div>
    )

}

export default Deal;