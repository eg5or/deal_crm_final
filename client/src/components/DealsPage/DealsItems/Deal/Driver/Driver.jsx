import React, {useState} from 'react';
import classes from './driver.module.css'
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import Popover from "@material-ui/core/Popover";


const Driver = (props) => {
    // -----------------------------------------------------------------------------------------------
    // show Actions
    const [showActions, setShowActions] = useState(false)
    const onShowActions = () => {
        setShowActions(true)
    }
    const onHideActions = () => {
        setShowActions(false)
    }
    // -----------------------------------------------------------------------------------------------
    // delete Item
    const onDelete = () => {
        props.deleteDriverFromDeal(props.dealId, props.driverName, props.sum)
    }
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
    // Access
    const position = props.position
    const dealDone = props.dealDone
    // -----------------------------------------------------------------------------------------------
    return (
        <div className={classes.deliverItem} onMouseEnter={onShowActions} onMouseLeave={onHideActions}>
            <div className={classes.name}>{props.driverName}</div>
            {(position === 'manager' || position === 'chief') && !dealDone ? <div
                className={`${classes.icon} ${!showActions && classes.noActive}`}
                onClick={onDelete}
            >
                <DeleteIcon fontSize={'small'} />
            </div> : <div className={classes.emptyIcon} />}
            <div className={`${classes.icon} ${!showActions && classes.noActive}`} onClick={handleClick}><InfoIcon fontSize={'small'} /></div>
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
            <div className={classes.sum}>{props.sum.toLocaleString()} ₽</div>
        </div>
    )

}

export default Driver;