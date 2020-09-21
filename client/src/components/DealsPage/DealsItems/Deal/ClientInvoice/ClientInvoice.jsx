import React from 'react';
import classes from './clientInvoice.module.css'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const ClientInvoice = (props) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };
    console.log(open)
    return (

        <div onClick={handleClickOpen} onClose={handleClose} className={classes.clientInvoice}>
            <div className={classes.nameCompany}>{props.company}</div>
            <div className={classes.sum}>{props.sum} ₽</div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Счет {props.company} на сумму {props.sum} ₽
                </DialogTitle>
                <DialogContent dividers>
                    Фото счета
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => {
                        handleClose()
                    }} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default ClientInvoice;