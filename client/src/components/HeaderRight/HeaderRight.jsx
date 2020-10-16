import React from "react";
import classes from './HeaderRight.module.css'
import ProfileBlock from "./ProfileBlock/ProfileBlock";

const HeaderRight = (props) => {
    return <div className={classes.headerRight}>
        <div className={classes.headerRightContainer}>
            <ProfileBlock
                authBlock={props.authBlock}
                logout={props.logout}
                countNoDoneDeals={props.countNoDoneDeals}
                countNoDeliveredDeals={props.countNoDeliveredDeals}
                countNotificationsNoRead={props.countNotificationsNoRead}
                toggleRefresh={props.toggleRefresh}
                onRefresh={props.onRefresh}
                offRefresh={props.offRefresh}
                loadingNotificationsNoReadCount={props.loadingNotificationsNoReadCount}
                newNotification={props.newNotification}
                loadingDealsPage={props.loadingDealsPage}
            />
        </div>
    </div>
}
export default HeaderRight;