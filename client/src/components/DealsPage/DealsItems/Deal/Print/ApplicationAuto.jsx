import React from "react";
import classes from "./applicationAuto.module.css"
import {dateNormalize} from "../../../../../common/DateNormalize/DateNormalize";

const ApplicationAuto = ({location, client, date, dealNumber, drivers, forwarders, gifts, address}) => {
    // -----------------------------------------------------------------------------------------------------------------
    const driversElements = drivers.map(d => <li key={d.id}>{d.driverName} - <b>{d.sum.toLocaleString()} руб.</b></li>)
    const forwardersElements = forwarders.map(f => <li
        key={f.id}>{f.forwarderName} - <b>{f.sum.toLocaleString()} руб.</b></li>)
    const giftsElements = gifts.map(g => <li key={g.id}>{g.giftName} - <b>{g.sum.toLocaleString()} руб.</b></li>)
    // -----------------------------------------------------------------------------------------------------------------
    return (
        <>
            <div className={classes.container}>
                <div className={classes.header}>
                    <div className={classes.title}>
                        Сделка {location === 'korolev' ? 'ДК-' : 'ДМ-'}{dealNumber} от {dateNormalize(date)}
                    </div>
                    <div className={classes.client}>
                        {client}
                    </div>
                </div>
                <div className={classes.table}>
                    <div className={classes.drivers}>
                        <div className={classes.titleTable}>Водители:</div>
                        <ul>{driversElements}</ul>
                    </div>
                    <div className={classes.forwarders}>
                        <div className={classes.titleTable}>Экспедиторы:</div>
                        <ul>{forwardersElements}</ul>
                    </div>
                    <div className={classes.gifts}>
                        <div className={classes.titleTable}>Расходы:</div>
                        <ul>{giftsElements}</ul>
                    </div>
                </div>
                <div className={classes.footer}>
                    <div className={classes.address}>Адрес доставки: {address}</div>
                </div>
            </div>
        </>
    )
}

export default ApplicationAuto;