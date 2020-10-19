import React from "react";
import classes from "../deal.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Comments from "../Comments/Comments";
import DeliverItem from "../DeliverBlock/DeliverItems";
import AddDriver from "../Add/AddDriver";
import AddForwarder from "../Add/AddForwarder";


const RightBlock = ({
                        drivers,
                        forwarders,
                        allDrivers,
                        allForwarders,
                        id,
                        managerId,
                        loading,
                        position,
                        dealDone,
                        sumDeliver,
                        sumDeltaOutDocs,
                        sumDeltaWithDocs,
                        commentHead,
                        commentManager,
                        editComment,
                        deleteDriverFromDeal,
                        deleteForwarderFromDeal,
                        addDriver,
                        addForwarder
}) => {
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
            <div className={classes.rightBlock}>
                <div className={classes.titleDeliver}>Доставка</div>
                {loading.delivery &&
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
                <Comments loading={loading.commentManager}
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