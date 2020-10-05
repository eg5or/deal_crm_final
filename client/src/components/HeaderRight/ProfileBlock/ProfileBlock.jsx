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
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import Tooltip from "@material-ui/core/Tooltip";
import {NavLink} from "react-router-dom";

const ProfileBlock = ({authBlock: {name, userId, email, position}, countNoDeliveredDeals, countNoDoneDeals, logout}) => {
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

    return (
        <div className={classes.profileBlock}>
            <div className={classes.position}>{positionRU}</div>
            <div className={classes.name}>{name}</div>
            <div className={classes.email}>{email}</div>
            <img className={classes.avatar} src={AvatarDefault}/>
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
                        to='/profile'
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
                    <NavLink
                        to='/profile'
                    >
                        <div className={classes.btnAction}><SpeakerNotesIcon/></div>
                    </NavLink>
                </Tooltip>
            </div>
            <div className={classes.clockBlock}><Clock/></div>
        </div>
    )
}

export default ProfileBlock;