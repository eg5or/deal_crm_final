import React from 'react';
import classes from './doc.module.css'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const Doc = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
        console.log(open)
    };

    const onDeleteFile = () => {
        props.deleteFile(props.dealId, props.fileUrl, props.typeFile)
        setOpen(false);
    }

    return (

        <div onClick={handleClickOpen} onClose={handleClose} className={classes.doc}>
            <div className={classes.nameCompany}>{props.company}</div>
            <div className={classes.sum}>{Number(props.sum).toLocaleString()} ₽</div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Документ {props.company} на сумму {props.sum} ₽
                </DialogTitle>
                <DialogContent dividers>
                    <img alt='' src={'C:/Users/eg5or/Documents/Projects/deal_crm_final' + `${props.fileUrl}`} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDeleteFile} color="primary">
                        Удалить
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default Doc;