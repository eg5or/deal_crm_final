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

const AddGift = (props) => {
    // -----------------------------------------------------------------------------------------------------------------
    // Formik для окна ADD FILE
    const formik = useFormik({
        initialValues: {
            giftName: '',
            comment: '',
            sum: '',
        }
    });
    // -----------------------------------------------------------------------------------------------------------------
    // окно DRIVERS
    // закрыть
    const onAddGiftClose = () => {
        props.setOpenAddGift(false)
        formik.values.giftName = ''
        formik.values.comment = ''
        formik.values.sum = ''
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Ф-я добавления экспедитора
    const onAddGift = () => {
        props.addGift(props.id, formik.values.giftName, formik.values.comment, Number(formik.values.sum), props.managerId)
        onAddGiftClose()
    }
    // -----------------------------------------------------------------------------------------------------------------

    return (
        <>
            <Dialog onClose={onAddGiftClose} aria-labelledby="customized-dialog-title" open={props.openAddGift}>
                <DialogTitle id="customized-dialog-title" onClose={onAddGiftClose}>
                    Выбрать водителя
                </DialogTitle>
                <DialogContent dividers>
                    <div>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AccountCircleIcon/>
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="giftName"
                                    label="Название"
                                    type='text'
                                    name='giftName'
                                    onChange={formik.handleChange}
                                    on
                                    value={formik.values.giftName}
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AccountCircleIcon/>
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="comment"
                                    label="Комментарий"
                                    type='text'
                                    name='comment'
                                    onChange={formik.handleChange}
                                    on
                                    value={formik.values.comment}
                                    size="small"
                                />
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
                                    label="Сумма"
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={onAddGift} color="primary">
                        Добавить
                    </Button>
                    <Button onClick={onAddGiftClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddGift;