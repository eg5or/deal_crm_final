import React from "react";
import {connect} from 'react-redux';
import {logout} from '../../redux/auth-reducer';
import HeaderRight from "./HeaderRight";
import {loadingCountNoDeliveredDeals, loadingCountNoDoneDeals} from "../../redux/profileReducer";
import {
    loadingNotificationsNoReadCount,
    offRefresh,
    onRefresh,
    setToggleNewNotification
} from "../../redux/notificationsReducer";
import notification from '../../assets/sounds/newnotification.mp3';
import {loadingDealsPage} from "../../redux/deals-reducer";

class HeaderRightContainer extends React.Component {
    audio = new Audio(notification)

    componentDidMount() {
        this.props.loadingCountNoDoneDeals()
        this.props.loadingCountNoDeliveredDeals()
        this.props.loadingNotificationsNoReadCount()
    }

    componentWillMount() {
        if (this.props.countNotificationsNoRead !== 0) {
            this.audio.play()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.deals !== this.props.deals) {
            this.props.loadingCountNoDoneDeals()
            this.props.loadingCountNoDeliveredDeals()
            this.props.loadingNotificationsNoReadCount()
        }
        if (prevProps !== this.props) {
            this.props.loadingNotificationsNoReadCount()
            if (prevProps.countNotificationsNoRead !== this.props.countNotificationsNoRead && this.props.countNotificationsNoRead !== 0) {
                this.audio.play()
            }
        }
    }

    render() {
        return <HeaderRight
            {...this.props}
            logout={this.props.logout}
            authBlock={this.props.authBlock}
            countNoDoneDeals={this.props.countNoDoneDeals}
            countNoDeliveredDeals={this.props.countNoDeliveredDeals}
            countNotificationsNoRead={this.props.countNotificationsNoRead}
            toggleRefresh={this.props.toggleRefresh}
            onRefresh={this.props.onRefresh}
            offRefresh={this.props.offRefresh}
            loadingNotificationsNoReadCount={this.props.loadingNotificationsNoReadCount}
            newNotification={this.props.newNotification}
            loadingDealsPage={this.props.loadingDealsPage}
        />
    }
}

const mapStateToProps = (state) => ({
    authBlock: state.authBlock,
    countNoDoneDeals: state.profilePage.countNoDoneDeals,
    countNoDeliveredDeals: state.profilePage.countNoDeliveredDeals,
    countNotificationsNoRead: state.notifications.countNotificationsNoRead,
    deals: state.dealsPage.dealsData,
    notificationsPopup: state.notifications.notificationsPopup,
    notifications: state.notifications.notifications,
    toggleRefresh: state.notifications.toggleRefresh,
    newNotification: state.notifications.newNotification,

})
export default connect(mapStateToProps, {
    logout,
    loadingCountNoDoneDeals,
    loadingCountNoDeliveredDeals,
    loadingNotificationsNoReadCount,
    onRefresh,
    offRefresh,
    setToggleNewNotification,
    loadingDealsPage
})(HeaderRightContainer);