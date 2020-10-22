import React, {useState} from "react";
import classes from "../deal.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import Comments from "../Comments/Comments";
import DeliverItem from "../DeliverBlock/DeliverItems";
import AddDriver from "../Add/AddDriver";
import AddForwarder from "../Add/AddForwarder";
import AddGift from "../Add/AddGift";
import TextField from "@material-ui/core/TextField";
import {useFormik} from "formik";


const RightBlock = ({
                        drivers,
                        forwarders,
                        gifts,
                        allDrivers,
                        allForwarders,
                        id,
                        managerId,
                        loading,
                        position,
                        dealDone,
                        sumDeliver,
                        sumOther,
                        sumDeltaOutDocs,
                        sumDeltaWithDocs,
                        commentHead,
                        commentManager,
                        address,
                        editComment,
                        editAddress,
                        deleteDriverFromDeal,
                        deleteForwarderFromDeal,
                        deleteGiftFromDeal,
                        addDriver,
                        addForwarder,
                        taxes,
                        addGift
                    }) => {
    // -----------------------------------------------------------------------------------------------------------------
    // окно FORWARDERS
    // локальный стэйт
    const [openAddForwarder, setOpenAddForwarder] = React.useState(false);
    // открыть
    const onAddForwarderOpen = () => {
        setOpenAddForwarder(true)
    }
    // -----------------------------------------------------------------------------------------------------------------
    const [openOther, setOpenOther] = useState(false)
    const onChangeOpenOther = () => {
        setOpenOther(!openOther)
    }
    // -----------------------------------------------------------------------------------------------------------------
    // отрисовка водителей
    let driversElements = drivers.map(d => <DeliverItem key={d.id}
                                                        name={d.driverName}
                                                        tel={d.tel}
                                                        auto={d.auto}
                                                        sum={d.sum}
                                                        dealId={id}
                                                        position={position}
                                                        deleteItemFunction={deleteDriverFromDeal}
                                                        dealDone={dealDone}
                                                        managerId={managerId}
    />)
    // -----------------------------------------------------------------------------------------------------------------
    // отрисовка экспедиторов
    let forwardersElements = forwarders.map(d => <DeliverItem key={d.id}
                                                              name={d.forwarderName}
                                                              tel={d.tel}
                                                              sum={d.sum}
                                                              dealId={id}
                                                              position={position}
                                                              deleteItemFunction={deleteForwarderFromDeal}
                                                              dealDone={dealDone}
                                                              managerId={managerId}
    />)
    // -----------------------------------------------------------------------------------------------------------------
    // отрисовка расходов
    let giftsElements = gifts.map(d => <DeliverItem key={d.id}
                                                    name={d.giftName}
                                                    comment={d.comment}
                                                    sum={d.sum}
                                                    dealId={id}
                                                    position={position}
                                                    deleteItemFunction={deleteGiftFromDeal}
                                                    dealDone={dealDone}
                                                    managerId={managerId}
    />)
    // -----------------------------------------------------------------------------------------------------------------
    // отрисовка налогов
    let taxesElements = taxes.map(d => <DeliverItem key={d.id}
                                                    name={d.forwarderName}
                                                    bill={d.bill}
                                                    tax={d.tax}
                                                    sumTax={d.sumTax}
                                                    dealId={id}
                                                    position={position}
                                                    dealDone={dealDone}
                                                    managerId={managerId}
                                                    openOther={openOther}
    />)
    // окно DRIVERS
    // локальный стэйт
    const [openAddDriver, setOpenAddDriver] = React.useState(false);
    // открыть
    const onAddDriverOpen = () => {
        setOpenAddDriver(true)
    }
    // -----------------------------------------------------------------------------------------------------------------
    // окно GIFTS
    // локальный стэйт
    const [openAddGift, setOpenAddGift] = React.useState(false);
    // открыть
    const onAddGiftOpen = () => {
        setOpenAddGift(true)
    }
    // -----------------------------------------------------------------------------------------------------------------
    // окно address
    // локальный стэйт
    const [openAddress, setOpenAddress] = React.useState(false);
    // открыть
    const onAddressOpen = () => {
        setOpenAddress(!openAddress)
        setAddressEditMode(false)
    }
    // address режим редактирования
    // локальный стэйт
    const [addressEditMode, setAddressEditMode] = React.useState(false);
    // открыть
    const onAddressEditMode = () => {
        setAddressEditMode(true)
    }
    // -----------------------------------------------------------------------------------------------------------------
    const formik = useFormik({
        initialValues: {
            addressText: address,
        }
    });
    const onAddressEdit = () => {
        editAddress(id, formik.values.addressText, managerId)
        setAddressEditMode(false)
    }
    return (
        <>
            {/*----------------------начало-------------------ОКНО ADD DRIVER----------------------------------------*/}
            <AddDriver allDrivers={allDrivers}
                       openAddDriver={openAddDriver}
                       setOpenAddDriver={setOpenAddDriver}
                       addDriver={addDriver}
                       id={id}
                       managerId={managerId}
            />
            {/*----------------------конец--------------------ОКНО ADD DRIVER----------------------------------------*/}
            {/*----------------------начало-------------------ОКНО ADD FORWARDER-------------------------------------*/}
            <AddForwarder allForwarders={allForwarders}
                          openAddForwarder={openAddForwarder}
                          setOpenAddForwarder={setOpenAddForwarder}
                          addForwarder={addForwarder}
                          id={id}
                          managerId={managerId}
            />
            {/*----------------------конец--------------------ОКНО ADD FORWARDER-------------------------------------*/}
            {/*----------------------начало-------------------ОКНО ADD GIFT-------------------------------------*/}
            <AddGift
                openAddGift={openAddGift}
                setOpenAddGift={setOpenAddGift}
                addGift={addGift}
                id={id}
                managerId={managerId}
            />
            {/*----------------------конец--------------------ОКНО ADD GIFT-------------------------------------*/}
            <div className={classes.rightBlock}>
                <div className={classes.deliveryOrOtherHeader}>
                    {openOther
                        ? <>
                            <div className={classes.titleLeft}>Другое</div>
                            <div className={classes.sumLeft}>{sumOther.toLocaleString()} ₽</div>
                        </>
                        : <>
                            <div className={classes.titleLeft}>Доставка</div>
                            <div className={classes.sumLeft}>{sumDeliver.toLocaleString()} ₽</div>
                        </>}
                    {loading.delivery &&
                    <div className={classes.loading}><CircularProgress color="secondary" size={20}/></div>}
                    {openOther
                        ? <div className={classes.btnRight} onClick={onChangeOpenOther}>
                            <div>Доставка</div>
                        </div>
                        : <div className={classes.btnRight} onClick={onChangeOpenOther}>
                            {gifts.length > 0 && <div className={classes.otherIcon}><ErrorOutlineIcon/></div>}
                            <div>Другое</div>
                        </div>}
                </div>
                <div className={classes.deliveryOrOther}>
                    {!openOther
                        ? <div className={classes.delivery}>
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
                        </div>
                        : <div className={classes.other}>
                            <div className={classes.taxes}>
                                <div className={classes.titleTaxesGifts}>Налоги:</div>
                                <div className={classes.taxesItems}>
                                    {taxesElements}
                                </div>
                            </div>
                            <div className={classes.gifts}>
                                <div className={classes.titleTaxesGifts}>Расходы:</div>
                                <div className={classes.giftsItems}>
                                    {giftsElements}
                                    {(position === 'manager' || position === 'chief' || position === 'director') && <div
                                        className={classes.addGift}
                                        onClick={onAddGiftOpen}>
                                        + добавить расход
                                    </div>}
                                </div>
                            </div>
                        </div>}
                </div>
                <div className={classes.addressContainer}>
                    <div className={`${classes.address} ${openAddress && classes.addressOpen}`}>
                        <div className={classes.addressText}>
                            <div className={classes.textareaAddress}>
                                <div className={classes.textareaAddressLabel}>Адрес:</div>
                                {addressEditMode
                                    ? <div className={classes.textareaAddressInput}>
                                        <TextField
                                            id="addressText"
                                            fullWidth
                                            size={'small'}
                                            value={formik.values.addressText}
                                            defaultValue={address}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    : <div className={classes.addressValue}>{address}</div>}
                                {addressEditMode
                                    ? <div className={classes.iconSaveAddress} onClick={onAddressEdit}><SaveIcon fontSize={"small"}/></div>
                                    : (position === 'manager') && <div className={classes.iconSaveAddress} onClick={onAddressEditMode}><EditIcon fontSize={"small"}/></div>}
                            </div>
                        </div>
                        <div className={`${classes.addressLabel} ${address.length > 0 && classes.addressTrue}`}><LocationOnIcon onClick={onAddressOpen} fontSize="small"/>
                        </div>
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
                <Comments loading={loading}
                          editComment={editComment}
                          position={position}
                          commentManager={commentManager}
                          commentHead={commentHead}
                          id={id}
                          managerId={managerId}
                />
            </div>
        </>
    )
}

export default RightBlock;