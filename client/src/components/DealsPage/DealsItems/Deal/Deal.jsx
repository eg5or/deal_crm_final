import React, {useState} from 'react';
import classes from './deal.module.css'
import {NavLink} from 'react-router-dom';
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
import {saveFile} from "../../../../redux/deals-reducer";
import {useFormik} from "formik";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BusinessIcon from '@material-ui/icons/Business';
import Grid from "@material-ui/core/Grid";

const Deal = (props) => {

    let driversElements = props.deliver.drivers.map(d => <Driver key={d.id}
                                                                 driverName={d.driverName}
                                                                 sum={d.sum}
    />)

    let forwardersElements = props.deliver.forwarders.map(d => <Forwarder key={d.id}
                                                                          forwarderName={d.forwarderName}
                                                                          sum={d.sum}
    />)

    let clientInvoicesElements = props.clientInvoices.map(clientInvoice => <ClientInvoice
                                                                                key={clientInvoice._id}
                                                                                company={clientInvoice.company}
                                                                                sum={clientInvoice.sum}
                                                                                toggleDialog={clientInvoice.toggleDialog}
                                                                                openDialog={clientInvoice.openDialog}
                                                                                closeDialog={clientInvoice.closeDialog}
    />)

    let providerInvoicesElements = props.providerInvoices.map(d => <ProviderInvoice key={d.id}
                                                                                    company={d.company}
                                                                                    fileUrl={d.fileUrl}
                                                                                    sum={d.sum}
    />)

    let docsElements = props.allDocs.map(d => <Doc key={d.id}
                                                   company={d.company}
                                                   fileUrl={d.fileUrl}
                                                   sum={d.sum}
    />)

    let convertedDate = new Date(Date.parse(props.date))
    let dateString = convertedDate.getDate() + '.' + (convertedDate.getMonth() + 1) + '.' + convertedDate.getFullYear()

    const [open, setOpen] = React.useState(false);
    const [typeFile, setTypeFile] = useState('')

    const onAddFileOpenCI = () => {
        setOpen(true)
        setTypeFile('CI')
    }

    const onAddFileOpenPI = () => {
        setOpen(true)
        setTypeFile('PI')
    }

    const onAddFileOpenDOC = () => {
        setOpen(true)
        setTypeFile('DOC')
    }

    const onAddFileClose = () => {
        setOpen(false)
    }

    const formik = useFormik({
        initialValues: {
            company: '',
            sum: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    console.log(formik.values.company, Number(formik.values.sum))

    const onUploadFile = (e) => {
        if (e.target.files.length) {
            props.saveFile(e.target.files[0], props.id, formik.values.company, Number(formik.values.sum), typeFile)
            onAddFileClose()
        }
    }
    console.log(typeFile)
    return (
        <div className={classes.deal}>
            <Dialog onClose={onAddFileClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={onAddFileClose}>
                    Загрузить файл
                </DialogTitle>
                <DialogContent dividers>
                    <div>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <BusinessIcon />
                            </Grid>
                            <Grid item>
                                { typeFile === 'CI'
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
                                <MonetizationOnIcon />
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
                        <input className={classes.inputUpload} type={'file'} id="contained-button-file" onChange={onUploadFile}/>
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
                        <div className={classes.sumClientInvoices}>{props.sumClientInvoices} руб.</div>
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
                        <div className={classes.sumProviderInvoices}>{props.sumProviderInvoices} руб.</div>
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
                        <div className={classes.delta}>{props.delta} руб.</div>
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
                <div className={classes.sumDeliver}>29 400 руб.</div>
                <div className={classes.drivers}>
                    <div className={classes.titleDriversForwarders}>Водители:</div>
                    <div className={classes.driversItems}>
                        {driversElements}
                        <div className={classes.addDriverForwarder}>+ добавить водителя</div>
                    </div>
                </div>
                <div className={classes.forwarders}>
                    <div className={classes.titleDriversForwarders}>Экспедиторы:</div>
                    <div className={classes.forwardersItems}>
                        {forwardersElements}
                        <div className={classes.addDriverForwarder}>+ добавить экспедитора</div>
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