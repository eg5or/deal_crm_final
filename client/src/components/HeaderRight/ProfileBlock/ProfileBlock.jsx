import React, {useState} from "react";
import classes from './ProfileBlock.module.css'
import Button from "@material-ui/core/Button";
import Clock from "../../Сlock/Clock";
import AvatarDefault from '../../../assets/images/avatar_default.jpg'
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import Tooltip from "@material-ui/core/Tooltip";
import {NavLink} from "react-router-dom";

const ProfileBlock = (props) => {
    const {name, userId, email, position} = props.authBlock
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
        props.logout(userId)
    }

    return (
        <div className={classes.profileBlock}>
            <div className={classes.position}>{positionRU}</div>
            <div className={classes.name}>{name}</div>
            <div className={classes.email}>{email}</div>
            <img className={classes.avatar} src={AvatarDefault}/>
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
            </div>
            <div className={classes.clockBlock}><Clock/></div>
        </div>
    )
}

export default ProfileBlock;