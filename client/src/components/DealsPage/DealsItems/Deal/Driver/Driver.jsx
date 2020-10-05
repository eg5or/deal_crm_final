import React, {useState} from 'react';
import classes from './driver.module.css'
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import Popover from "@material-ui/core/Popover";


const Driver = (props) => {
    const [activeDelete, setActiveDelete] = useState(false)
    const onShowActions = () => {
        setActiveDelete(true)
    }
    const onHideActions = () => {
        setActiveDelete(false)
    }
    const onDelete = () => {
        props.deleteDriverFromDeal(props.dealId, props.driverName, props.sum)
    }

    // ---------------------------------------------------------
    // popup window
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
    // ---------------------------------------------------------
    // Доступ
    const position = props.position
    // ---------------------------------------------------------

    return (
        <div className={classes.driver} onMouseEnter={onShowActions} onMouseLeave={onHideActions}>
            <div className={classes.driverName}>{props.driverName}</div>
            {(position === 'manager' || position === 'chief') ? <div
                className={`${classes.icon} ${!activeDelete && classes.noActive}`}
                onClick={onDelete}
            >
                <DeleteIcon fontSize={'small'} />
            </div> : <div className={classes.emptyIcon} />}
            <div className={`${classes.icon} ${!activeDelete && classes.noActive}`} onClick={handleClick}><InfoIcon fontSize={'small'} /></div>
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