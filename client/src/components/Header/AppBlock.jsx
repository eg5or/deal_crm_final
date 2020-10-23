import React, {useState} from 'react';
// styles
import Button from "@material-ui/core/Button";
import config from "../../config/config.json";
import Tooltip from "@material-ui/core/Tooltip";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {NavLink} from "react-router-dom";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import classes from './Header.module.css'

const AppBlock = ({title, text, items, date}) => {
    const [openNewRelease, setOpenNewRelease] = useState(false)
    let itemsElements = []
    if (items) {
        itemsElements = items.map(i => <li key={i.id}>
            <div className={classes.iconItem}><CheckCircleOutlineIcon/></div>
            <div className={classes.item}>{i.item}</div>
        </li>)
    }

    return (
        <div className={classes.appBlock}>
            <div className={classes.nameApp}>DealCRM</div>
            <div className={classes.versionApp}>v.{config.appVersion}</div>
            <Tooltip title={`Что нового в версии ${config.appVersion}`}>
                <div className={classes.newRelease} onClick={() => {
                    setOpenNewRelease(true)
                }}><NewReleasesIcon/></div>
            </Tooltip>
            <Dialog onClose={() => {
                setOpenNewRelease(false)
            }} open={openNewRelease} maxWidth={"md"}>
                <DialogTitle onClose={() => {
                    setOpenNewRelease(false)
                }}>
                    Что нового в версии {config.appVersion}
                </DialogTitle>
                <DialogContent dividers>
                    <div className={classes.title}>{title} {date}</div>
                    <div className={classes.text}>{text}</div>
                    <div className={classes.items}>
                        <ul>{itemsElements}</ul>
                    </div>
                    <NavLink onClick={() => {
                        setOpenNewRelease(false)
                    }} to={'/releases'}>Посмотреть предыдущие релизы</NavLink>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenNewRelease(false)
                    }} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AppBlock;