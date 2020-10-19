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

const AddForwarder = (props) => {
    // -----------------------------------------------------------------------------------------------------------------
    // Formik для окна ADD FILE
    const formik = useFormik({
        initialValues: {
            forwarder: '',
            sumForwarder: '',
        }
    });
    // -----------------------------------------------------------------------------------------------------------------
    // окно DRIVERS
    // закрыть
    const onAddForwarderClose = () => {
        props.setOpenAddForwarder(false)
        formik.values.forwarder = ''
        formik.values.sumForwarder = ''
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Ф-я добавления экспедитора
    const onAddForwarder = () => {
        props.addForwarder(props.id, formik.values.forwarder, Number(formik.values.sumForwarder), props.managerId)
        onAddForwarderClose()
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Добавляем экспедиторов в список для выбора при добавлении
    let optionsForwardersElements = props.allForwarders.map(forwarder => <option
        value={forwarder._id}>{forwarder.name}</option>)
    // -----------------------------------------------------------------------------------------------------------------

    return (
        <>
            <Dialog onClose={onAddForwarderClose} aria-labelledby="customized-dialog-title" open={props.openAddForwarder}>
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
        </>
    )
}

export default AddForwarder;