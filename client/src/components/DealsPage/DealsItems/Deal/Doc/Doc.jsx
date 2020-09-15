import React from 'react';
import classes from './doc.module.css'
import {NavLink} from 'react-router-dom';

const Doc = (props) => {
    return (
        <div className={classes.doc}>
            <div className={classes.nameCompany}>{props.company}</div>
            <div className={classes.sum}>{props.sum} ₽</div>
        </div>
    )

}

export default Doc;