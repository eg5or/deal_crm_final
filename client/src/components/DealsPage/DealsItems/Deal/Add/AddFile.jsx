import React, {useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import BusinessIcon from "@material-ui/icons/Business";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import InputAdornment from "@material-ui/core/InputAdornment";
import classes from "../deal.module.css";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {useFormik} from "formik";

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
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Ф-я загрузки файлов (срабатывает при добавлении файлов)
    const onUploadFile = (e) => {
        if (e.target.files.length) {
            debugger
            props.saveFile(e.target.files[0], props.id, formik.values.company, Number(formik.values.sum.replace(",",".")), props.typeFile, props.managerId)
            onAddFileClose()
            formik.values.company = ''
            formik.values.sum = ''
            props.setTypeFile('')
        }
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Добавляем список компаний в список для выбора при добавлении
    let optionsCompaniesElements = props.allCompanies.map(company => <option value={company._id}>{company.name}</option>)
    // -----------------------------------------------------------------------------------------------------------------
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
        </>
    )
}

export default AddFile;