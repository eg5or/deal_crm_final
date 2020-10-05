import React, {useState} from 'react';
import classes from './driver.module.css'
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import Popover from "@material-ui/core/Popover";


const PopupInfo = (props) => {
    // -----------------------------------------------------------------------------------------------
    // popup window ItemInfo
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        onHideActions()
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    // -----------------------------------------------------------------------------------------------
    return (
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div className={classes.popup}>
                    <div className={classes.popupItems}>тел. {props.tel}</div>
                    <div className={classes.popupItems}>авто: {props.auto}</div>
                </div>
            </Popover>
    )

}

export default PopupInfo;