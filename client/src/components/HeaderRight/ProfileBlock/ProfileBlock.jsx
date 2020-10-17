import React, {useState} from "react";
import classes from './ProfileBlock.module.css'
import Button from "@material-ui/core/Button";
import Clock from "../../Сlock/Clock";
import AvatarDefault from '../../../assets/images/avatar_default.jpg'
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import TimerIcon from '@material-ui/icons/Timer';
import Tooltip from "@material-ui/core/Tooltip";
import {NavLink} from "react-router-dom";
import NotificationsMiniContainer from "../../Profile/Notifications/NotificationsMiniContainer";
import Badge from "@material-ui/core/Badge";
import withStyles from "@material-ui/core/styles/withStyles";
import RefreshTimer from "./RefreshTimer";

const ProfileBlock = ({
                          authBlock: {name, userId, email, position, avatar},
                          countNoDeliveredDeals,
                          countNoDoneDeals,
                          logout,
                          countNotificationsNoRead,
                          loadingNotificationsNoReadCount,
                          toggleRefresh,
                          onRefresh,
                          offRefresh,
                          loadingDealsPage
                      }, {...props}) => {
    let positionRU = ''
    switch (position) {
        case 'manager':
            positionRU = 'Менеджер'
            break
        case 'chief':
            positionRU = 'Нач.отдела'
            break
        case 'secretary':
            positionRU = 'Офис.менеджер'
            break
        case 'director':
            positionRU = 'Директор'
            break
        default:
            break
    }
    let onLogout = () => {
        logout(userId)
    }

    const [open, setOpen] = React.useState(false);

    const onOpenPopupNotifications = () => {
        setOpen(true);
    };

    const onClosePopupNotifications = () => {
        setOpen(false);
    };

    const StyledBadge = withStyles((theme) => ({
        badge: {
            right: 3,
            top: 7,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
            fontSize: '9px'
        },
    }))(Badge);

    return (
        <div className={classes.profileBlock}>
            <div className={classes.position}>{positionRU}</div>
            <div className={classes.name}>{name}</div>
            <div className={classes.email}>{email}</div>
            <img className={classes.avatar} src={avatar === '' ? 'images/avatars/default.png' : avatar}/>
            <div className={classes.alertStatuses}>
                {countNoDoneDeals === 0
                    ? <Tooltip title="Все сделки отправлены!" placement="bottom-end">
                        <div className={classes.noDone}>
                            <div className={classes.icon}><CheckCircleOutlineIcon fontSize={"small"}/></div>
                        </div>
                    </Tooltip>
                    : <Tooltip title="Не готовые сделки" placement="bottom-end">
                        <div className={`${classes.noDone} ${classes.noDoneOn}`}>
                            <div className={classes.icon}><NotInterestedIcon fontSize={"small"}/></div>
                            <div className={classes.count}>{countNoDoneDeals}</div>
                        </div>
                    </Tooltip>}
                {countNoDeliveredDeals === 0
                    ? <Tooltip title="Всё вывезено!" placement="bottom-start">
                        <div className={classes.noDelivered}>
                            <div className={classes.icon}><CheckCircleOutlineIcon fontSize={"small"}/></div>
                        </div>
                    </Tooltip>
                    : <Tooltip title="Не вывезено" placement="bottom-start">
                        <div className={`${classes.noDelivered} ${classes.noDeliveredOn}`}>
                            <div className={classes.icon}><LocalShippingIcon fontSize={"small"}/></div>
                            <div className={classes.count}>{countNoDeliveredDeals}</div>
                        </div>
                    </Tooltip>}


            </div>
            <div className={classes.btnExit}>
                <Button
                    fullWidth={true}
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={onLogout}
                >Выйти</Button>
            </div>
            <div className={classes.btnActionsBlock}>
                <Tooltip title="Настройки" placement="bottom-end">
                    <NavLink
                        to='/settings'
                    >
                        <div className={classes.btnAction}><SettingsIcon/></div>
                    </NavLink>
                </Tooltip>
                <Tooltip title="Профиль" placement="bottom">
                    <NavLink
                        to='/profile'
                    >
                        <div className={classes.btnAction}><AccountCircleIcon/></div>
                    </NavLink>
                </Tooltip>
                <Tooltip title="Статистика" placement="bottom-start">
                    <NavLink
                        to='/profile'
                    >
                        <div className={classes.btnAction}><MultilineChartIcon/></div>
                    </NavLink>
                </Tooltip>
                <Tooltip title="Уведомления" placement="bottom-start">
                    <a>
                        <div
                            className={`${classes.btnAction} ${countNotificationsNoRead !== 0 && classes.notificationsActive}`}
                            onClick={onOpenPopupNotifications}
                        >
                            {countNotificationsNoRead === 0
                                ? <NotificationsNoneIcon/>
                                : <StyledBadge
                                    badgeContent={countNotificationsNoRead}
                                    max={9}
                                    color="primary"><NotificationsActiveIcon/></StyledBadge>}
                        </div>
                    </a>
                </Tooltip>
                <a>
                    <div className={`${classes.btnAction}`}>
                        {toggleRefresh
                            ? <div className={classes.refreshNotifications} onClick={offRefresh}>
                            <RefreshTimer
                                loadingNotificationsNoReadCount={loadingNotificationsNoReadCount}
                                loadingDealsPage={loadingDealsPage}
                            />
                        </div>
                            : <TimerIcon onClick={onRefresh}/>}
                    </div>
                </a>
                <div
                    onMouseLeave={onClosePopupNotifications}
                    className={`${classes.popupNotifications} ${!open && classes.displayNone}`}
                >
                    <NotificationsMiniContainer/>
                </div>
            </div>
            <div className={classes.clockBlock}><Clock/></div>
        </div>
    )
}

export default ProfileBlock;

