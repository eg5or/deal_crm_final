import React from 'react';
import classes from './driver.module.css'
import {NavLink} from 'react-router-dom';

const Driver = (props) => {
    return (
        <div className={classes.driver}>
            <div className={classes.driverName}>{props.driverName}</div>
            <div className={classes.sum}>{props.sum} ₽</div>
        </div>
    )

}

export default Driver;