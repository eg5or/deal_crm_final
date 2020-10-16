import React from 'react';
import {connect} from "react-redux";
import {
    loadingNewNotificationsData,
    loadingNotificationsForPopupData, setReadAllNotificationsMini
} from "../../../redux/notificationsReducer";
import classes from "./NotificationsMini.module.css";
import NotificationMini from "./NotificationMini";
import {NavLink} from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from "@material-ui/core/Tooltip";

class NotificationsContainer extends React.Component {
    componentDidMount() {
        this.props.loadingNotificationsForPopupData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.countNotificationsNoRead !== this.props.countNotificationsNoRead) {
            this.props.loadingNotificationsForPopupData()
        }
    }

    onSetAllRead = () => {
        this.props.setReadAllNotificationsMini()
    }

    render() {
        let sortedNotifications = this.props.notificationsPopup
        sortedNotifications.sort((prev, next) => {
            if (prev.dt > next.dt) return -1;
            if (prev.dt > next.dt) return 1;
        })

        const notificationsElements = sortedNotifications.map(n => <NotificationMini key={n.id}
                                                                                     creator={n.creator}
                                                                                     deal={n.deal}
                                                                                     message={n.message}
                                                                                     dt={n.dt}
                                                                                     read={n.read}
        />)

        return <div className={classes.notificationsPage}>
            <div className={classes.header}>
                <div className={classes.title}>Уведомления</div>
                <div className={classes.readAll} onClick={this.onSetAllRead}>
                    <Tooltip title="Прочитать все уведомления" placement="top">
                        <VisibilityIcon/>
                    </Tooltip>
                </div>
                <div className={classes.viewMore}>
                    <NavLink
                        to={`/notifications`}
                    >
                        Посмотреть все уведомления ...
                    </NavLink>
                </div>
            </div>
            <div className={classes.table}>
                {notificationsElements}
            </div>

        </div>
    }
}

const mapStateToProps = (state) => ({
    notificationsPopup: state.notifications.notificationsPopup,
    countNotificationsNoRead: state.notifications.countNotificationsNoRead
})

export default connect(mapStateToProps, {
    loadingNotificationsForPopupData,
    loadingNewNotificationsData,
    setReadAllNotificationsMini
})(NotificationsContainer);