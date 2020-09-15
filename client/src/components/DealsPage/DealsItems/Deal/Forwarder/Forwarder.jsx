import React from 'react';
import classes from './forwarder.module.css'
import {NavLink} from 'react-router-dom';

const Forwarder = (props) => {
    return (
        <div className={classes.forwarder}>
            <div className={classes.forwarderName}>{props.forwarderName}</div>
            <div className={classes.sum}>{props.sum} ₽</div>
        </div>
    )

}

export default Forwarder;