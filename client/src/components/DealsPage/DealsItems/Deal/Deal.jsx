import React from 'react';
// styles
import classes from './deal.module.css'
// React components
import StatusBlock from "./StatusBlock";
import DeliverItem from "./DeliverBlock/DeliverItems";
// other
// иконки

// Material UI components
import Switch from "@material-ui/core/Switch";
import {dateNormalize} from "../../../../common/DateNormalize/DateNormalize";
import {NavLink} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddDriver from "./Add/AddDriver";
import AddForwarder from "./Add/AddForwarder";
import Comments from "./Comments/Comments";
import CenterBlock from "./CenterBlock/CenterBlock";
import RightBlock from "./RightBlock/RightBlock";


const Deal = (props) => {
    // вычисляем константы для Сделки:
    // Сумма счетов клиента
    const sumClientInvoices = props.clientInvoices.reduce((s, i) => s = s + Number(i.sum), 0)
    // Сумма счетов поставщиков
    const sumProviderInvoices = props.providerInvoices.reduce((s, i) => s = s + Number(i.sum), 0)
    // Сумма документов
    const sumAllDocs = props.allDocs.reduce((s, i) => s = s + Number(i.sum), 0)
    // -----------------------------------------------------------------------------------------------------------------
    // Сумма Доставки
    const sumAllDrivers = props.drivers.reduce((s, i) => s = s + Number(i.sum), 0)
    const sumAllForwarders = props.forwarders.reduce((s, i) => s = s + Number(i.sum), 0)
    const sumDeliver = sumAllDrivers + sumAllForwarders
    // Сумма дельты без доков
    const sumDeltaOutDocs = sumClientInvoices - sumProviderInvoices - sumDeliver
    // Сумма дельты с доками
    let sumDeltaWithDocs = 0
    if (sumAllDocs !== 0) {
        sumDeltaWithDocs = sumClientInvoices - sumAllDocs - sumDeliver
    }
    // -----------------------------------------------------------------------------------------------------------------
    // переключатель готовности сделки
    const toggleDealDone = (status) => {
        props.toggleStatus(props.id, status) // та же санка что и для переключения статусов
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Доступ
    const position = props.authBlock.position
    const dealDone = props.dealStatus.dealDone
    // -----------------------------------------------------------------------------------------------------------------
    return (
        <div className={classes.deal}>

            <div className={classes.leftBlock}>
                <div
                    className={(position === 'manager' || position === 'chief' || position === 'director') ? classes.titleManager : classes.title}>
                    <div className={classes.dealNumber}>
                        <NavLink to={`dealspage/${props.id}`}>
                            {props.location === 'korolev' ? 'ДК-' : 'ДМ-'}{props.dealNumber}
                        </NavLink>
                    </div>
                    <div className={classes.date}>{dateNormalize(props.date)}</div>
                    <div className={classes.client}>{props.client}</div>
                    {(position === 'manager' || position === 'chief' || position === 'director') &&
                    <div className={classes.doneSwitcher}>
                        <div className={classes.doneSwitcherContainer}>
                            {props.loading.dealDone &&
                            <div className={classes.loadingDealDone}><CircularProgress color="primary" size={20}/>
                            </div>}
                            <div
                                className={`${classes.titleDoneSwitcher} ${!props.dealStatus.dealDone && classes.light_txt} ${props.loading.dealDone && classes.loadingDealDoneText}`}>Готово
                            </div>
                            {(position === 'manager') && <Switch
                                checked={props.dealStatus.dealDone}
                                onChange={() => {
                                    toggleDealDone('dealDone')
                                }}
                                name="checkedA"
                                color="primary"
                            />}
                        </div>
                    </div>}
                    <div className={classes.manager}>{props.manager}</div>
                </div>
                <StatusBlock
                    dealStatus={props.dealStatus}
                    dealId={props.id}
                    managerId={props.managerId}
                    authBlock={props.authBlock}
                    loading={props.loading}
                    // functions
                    toggleStatus={props.toggleStatus}
                />
            </div>
            <CenterBlock allCompanies={props.allCompanies}
                         saveFile={props.saveFile}
                         id={props.id}
                         managerId={props.managerId}
                         sumClientInvoices={sumClientInvoices}
                         sumProviderInvoices={sumProviderInvoices}
                         sumAllDocs={sumAllDocs}
                         clientInvoices={props.clientInvoices}
                         providerInvoices={props.providerInvoices}
                         allDocs={props.allDocs}
                         position={position}
                         dealDone={dealDone}
                         loading={props.loading}
                         deleteFile={props.deleteFile}
            />
            <RightBlock drivers={props.drivers}
                        forwarders={props.forwarders}
                        allDrivers={props.allDrivers}
                        allForwarders={props.allForwarders}
                        id={props.id}
                        managerId={props.managerId}
                        loading={props.loading}
                        position={position}
                        dealDone={dealDone}
                        sumDeliver={sumDeliver}
                        sumDeltaOutDocs={sumDeltaOutDocs}
                        sumDeltaWithDocs={sumDeltaWithDocs}
                        commentHead={props.commentHead}
                        commentManager={props.commentManager}
                        editComment={props.editComment}
                        deleteDriverFromDeal={props.deleteDriverFromDeal}
                        deleteForwarderFromDeal={props.deleteForwarderFromDeal}
                        addDriver={props.addDriver}
                        addForwarder={props.addForwarder}
            />
        </div>
    )

}

export default Deal;