import React, {useRef, useState} from 'react';
// styles
import classes from './deal.module.css'
// React components
import StatusBlock from "./StatusBlock";
// other
// иконки
import PrintIcon from '@material-ui/icons/Print';
// Material UI components
import Switch from "@material-ui/core/Switch";
import {dateNormalize} from "../../../../common/DateNormalize/DateNormalize";
import {NavLink} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import CenterBlock from "./CenterBlock/CenterBlock";
import RightBlock from "./RightBlock/RightBlock";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Document, Page} from "react-pdf/dist/umd/entry.webpack";
import DialogActions from "@material-ui/core/DialogActions";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import PrintItem from "./Print/PrintItem";
import ApplicationAuto from "./Print/ApplicationAuto";
import ComponentToPrint from "./Print/ComponentToPrint";
import ReactToPrint from "react-to-print";
import {editAddress} from "../../../../redux/deals-reducer";


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
    const sumAllTaxes = props.taxes.reduce((s, i) => {
        if (i.bill === 'nn') {
            s = s + +i.sumTax
        } else {
            s = s - +i.sumTax
        }
        return s
    }, 0)
    const sumAllGifts = props.gifts.reduce((s, i) => s = s + Number(i.sum), 0)
    const sumDeliver = sumAllDrivers + sumAllForwarders
    const sumOther = sumAllTaxes + sumAllGifts
    // Сумма дельты без доков
    const sumDeltaOutDocs = sumClientInvoices - sumProviderInvoices - sumDeliver + sumAllTaxes - sumAllGifts
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
    // Open Print
    const [openPrint, setOpenPrint] = useState(false)
    const onOpenPrintDialog = () => {
        setOpenPrint(true)
    }
    const onClosePrintDialog = () => {
        setOpenPrint(false)
    }
    const componentRef = useRef();
    // -----------------------------------------------------------------------------------------------------------------
    return (
        <div className={classes.deal}>

            <div className={classes.leftBlock}>
                <div
                    className={(position === 'manager' || position === 'chief' || position === 'director') ? classes.titleManager : classes.title}>
                    <div className={classes.dealNumber}>
                        <PrintIcon className={classes.print} onClick={onOpenPrintDialog}/>
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
                        gifts={props.gifts}
                        taxes={props.taxes}
                        allDrivers={props.allDrivers}
                        allForwarders={props.allForwarders}
                        id={props.id}
                        managerId={props.managerId}
                        loading={props.loading}
                        position={position}
                        dealDone={dealDone}
                        sumDeliver={sumDeliver}
                        sumOther={sumOther}
                        sumDeltaOutDocs={sumDeltaOutDocs}
                        sumDeltaWithDocs={sumDeltaWithDocs}
                        commentHead={props.commentHead}
                        commentManager={props.commentManager}
                        address={props.address}
                        editComment={props.editComment}
                        editAddress={props.editAddress}
                        deleteDriverFromDeal={props.deleteDriverFromDeal}
                        deleteForwarderFromDeal={props.deleteForwarderFromDeal}
                        deleteGiftFromDeal={props.deleteGiftFromDeal}
                        addDriver={props.addDriver}
                        addForwarder={props.addForwarder}
                        addGift={props.addGift}
            />
            <Dialog
                onClose={onClosePrintDialog}
                open={openPrint}
                maxWidth={"xl"}
            >
                <DialogTitle id="customized-dialog-title" onClose={onClosePrintDialog}>
                    <div className={classes.headerDialogPrint}>
                        <div className={classes.titleDialogPrint}>Сделка {props.location === 'korolev' ? 'ДК-' : 'ДМ-'}{props.dealNumber} от {dateNormalize(props.date)}</div>
                        <div className={classes.buttonPrint}><ReactToPrint
                            trigger={() => <Button
                                variant="contained"
                                color="primary"
                                startIcon={<PrintIcon />}
                            >
                                Печатать
                            </Button>}
                            content={() => componentRef.current}
                        /></div>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <ComponentToPrint ref={componentRef}
                                      location={props.location}
                                      dealNumber={props.dealNumber}
                                      date={props.date}
                                      client={props.client}
                                      drivers={props.drivers}
                                      forwarders={props.forwarders}
                                      gifts={props.gifts}
                                      clientInvoices={props.clientInvoices}
                                      providerInvoices={props.providerInvoices}
                                      address={props.address}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClosePrintDialog} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default Deal;