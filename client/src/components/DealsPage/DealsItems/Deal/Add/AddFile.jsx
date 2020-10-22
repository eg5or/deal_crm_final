import React, {useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import BusinessIcon from "@material-ui/icons/Business";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import InputAdornment from "@material-ui/core/InputAdornment";
import DoneIcon from '@material-ui/icons/Done';
import DescriptionIcon from '@material-ui/icons/Description';
import classes from "./addFile.module.css";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {useFormik} from "formik";
import {useDropzone} from 'react-dropzone'

const AddFile = (props) => {
    // -----------------------------------------------------------------------------------------------------------------
    // Formik для окна ADD FILE
    const formik = useFormik({
        initialValues: {
            company: '',
            sum: ''
        }
    });
    // -----------------------------------------------------------------------------------------------------------------
    // окно ADD FILE
    // закрыть
    const onAddFileClose = () => {
        props.setOpenAddFile(false)
        setError('')
        formik.values.company = ''
        formik.values.sum = ''
        props.setTypeFile('')
        acceptedFiles.shift()
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Ф-я загрузки файлов (срабатывает при добавлении файлов)
    const [error, setError] = useState('')
    const onUploadFile = (e) => {
        if (acceptedFiles.length > 0 && acceptedFiles[0].size > 5*1024*1024) {
            setError('Файл должен быть меньше 5 Мб')
        } else if (acceptedFiles.length < 1) {
            setError(`Добавьте файл!`)
        } else if (formik.values.company.length < 1) {
            setError(`Не заполнено поле "Компания"`)
        } else if (formik.values.sum.length < 1) {
            setError(`Не заполнено поле "Сумма счета"`)
        } else if (fileRejections.length > 0) {
            setError(fileRejections[0].errors[0].message)
        } else {
            props.saveFile(acceptedFiles[0], props.id, formik.values.company, Number(formik.values.sum.replace(",", ".")), props.typeFile, props.managerId)
            onAddFileClose()
        }

    }
    // -----------------------------------------------------------------------------------------------------------------
    // Добавляем список компаний в список для выбора при добавлении
    let optionsCompaniesElements = props.allCompanies.map(company => <option
        value={company._id}>{company.name}</option>)
    // -----------------------------------------------------------------------------------------------------------------
    const {acceptedFiles, fileRejections, getRootProps, getInputProps} = useDropzone({
        accept: 'image/jpeg, image/png, application/pdf',
        maxFiles: 1
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            <div className={classes.fileIcon}><DescriptionIcon fontSize={"small"}  /></div>
            <div className={classes.fileName}>{file.path} - {(file.size/1024/1024).toFixed(3)} Мб</div>
        </li>
    ));

    // console.log(typeof errors[0].message)


    const [dragEnter, setDragEnter] = useState(false)

    return (
        <>
            <Dialog onClose={onAddFileClose} aria-labelledby="customized-dialog-title" open={props.openAddFile}>
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
                                {props.typeFile === 'CI'
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
                                        {optionsCompaniesElements}
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
                    <section className={classes.uploadZone}>
                        <div {...getRootProps({className: `${classes.dropZone} ${dragEnter && classes.dropZoneEnter}`})}
                             onDragOver={() => {setDragEnter(true)}}
                             onDragLeave={() => {setDragEnter(false)}}
                        >
                            <input {...getInputProps()} />
                            <div className={classes.textInDropZone}>{files.length > 0 ? <DoneIcon fontSize={"large"}/> : `Перенесите один файл в эту область`}</div>
                        </div>
                        <aside>
                            <ul>{files}</ul>
                        </aside>
                    </section>
                    {error.length > 0 && <div className={classes.error}>{error}</div>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onUploadFile} variant="contained" color="primary" component="span">
                        Загрузить
                    </Button>
                    <Button onClick={onAddFileClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddFile;