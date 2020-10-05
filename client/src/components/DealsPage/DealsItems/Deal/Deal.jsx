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
import StatusBlock from "./StatusBlock";
import InputAdornment from "@material-ui/core/InputAdornment";

const Deal = (props) => {

    let driversElements = props.drivers.map(d => <Driver key={d.id}
                                                         driverName={d.driverName}
                                                         tel={d.tel}
                                                         auto={d.auto}
                                                         sum={d.sum}
                                                         dealId={props.id}
                                                         position={props.authBlock.position}
                                                         deleteDriverFromDeal={props.deleteDriverFromDeal}
    />)

    let forwardersElements = props.forwarders.map(d => <Forwarder key={d.id}
                                                                  forwarderName={d.forwarderName}
                                                                  tel={d.tel}
                                                                  sum={d.sum}
                                                                  dealId={props.id}
                                                                  position={props.authBlock.position}
                                                                  deleteForwarderFromDeal={props.deleteForwarderFromDeal}
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
            sumForwarder: '',
            commentManager: '',
            commentHead: ''
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
    let [typeFile, setTypeFile] = useState('')
    // --------------------------------------------------------
    // окно DRIVERS
    // открыть
    const onAddDriverOpen = () => {
        setOpenAddDriver(true)
    }
    // закрыть
    const onAddDriverClose = () => {
        setOpenAddDriver(false)
        formik.values.driver = ''
        formik.values.sumDriver = ''
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
        formik.values.forwarder = ''
        formik.values.sumForwarder = ''
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
            formik.values.company = ''
            formik.values.sum = 0
            typeFile = ''
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
    // переключатель готовности сделки
    const toggleDealDone = (status) => {
        props.toggleStatus(props.id, status) // та же санка что и для переключения статусов
    }
    // --------------------------------------------------------
    // Комментарии
    const [editModeCM, setEditModeCM] = useState(false)
    const onEditModeCMOn = () => {
        setEditModeCM(true)
        formik.values.commentManager = props.commentManager
    }
    const onEditModeCMOff = () => {
        setEditModeCM(false)
        if (formik.values.commentManager !== props.commentManager) {
            onEditComment('CM')
        }
    }
    const onEditModeCMCancel = () => {
        setEditModeCM(false)
        formik.values.commentManager = props.commentManager
    }
    const [editModeCH, setEditModeCH] = useState(false)
    const onEditModeCHOn = () => {
        setEditModeCH(true)
        formik.values.commentHead = props.commentHead
    }
    const onEditModeCHOff = () => {
        setEditModeCH(false)
        if (formik.values.commentHead !== props.commentHead) {
            onEditComment('CH')
        }
    }
    const onEditModeCHCancel = () => {
        setEditModeCH(false)
        formik.values.commentHead = props.commentHead
    }
    const onEditComment = (type) => {
        let text = ''
        switch (type) {
            case 'CM':
                text = formik.values.commentManager
                break
            case 'CH':
                text = formik.values.commentHead
        }
        props.editComment(props.id, type, text)
    }
    // validation
    let errorTextCM = false
    if (formik.values.commentManager.length > 165) {
        errorTextCM = true
    }
    let errorTextCH = false
    if (formik.values.commentHead.length > 165) {
        errorTextCH = true
    }
    // --------------------------------------------------------
    // Добавляем водителей и экспедиторов в списки для выбора при добавлении
    let optionsDriversElements = props.allDrivers.map(driver => <option value={driver._id}>{driver.name}</option>)
    let optionsForwardersElements = props.allForwarders.map(forwarder => <option value={forwarder._id}>{forwarder.name}</option>)
    // --------------------------------------------------------
    // Доступ
    const position = props.authBlock.position

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
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">₽</InputAdornment>
                                    }}
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
                                    {optionsDriversElements}
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
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">₽</InputAdornment>
                                    }}
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
                                    {optionsForwardersElements}
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
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">₽</InputAdornment>
                                    }}
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
                <div className={(position === 'manager' || position === 'chief') ? classes.titleManager : classes.title}>
                    <div className={classes.date}>{dateString}</div>
                    <div className={classes.client}>{props.client}</div>
                    {(position === 'manager' || position === 'chief') && <div className={classes.doneSwitcher}>
                        <div className={classes.doneSwitcherContainer}>
                            <div className={`${classes.titleDoneSwitcher} ${!props.dealStatus.dealDone && classes.light_txt}`}>Готово</div>
                            {(position === 'manager') && <Switch
                                checked={props.dealStatus.dealDone}
                                onChange={() => {
                                    toggleDealDone('dealDone')
                                }}
                                name="checkedA"
                                color="primary"
                            />}
                        </div>
                    </div>}
                    <div className={classes.manager}>{props.manager}</div>
                </div>
                <StatusBlock
                    dealStatus={props.dealStatus}
                    dealId={props.id}
                    authBlock={props.authBlock}
                    // functions
                    toggleStatus={props.toggleStatus}
                />
            </div>
            <div className={classes.centerBlock}>
                <div className={classes.clientInvoices}>
                    <div className={classes.headerClientInvoices}>
                        <div className={classes.titleClientInvoices}>счета клиенту</div>
                        <div className={classes.sumClientInvoices}>{sumClientInvoices.toLocaleString()} ₽</div>
                    </div>
                    <div className={`${classes.clientInvoicesItems} ${classes.docsFilesItems}`}>
                        {clientInvoicesElements}
                        {(position === 'manager' || position === 'chief') && <div className={classes.addFile} onClick={onAddFileOpenCI}>
                            <div className={classes.plus}>+</div>
                            <div className={classes.addFileText}>Добавить<br/>файл</div>
                        </div>}
                    </div>
                </div>
                <div className={classes.providerInvoices}>
                    <div className={classes.headerProviderInvoices}>
                        <div className={classes.titleProviderInvoices}>счета поставщиков</div>
                        <div className={classes.sumProviderInvoices}>{sumProviderInvoices.toLocaleString()} ₽</div>
                    </div>
                    <div className={`${classes.providerInvoicesItems} ${classes.docsFilesItems}`}>
                        {providerInvoicesElements}
                        {(position === 'manager' || position === 'chief') && <div className={classes.addFile} onClick={onAddFileOpenPI}>
                            <div className={classes.plus}>+</div>
                            <div className={classes.addFileText}>Добавить<br/>файл</div>
                        </div>}
                    </div>
                </div>
                <div className={classes.allDocs}>
                    <div className={classes.headerAllDoc}>
                        <div className={classes.titleAllDoc}>документы</div>
                        <div className={classes.delta}>{sumAllDocs.toLocaleString()} ₽</div>
                    </div>
                    <div className={`${classes.docsItems} ${classes.docsFilesItems}`}>
                        {docsElements}
                        {(position === 'manager' || position === 'chief' || position === 'secretary') && <div
                            className={classes.addFile}
                            onClick={onAddFileOpenDOC}
                        >
                            <div className={classes.plus}>+</div>
                            <div className={classes.addFileText}>Добавить<br/>файл</div>
                        </div>}
                    </div>
                </div>
            </div>
            <div className={classes.rightBlock}>
                <div className={classes.titleDeliver}>Доставка</div>
                <div className={classes.sumDeliver}>{sumDeliver.toLocaleString()} ₽</div>
                <div className={classes.drivers}>
                    <div className={classes.titleDriversForwarders}>Водители:</div>
                    <div className={classes.driversItems}>
                        {driversElements}
                        {(position === 'manager' || position === 'chief') && <div
                            className={classes.addDriverForwarder}
                            onClick={onAddDriverOpen}>
                            + добавить водителя
                        </div>}
                    </div>
                </div>
                <div className={classes.forwarders}>
                    <div className={classes.titleDriversForwarders}>Экспедиторы:</div>
                    <div className={classes.forwardersItems}>
                        {forwardersElements}
                        {(position === 'manager' || position === 'chief') && <div
                            className={classes.addDriverForwarder}
                            onClick={onAddForwarderOpen}>
                            + добавить экспедитора
                        </div>}
                    </div>
                </div>
                <div className={classes.allDelta}>
                    <div className={classes.deltaOutDocs}>
                        <div className={classes.deltaTitle}>Дельта без доков</div>
                        <div className={classes.deltaSum}>{sumDeltaOutDocs.toLocaleString()} ₽</div>
                    </div>
                    <div className={classes.deltaWithDocs}>
                        <div className={classes.deltaTitle}>Дельта с доками</div>
                        <div className={classes.deltaSum}>{sumDeltaWithDocs.toLocaleString()} ₽</div>
                    </div>
                </div>
                <div className={classes.commentsBlock}>
                    <div className={`${classes.commentTitle} ${classes.commentTitleManager}`}>
                        Комментарий менеджера:
                    </div>
                    <div className={`${classes.lengthTextManager}`}>
                        <div className={classes.errorText}>
                            {errorTextCM && 'Максимальная длина 165 символов!  '}
                        </div>
                        <div className={`${classes.currentLengthText} ${!editModeCM && classes.displayNone}`}>
                            {formik.values.commentManager.length}
                        </div>
                    </div>
                    {!editModeCM
                        ? (position === 'manager') && <div className={`${classes.editComment} ${classes.editCommentManager}`}
                               onClick={onEditModeCMOn}>редактировать</div>
                        : <div className={`${classes.editComment} ${classes.editCommentManager}`}
                               onClick={onEditModeCMOff}>сохранить</div>}
                    {editModeCM && <div className={classes.cancelEditManager} onClick={onEditModeCMCancel}>Х</div>}
                    <div className={`${classes.comment} ${classes.commentManager}`}>
                        {!editModeCM
                            ? props.commentManager
                            : <TextField
                                id="commentManager"
                                //label="commentManager"
                                multiline
                                fullWidth
                                size={'small'}
                                error={errorTextCM}
                                rowsMax={2}
                                value={formik.values.commentManager}
                                defaultValue={props.commentManager}
                                onChange={formik.handleChange}
                            />}
                    </div>
                    <div className={`${classes.commentTitle} ${classes.commentTitleHead}`}>
                        Комментарий руководителя:
                    </div>
                    <div className={`${classes.lengthTextHead}`}>
                        <div className={classes.errorText}>
                            {errorTextCH && 'Максимальная длина 165 символов!  '}
                        </div>
                        <div className={`${classes.currentLengthText} ${!editModeCH && classes.displayNone}`}>
                            {formik.values.commentHead.length}
                        </div>
                    </div>
                    {!editModeCH
                        ? (position === 'chief') && <div className={`${classes.editComment} ${classes.editCommentHead}`}
                               onClick={onEditModeCHOn}>редактировать</div>
                        : <div className={`${classes.editComment} ${classes.editCommentHead}`}
                               onClick={onEditModeCHOff}>сохранить</div>}
                    {editModeCH && <div className={classes.cancelEditHead} onClick={onEditModeCHCancel}>Х</div>}
                    <div className={`${classes.comment} ${classes.commentHead}`}>
                        {!editModeCH
                            ? props.commentHead
                            : <TextField
                                id="commentHead"
                                //label="Multiline"
                                multiline
                                fullWidth
                                autoFocus={true}
                                size={'small'}
                                error={errorTextCH}
                                rowsMax={2}
                                value={formik.values.commentHead}
                                defaultValue={props.commentHead}
                                onChange={formik.handleChange}
                            />}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Deal;