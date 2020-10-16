import s from "./StatusBlock.module.css";
import React, {useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const StatusBlock = (props) => {
    let approved = props.dealStatus.approved
    let providerPaid = props.dealStatus.providerPaid
    let delivered = props.dealStatus.delivered
    let clientPaid = props.dealStatus.clientPaid
    let docSigned = props.dealStatus.docSigned
    let docCollected = props.dealStatus.docCollected
    // Доступ
    const position = props.authBlock.position

    const toggleStatus = (status) => {
        props.toggleStatus(props.dealId, status, props.managerId)
    }

    return <div className={s.statusBlock}>
        <div className={`${s.approved} ${(position === 'chief') ? s.buttonLeft : s.buttonLeftNoAccess} ${approved && s.active}`} onClick={() => {
            (position === 'chief') ? toggleStatus('approved') : console.log('Ошибка доступа - NO chief')
        }}>
            <div className={s.btnText}>{approved ? 'Одобрено' : 'Не одобрено'}</div>
            {approved && <div className={s.pointDone}/>}
            {props.loading.approved && <div className={s.loading}><CircularProgress color="secondary" size={13}/></div>}
        </div>
        <div className={`${s.providerPaid} ${(position === 'secretary') ? s.buttonLeft : s.buttonLeftNoAccess} ${providerPaid && s.active}`} onClick={() => {
            (position === 'secretary') ? toggleStatus('providerPaid') : console.log('Ошибка доступа - NO secretary')
        }}>
            <div className={s.btnText}>{providerPaid ? 'Закупка оплачена' : 'Закупка не оплачена'}</div>
            {providerPaid && <div className={s.pointDone}/>}
            {props.loading.providerPaid && <div className={s.loading}><CircularProgress color="secondary" size={13}/></div>}
        </div>
        <div className={`${s.delivered} ${s.buttonLeft} ${delivered && s.active}`} onClick={() => {
            toggleStatus('delivered')
        }}>
            <div className={s.btnText}>{delivered ? 'Вывезли' : 'Не вывезли'}</div>
            {delivered && <div className={s.pointDone}/>}
            {props.loading.delivered && <div className={s.loading}><CircularProgress color="secondary" size={13}/></div>}
        </div>
        <div className={`${s.clientPaid} ${(position === 'secretary') ? s.buttonLeft : s.buttonLeftNoAccess} ${clientPaid && s.active}`} onClick={() => {
            (position === 'secretary') ? toggleStatus('clientPaid') : console.log('Ошибка доступа - NO secretary')
        }}>
            <div className={s.btnText}>{clientPaid ? `Клиент оплатил` : 'Клиент не оплатил'}</div>
            {clientPaid && <div className={s.pointDone}/>}
            {props.loading.clientPaid && <div className={s.loading}><CircularProgress color="secondary" size={13}/></div>}
        </div>
        <div className={`${s.docSigned} ${(position === 'manager') ? s.buttonLeft : s.buttonLeftNoAccess} ${docSigned && s.active}`} onClick={() => {
            (position === 'manager') ? toggleStatus('docSigned') : console.log('Ошибка доступа - NO manager')
        }}>
            <div className={s.btnText}> {docSigned ? 'Документы подписаны' : 'Документы не подписаны'}</div>
            {docSigned && <div className={s.pointDone}/>}
            {props.loading.docSigned && <div className={s.loading}><CircularProgress color="secondary" size={13}/></div>}
        </div>
        <div className={`${s.docCollected} ${(position === 'director') ? s.buttonLeft : s.buttonLeftNoAccess} ${docCollected && s.active}`} onClick={() => {
            (position === 'director') ? toggleStatus('docCollected') : console.log('Ошибка доступа - NO director')
        }}>
            <div className={s.btnText}>{docCollected ? 'Документы собраны' : 'Документы не собраны'}</div>
            {docCollected && <div className={s.pointDone}/>}
            {props.loading.docCollected && <div className={s.loading}><CircularProgress color="secondary" size={13}/></div>}
        </div>
    </div>;
}

export default StatusBlock