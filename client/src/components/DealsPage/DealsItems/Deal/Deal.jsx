import React, {useState} from 'react';
// styles
import classes from './deal.module.css'
// React components
import CenterBlockItems from './CenterBlock/CenterBlockItems';
import StatusBlock from "./StatusBlock";
import DeliverItem from "./DeliverBlock/DeliverItems";
// other
import {useFormik} from "formik";
// иконки

// Material UI components
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import {dateNormalize} from "../../../../common/DateNormalize/DateNormalize";
import {NavLink} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddFile from "./Add/AddFile";
import AddDriver from "./Add/AddDriver";
import AddForwarder from "./Add/AddForwarder";
import Comments from "./Comments/Comments";


const Deal = (props) => {
    // -----------------------------------------------------------------------------------------------------------------
    // отрисовка водителей
    let driversElements = props.drivers.map(d => <DeliverItem key={d.id}
                                                              name={d.driverName}
                                                              tel={d.tel}
                                                              auto={d.auto}
                                                              sum={d.sum}
                                                              dealId={props.id}
                                                              position={props.authBlock.position}
                                                              deleteItemFunction={props.deleteDriverFromDeal}
                                                              dealDone={props.dealStatus.dealDone}
                                                              managerId={props.managerId}
    />)
    // -----------------------------------------------------------------------------------------------------------------
    // отрисовка экспедиторов
    let forwardersElements = props.forwarders.map(d => <DeliverItem key={d.id}
                                                                    name={d.forwarderName}
                                                                    tel={d.tel}
                                                                    sum={d.sum}
                                                                    dealId={props.id}
                                                                    position={props.authBlock.position}
                                                                    deleteItemFunction={props.deleteForwarderFromDeal}
                                                                    dealDone={props.dealStatus.dealDone}
                                                                    managerId={props.managerId}
    />)
    // -----------------------------------------------------------------------------------------------------------------
    // отрисовка счетов для клиента
    let clientInvoicesElements = props.clientInvoices.map(clientInvoice => <CenterBlockItems
        key={clientInvoice._id}
        company={clientInvoice.company}
        fileUrl={clientInvoice.fileUrl}
        sum={clientInvoice.sum}
        typeFile={clientInvoice.typeFile}
        dealId={props.id}
        deleteFile={props.deleteFile}
        position={props.authBlock.position}
        dealDone={props.dealStatus.dealDone}
        managerId={props.managerId}
    />)
    // -----------------------------------------------------------------------------------------------------------------
    // отрисовка счетов поставщиков
    let providerInvoicesElements = props.providerInvoices.map(providerInvoice => <CenterBlockItems
        key={providerInvoice.id}
        company={providerInvoice.company}
        fileUrl={providerInvoice.fileUrl}
        sum={providerInvoice.sum}
        typeFile={providerInvoice.typeFile}
        dealId={props.id}
        deleteFile={props.deleteFile}
        position={props.authBlock.position}
        dealDone={props.dealStatus.dealDone}
        managerId={props.managerId}
    />)
    // -----------------------------------------------------------------------------------------------------------------
    // отрисовка документов
    let docsElements = props.allDocs.map(doc => <CenterBlockItems key={doc.id}
                                                                  company={doc.company}
                                                                  fileUrl={doc.fileUrl}
                                                                  sum={doc.sum}
                                                                  typeFile={doc.typeFile}
                                                                  dealId={props.id}
                                                                  deleteFile={props.deleteFile}
                                                                  position={props.authBlock.position}
                                                                  dealDone={props.dealStatus.dealDone}
                                                                  managerId={props.managerId}
    />)
    // -----------------------------------------------------------------------------------------------------------------
    // окно DRIVERS
    // локальный стэйт
    const [openAddDriver, setOpenAddDriver] = React.useState(false);
    // открыть
    const onAddDriverOpen = () => {
        setOpenAddDriver(true)
    }
    // -----------------------------------------------------------------------------------------------------------------
    // окно FORWARDERS
    // локальный стэйт
    const [openAddForwarder, setOpenAddForwarder] = React.useState(false);
    // открыть
    const onAddForwarderOpen = () => {
        setOpenAddForwarder(true)
    }
    // -----------------------------------------------------------------------------------------------------------------
    // окно ADD FILE
    // локальный стэйт
    const [openAddFile, setOpenAddFile] = React.useState(false);
    let [typeFile, setTypeFile] = useState('')
    // открыть для ClientInvoices
    const onAddFileOpenCI = () => {
        setOpenAddFile(true)
        setTypeFile('CI')
    }
    // открыть для ProviderInvoices
    const onAddFileOpenPI = () => {
        setOpenAddFile(true)
        setTypeFile('PI')
    }
    // открыть для AllDocs
    const onAddFileOpenDOC = () => {
        setOpenAddFile(true)
        setTypeFile('DOC')
    }
    // -----------------------------------------------------------------------------------------------------------------
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
            {/*----------------------начало-------------------ОКНО ADD FILE------------------------------------------*/}
            <AddFile allCompanies={props.allCompanies}
                     openAddFile={openAddFile}
                     setOpenAddFile={setOpenAddFile}
                     typeFile={typeFile}
                     setTypeFile={setTypeFile}
                     saveFile={props.saveFile}
                     id={props.id}
                     managerId={props.managerId}
            />
            {/*----------------------конец--------------------ОКНО ADD FILE------------------------------------------*/}
            {/*----------------------начало-------------------ОКНО ADD DRIVER----------------------------------------*/}
            <AddDriver allDrivers={props.allDrivers}
                       openAddDriver={openAddDriver}
                       setOpenAddDriver={setOpenAddDriver}
                       addDriver={props.addDriver}
                       id={props.id}
                       managerId={props.managerId}
            />
            {/*----------------------конец--------------------ОКНО ADD DRIVER----------------------------------------*/}
            {/*----------------------начало-------------------ОКНО ADD FORWARDER-------------------------------------*/}
            <AddForwarder allForwarders={props.allForwarders}
                       openAddForwarder={openAddForwarder}
                       setOpenAddForwarder={setOpenAddForwarder}
                       addForwarder={props.addForwarder}
                       id={props.id}
                       managerId={props.managerId}
            />
            {/*----------------------конец--------------------ОКНО ADD FORWARDER-------------------------------------*/}
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
            <div className={classes.centerBlock}>
                <div className={classes.clientInvoices}>
                    <div className={classes.headerClientInvoices}>
                        <div className={classes.titleClientInvoices}>счета клиенту</div>
                        {props.loading.fileCI &&
                        <div className={classes.loading}><CircularProgress color="secondary" size={20}/></div>}
                        <div className={classes.sumClientInvoices}>{sumClientInvoices.toLocaleString()} ₽</div>
                    </div>
                    <div className={classes.docsFilesItems}>
                        {clientInvoicesElements}
                        {(position === 'manager' || position === 'chief') && !dealDone &&
                        <div className={classes.addFile} onClick={onAddFileOpenCI}>
                            <div className={classes.plus}>+</div>
                            <div className={classes.addFileText}>Добавить<br/>файл</div>
                        </div>}
                    </div>
                </div>
                <div className={classes.providerInvoices}>
                    <div className={classes.headerProviderInvoices}>
                        <div className={classes.titleProviderInvoices}>счета поставщиков</div>
                        {props.loading.filePI &&
                        <div className={classes.loading}><CircularProgress color="secondary" size={20}/></div>}
                        <div className={classes.sumProviderInvoices}>{sumProviderInvoices.toLocaleString()} ₽</div>
                    </div>
                    <div className={classes.docsFilesItems}>
                        {providerInvoicesElements}
                        {(position === 'manager' || position === 'chief') && !dealDone &&
                        <div className={classes.addFile} onClick={onAddFileOpenPI}>
                            <div className={classes.plus}>+</div>
                            <div className={classes.addFileText}>Добавить<br/>файл</div>
                        </div>}
                    </div>
                </div>
                <div className={classes.allDocs}>
                    <div className={classes.headerAllDoc}>
                        <div className={classes.titleAllDoc}>документы</div>
                        {props.loading.fileDOC &&
                        <div className={classes.loading}><CircularProgress color="secondary" size={20}/></div>}
                        <div className={classes.sumAllDocs}>{sumAllDocs.toLocaleString()} ₽</div>
                    </div>
                    <div className={classes.docsFilesItems}>
                        {docsElements}
                        {(position === 'manager' || position === 'chief' || position === 'secretary') && <div
                            className={classes.addFile}
                            onClick={onAddFileOpenDOC}
                        >
                            <div className={classes.plus}>+</div>
                            <div className={classes.addFileText}>Добавить<br/>файл</div>
                        </div>}
                    </div>
                </div>
            </div>
            <div className={classes.rightBlock}>
                <div className={classes.titleDeliver}>Доставка</div>
                {props.loading.delivery &&
                <div className={classes.loading}><CircularProgress color="secondary" size={20}/></div>}
                <div className={classes.sumDeliver}>{sumDeliver.toLocaleString()} ₽</div>
                <div className={classes.drivers}>
                    <div className={classes.titleDriversForwarders}>Водители:</div>
                    <div className={classes.driversItems}>
                        {driversElements}
                        {(position === 'manager' || position === 'chief') && <div
                            className={classes.addDriverForwarder}
                            onClick={onAddDriverOpen}>
                            + добавить водителя
                        </div>}
                    </div>
                </div>
                <div className={classes.forwarders}>
                    <div className={classes.titleDriversForwarders}>Экспедиторы:</div>
                    <div className={classes.forwardersItems}>
                        {forwardersElements}
                        {(position === 'manager' || position === 'chief') && <div
                            className={classes.addDriverForwarder}
                            onClick={onAddForwarderOpen}>
                            + добавить экспедитора
                        </div>}
                    </div>
                </div>
                <div className={classes.allDelta}>
                    <div className={classes.deltaOutDocs}>
                        <div className={classes.deltaTitle}>Дельта без доков</div>
                        <div className={classes.deltaSum}>{sumDeltaOutDocs.toLocaleString()} ₽</div>
                    </div>
                    {sumDeltaWithDocs !== 0 && <div className={classes.deltaWithDocs}>
                        <div className={classes.deltaTitle}>Дельта с доками</div>
                        <div className={classes.deltaSum}>{sumDeltaWithDocs.toLocaleString()} ₽</div>
                    </div>}
                </div>
                <Comments loading={props.loading.commentManager}
                          editComment={props.editComment}
                          position={position}
                          commentManager={props.commentManager}
                          commentHead={props.commentHead}
                          id={props.id}
                          managerId={props.managerId}
                />
            </div>
        </div>
    )

}

export default Deal;