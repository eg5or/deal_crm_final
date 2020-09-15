import React from 'react';
import classes from './providerInvoice.module.css'
import {NavLink} from 'react-router-dom';

const ProviderInvoice = (props) => {
    return (
        <div className={classes.providerInvoice}>
            <div className={classes.nameCompany}>{props.company}</div>
            <div className={classes.sum}>{props.sum} ₽</div>
        </div>
    )

}

export default ProviderInvoice;