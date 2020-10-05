import React from 'react';
import classes from './centerBlockItems.module.css'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const CenterBlockItems = (props) => {
    // -----------------------------------------------------------------------------------
    // open dialog with Image
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // -----------------------------------------------------------------------------------
    // show Delete Area
    const [deleteShow, setDeleteShow] = React.useState(false);
    const onDeleteShow = () => {
        setDeleteShow(true);
    };
    const onDeleteHide = () => {
        setDeleteShow(false);
        setAskDelete(false);
    };
    // -----------------------------------------------------------------------------------
    // show Confirm Delete Area
    const [askDelete, setAskDelete] = React.useState(false);
    const onAskDeleteOpen = () => {
        setAskDelete(true);
    };
    const onAskDeleteClose = () => {
        setAskDelete(false);
    };
    // -----------------------------------------------------------------------------------
    // delete Item
    const onDeleteFile = () => {
        props.deleteFile(props.dealId, props.fileUrl, props.typeFile)
    }
    // -----------------------------------------------------------------------------------
    return (
        <div>
            <div onClose={handleClose} className={classes.centerBlockItemsContainer} onMouseEnter={onDeleteShow} onMouseLeave={onDeleteHide}> {/*onClick={handleClickOpen}*/}
                <div className={`${classes.deleteBtnArea} ${!deleteShow && classes.hideDeleteArea}`}>
                    {askDelete && <div className={classes.askDelete}>
                        <div className={classes.confirm} onClick={onDeleteFile}><CheckIcon fontSize={"small"} /></div>
                        <div className={classes.cancel} onClick={onAskDeleteClose}><CloseIcon fontSize={"small"} /></div>
                    </div>}
                    {!askDelete && <div className={classes.delete} onClick={onAskDeleteOpen}><DeleteIcon fontSize={"small"} /></div>}
                </div>
                <div className={classes.nameCompany}>{props.company}</div>
                <div className={classes.sum}>{Number(props.sum).toLocaleString()} ₽</div>
            </div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Счет {props.company} на сумму {props.sum} ₽
                </DialogTitle>
                <DialogContent dividers>
                    <img alt='' src={'C:/Users/eg5or/Documents/Projects/deal_crm_final' + `${props.fileUrl}`}/>
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

export default CenterBlockItems;