import React, {useState} from 'react';
import classes from './deliverItem.module.css'
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";


const DeliverItem = ({name, tel, auto, sum, dealId, position, deleteItemFunction, dealDone, managerId, bill, tax, sumTax, openOther, giftName, comment}) => {
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
        deleteItemFunction(dealId, name, sum, managerId)
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
    return (
        <div className={classes.deliverItem} onMouseEnter={onShowActions} onMouseLeave={onHideActions}>
            <div className={`${classes.name} ${name && name.length > 16 && classes.smallText}`}>{!openOther ? name : `${bill === 'nn' ? ' +' : ' -'} ${tax} %` || giftName }</div>
            {(position === 'manager' || position === 'chief') && !dealDone && !openOther
                ? <Tooltip title="Удалить" placement="bottom-end">
                    <div
                        className={`${classes.icon} ${!showActions && classes.noActive}`}
                        onClick={onDelete}
                    >
                        <DeleteIcon fontSize={'small'}/>
                    </div>
                </Tooltip>
                : <div className={classes.emptyIcon}/>}
            {!openOther
                ? <Tooltip title="Информация" placement="bottom-start">
                <div className={`${classes.icon} ${!showActions && classes.noActive}`} onClick={handleClick}>
                    <InfoIcon fontSize={'small'}/>
                </div>
                </Tooltip>
                : <div className={classes.emptyIcon}/>}
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
                    {comment && <div className={classes.popupItems}>{comment}</div>}
                    {tel && <div className={classes.popupItems}>тел. {tel}</div>}
                    {auto && <div className={classes.popupItems}>авто: {auto}</div>}
                </div>

            </Popover>
            <div className={classes.sum}>{!openOther ? sum.toLocaleString() : sumTax.toLocaleString() || sum.toLocaleString()} ₽</div>
        </div>
    )

}

export default DeliverItem;