import React from 'react';
import classes from './clientInvoice.module.css'
import {NavLink} from 'react-router-dom';

const ClientInvoice = (props) => {
    return (
        <div className={classes.clientInvoice}>
            <div className={classes.nameCompany}>{props.company}</div>
            <div className={classes.sum}>{props.sum} ₽</div>
        </div>
    )

}

export default ClientInvoice;