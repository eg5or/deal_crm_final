import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Select from "@material-ui/core/Select";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {useFormik} from "formik";

const AddDriver = (props) => {
    // -----------------------------------------------------------------------------------------------------------------
    // Formik для окна ADD FILE
    const formik = useFormik({
        initialValues: {
            driver: '',
            sumDriver: '',
        }
    });
    // -----------------------------------------------------------------------------------------------------------------
    // окно DRIVERS
    // закрыть
    const onAddDriverClose = () => {
        props.setOpenAddDriver(false)
        formik.values.driver = ''
        formik.values.sumDriver = ''
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Ф-я добавления водителя
    const onAddDriver = () => {
        props.addDriver(props.id, formik.values.driver, Number(formik.values.sumDriver), props.managerId)
        onAddDriverClose()
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Добавляем водителей в список для выбора при добавлении
    let optionsDriversElements = props.allDrivers.map(driver => <option value={driver._id}>{driver.name}</option>)
    // -----------------------------------------------------------------------------------------------------------------

    return (
        <>
            <Dialog onClose={onAddDriverClose} aria-labelledby="customized-dialog-title" open={props.openAddDriver}>
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
        </>
    )
}

export default AddDriver;