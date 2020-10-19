import React, {useState} from 'react';
// styles
import classes from './settings.module.css'
import Switch from "@material-ui/core/Switch";
import {changePosition} from "../../redux/settings-reducer";

const Settings = ({profileData: {position, positionTrue}, changePosition, managerMode}) => {
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
    const handleChange = () => {
        changePosition()
    }
    return (
        <div className={classes.settingsPage}>
            <div className={classes.title}><h1>Настройки</h1></div>
            <div className={classes.settings}>
                {positionTrue === 'chief' || positionTrue === 'director' ? <div className={classes.managerMode}>
                    <div className={classes.label}>Режим менеджера: </div>
                    <div className={classes.switcher}>
                        <Switch
                            checked={managerMode}
                            onChange={handleChange}
                            color="primary"
                            name="managerMode"
                        />
                    </div>
                    <div className={classes.value}>{managerMode ? 'Включен' : 'Выключен'}</div>
                </div> : <div/>}
            </div>



        </div>
    )
}

export default Settings;