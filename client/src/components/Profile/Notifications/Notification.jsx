import React from 'react';
import classes from './Notifications.module.css'
import {NavLink} from "react-router-dom";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import Tooltip from "@material-ui/core/Tooltip";
import {dateAndTimeNormalize, dateNormalize} from "../../../common/DateNormalize/DateNormalize";

const Notification = ({creator: {name}, deal: {client, date, _id}, message, dt, read}) => {

    return (
        <div className={`${classes.notification} ${read ? classes.read : classes.noRead}`}>
            <div className={classes.dt}>{dateAndTimeNormalize(dt)}</div>
            <div className={classes.row}>
                <div className={classes.creator}>{name}</div>
                <div className={classes.message}>{message}</div>
                <div className={classes.text}>- в сделке -</div>
                <div className={`${classes.dealLink} ${read ? classes.dealLinkRead : classes.dealLinkNoRead}`}>
                    <Tooltip title="Перейти к сделке" placement="bottom-start">
                        <NavLink
                            to={`/dealspage/${_id}`}
                        >
                            Клиент {client} от {dateNormalize(date)}
                        </NavLink>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default Notification;