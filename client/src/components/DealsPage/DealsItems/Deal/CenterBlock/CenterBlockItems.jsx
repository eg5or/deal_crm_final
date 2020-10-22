import React, {useState} from 'react';
import classes from './centerBlockItems.module.css'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import Tooltip from "@material-ui/core/Tooltip";
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack';
import config from '../../../../../config/config.json'
import ButtonGroup from "@material-ui/core/ButtonGroup";

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
    // show Delete and View Areas
    const [deleteShow, setDeleteShow] = React.useState(false);
    const [view, setView] = React.useState(false);
    const onDeleteShow = () => {
        setDeleteShow(true);
        setView(true);
    };
    const onDeleteHide = () => {
        setDeleteShow(false);
        setAskDelete(false);
        setView(false);
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
    // zoom
    const [zoom, setZoom] = React.useState(false);

    const onZoom = () => {
        setZoom(!zoom);
    };
    // -----------------------------------------------------------------------------------
    // delete Item
    const onDeleteFile = () => {
        props.deleteFile(props.dealId, props.fileUrl, props.typeFile, props.managerId)
    }
    // -----------------------------------------------------------------------------------
    // Access
    const position = props.position
    const dealDone = props.dealDone
    // -----------------------------------------------------------------------------------
    // PDF Viewer
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }
    const onPdfPageChangePlus = () => {
        if (pageNumber !== numPages) {
            setPageNumber(pageNumber + 1)
        }
    }
    const onPdfPageChangeMinus = () => {
        if (pageNumber !== 1) {
            setPageNumber(pageNumber - 1)
        }
    }
    // -----------------------------------------------------------------------------------
    return (
        <div>
            <div onClose={handleClose} className={classes.centerBlockItemsContainer} onMouseEnter={onDeleteShow}
                 onMouseLeave={onDeleteHide}>
                {(position === 'manager' || position === 'chief') && !dealDone &&
                <div className={`${classes.deleteBtnArea} ${!deleteShow && classes.hide}`}>
                    {askDelete && <div className={classes.askDelete}>
                        <Tooltip title="Точно удалить" placement="bottom-end">
                            <div className={classes.confirm} onClick={onDeleteFile}>
                                <CheckIcon fontSize={"small"}/>
                            </div>
                        </Tooltip>
                        <Tooltip title="Отмена" placement="bottom-start">
                            <div className={classes.cancel} onClick={onAskDeleteClose}>
                                <CloseIcon fontSize={"small"}/>
                            </div>
                        </Tooltip>
                    </div>}
                    {!askDelete &&
                    <Tooltip title="Удалить" placement="bottom-end">
                        <div className={classes.delete} onClick={onAskDeleteOpen}><DeleteIcon fontSize={"small"}/></div>
                    </Tooltip>}
                </div>}
                <div className={`${classes.viewBtnArea} ${!view && classes.hide}`}>
                    {view && <div className={classes.view}>
                        <div className={classes.confirm} onClick={handleClickOpen}>
                            <ImageSearchIcon fontSize={"large"}/>
                        </div>
                    </div>}
                </div>
                <div className={`${classes.nameCompany} ${props.company.length > 6 && classes.smallFont}`}>
                    {!view && props.company}
                </div>
                <div className={classes.sum}>{Number(props.sum).toLocaleString()} ₽</div>
            </div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth={"xl"}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Счет {props.company} на сумму {props.sum} ₽
                </DialogTitle>
                <DialogContent dividers>
                    {props.fileUrl.split('.')[1] === 'pdf' && <Document
                        file={`${config.baseUrl}/uploads/${props.fileUrl}`}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page
                            pageNumber={pageNumber}
                            width={900}
                        />
                    </Document>}
                    <div className={`${classes.image} ${zoom ? classes.zoom : classes.noZoom}`} onClick={onZoom}>
                        <img alt='' src={`${config.baseUrl}/uploads/${props.fileUrl}`}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    {props.fileUrl.split('.')[1] === 'pdf' && <><ButtonGroup disableElevation variant="contained" color="primary">
                        <Button onClick={onPdfPageChangeMinus}>{'<'}</Button>
                        <Button onClick={onPdfPageChangePlus}>{'>'}</Button>
                    </ButtonGroup>
                    <div>Page {pageNumber} of {numPages}</div></>}
                    <Button onClick={handleClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    )

}

export default CenterBlockItems;