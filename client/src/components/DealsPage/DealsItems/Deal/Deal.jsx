import React from 'react';
import classes from './deal.module.css'
import {NavLink} from 'react-router-dom';
import Driver from './Driver/Driver';
import Forwarder from './Forwarder/Forwarder';
import ClientInvoice from './ClientInvoice/ClientInvoice';
import ProviderInvoice from './ProviderInvoice/ProviderInvoice';
import Doc from './Doc/Doc';

const Deal = (props) => {

    let driversElements = props.deliver.drivers.map(d => <Driver key={d.id}
                                                               driverName={d.driverName}
                                                               sum={d.sum}
    />)

    let forwardersElements = props.deliver.forwarders.map(d => <Forwarder key={d.id}
                                                                 forwarderName={d.forwarderName}
                                                                 sum={d.sum}
    />)

    let clientInvoicesElements = props.clientInvoices.map(d => <ClientInvoice key={d.id}
                                                                                        company={d.company}
                                                                                        fileUrl={d.fileUrl}
                                                                                        sum={d.sum}
    />)
    let providerInvoicesElements = props.providerInvoices.map(d => <ProviderInvoice key={d.id}
                                                                                              company={d.company}
                                                                                              fileUrl={d.fileUrl}
                                                                                              sum={d.sum}
    />)

    let docsElements = props.allDocs.map(d => <Doc key={d.id}
                                                             company={d.company}
                                                             fileUrl={d.fileUrl}
                                                             sum={d.sum}
    />)

    return (
        <div className={classes.deal}>
            <div className={classes.leftBlock}>
                <div className={classes.title}>
                    <div className={classes.date}>{props.date}</div>
                    <div className={classes.client}>{props.client}</div>
                    <div className={classes.manager}>{props.manager}</div>
                </div>
                <div className={`${classes.approved} ${classes.buttonLeft}`}>Одобрено</div>
                <div className={`${classes.providerPaid} ${classes.buttonLeft}`}>Закупка не оплачена</div>
                <div className={`${classes.delivered} ${classes.buttonLeft}`}>Не вывезли</div>
                <div className={`${classes.clientPaid} ${classes.buttonLeft}`}>Клиент не оплатил</div>
                <div className={`${classes.docSigned} ${classes.buttonLeft}`}>Документы не подписаны</div>
                <div className={`${classes.docCollected} ${classes.buttonLeft}`}>Документы не собраны</div>
            </div>
            <div className={classes.centerBlock}>
                <div className={classes.clientInvoices}>
                    <div className={classes.headerClientInvoices}>
                        <div className={classes.titleClientInvoices}>счета клиенту</div>
                        <div className={classes.sumClientInvoices}>{props.sumClientInvoices} руб.</div>
                    </div>
                    <div className={`${classes.clientInvoicesItems} ${classes.docsFilesItems}`}>
                        {clientInvoicesElements}
                        <div className={classes.addFile}>
                            <div className={classes.plus}>+</div>
                            <div className={classes.addFileText}>Добавить<br />файл</div>
                        </div>
                    </div>
                </div>
                <div className={classes.providerInvoices}>
                    <div className={classes.headerProviderInvoices}>
                        <div className={classes.titleProviderInvoices}>счета поставщиков</div>
                        <div className={classes.sumProviderInvoices}>{props.sumProviderInvoices} руб.</div>
                    </div>
                    <div className={`${classes.providerInvoicesItems} ${classes.docsFilesItems}`}>
                        {providerInvoicesElements}
                        <div className={classes.addFile}>
                            <div className={classes.plus}>+</div>
                            <div className={classes.addFileText}>Добавить<br />файл</div>
                        </div>
                    </div>
                </div>
                <div className={classes.allDocs}>
                    <div className={classes.headerAllDoc}>
                        <div className={classes.titleAllDoc}>документы</div>
                        <div className={classes.delta}>{props.delta} руб.</div>
                    </div>
                    <div className={`${classes.docsItems} ${classes.docsFilesItems}`}>
                        {docsElements}
                        <div className={classes.addFile}>
                            <div className={classes.plus}>+</div>
                            <div className={classes.addFileText}>Добавить<br />файл</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.rightBlock}>
                <div className={classes.titleDeliver}>Доставка</div>
                <div className={classes.sumDeliver}>29 400 руб.</div>
                <div className={classes.drivers}>
                    <div className={classes.titleDriversForwarders}>Водители:</div>
                    <div className={classes.driversItems}>
                        {driversElements}
                        <div className={classes.addDriverForwarder}>+ добавить водителя</div>
                    </div>
                </div>
                <div className={classes.forwarders}>
                    <div className={classes.titleDriversForwarders}>Экспедиторы:</div>
                    <div className={classes.forwardersItems}>
                        {forwardersElements}
                        <div className={classes.addDriverForwarder}>+ добавить экспедитора</div>
                    </div>
                </div>
                <div className={classes.commentsBlock}>
                    <div className={`${classes.commentTitle} ${classes.commentTitleManager}`}>Комментарий менеджера:</div>
                    <div className={`${classes.editComment} ${classes.editCommentManager}`}>редактировать</div>
                    <div className={`${classes.comment} ${classes.commentManager}`}>{props.commentManager}</div>
                    <div className={`${classes.commentTitle} ${classes.commentTitleHead}`}>Комментарий руководителя:</div>
                    <div className={`${classes.editComment} ${classes.editCommentHead}`}>редактировать</div>
                    <div className={`${classes.comment} ${classes.commentHead}`}>{props.commentHead}</div>
                </div>
            </div>
        </div>
    )

}

export default Deal;