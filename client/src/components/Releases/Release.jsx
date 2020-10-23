import React, {useState} from 'react';
// styles
import classes from './release.module.css'
import Button from "@material-ui/core/Button";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const Release = ({id, title, text, items, version, date, deleteRelease, name}) => {
    const itemsElements = items.map(i => <li key={i.id}>
        <div className={classes.iconItem}><CheckCircleOutlineIcon/></div>
        <div className={classes.item}>{i.item}</div>
    </li>)
    const onDeleteRelease = () => {
        deleteRelease(id)
    }

    return (
        <div className={classes.release}>
            <div className={classes.titleItem}>{title}</div>
            <div className={classes.textItem}>
                {text}
            </div>
            <div className={classes.items}>
                <ul>
                    {itemsElements}
                </ul>
            </div>
            <div className={classes.version}>
                <b>Версия:</b> {version}
            </div>
            <div className={classes.date}>
                <b>Дата:</b> {date}
            </div>
            {name === 'Егор Сумкин' && <div>
                <Button variant="contained" color="primary" onClick={onDeleteRelease}>
                    Удалить
                </Button>
            </div>}
        </div>
    )
}

export default Release;