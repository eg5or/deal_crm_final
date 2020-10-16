import React from 'react';
import {connect} from "react-redux";
import Notification from "./Notification";
import {
    loadingAllNotificationsData,
    loadingNewNotificationsData,
    setReadAllNotifications
} from "../../../redux/notificationsReducer";
import classes from "./Notifications.module.css";
import Pagination from "@material-ui/lab/Pagination";
import {Link, withRouter} from 'react-router-dom';
import {compose} from "redux";
import PaginationItem from "@material-ui/lab/PaginationItem";
import Preloader from "../../../common/Preloader/Preloader";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

class NotificationsContainer extends React.Component {
    componentDidMount() {
        let page = this.props.match.params.page;
        if (!page) {
            this.props.loadingAllNotificationsData(1)
        } else {
            this.props.loadingAllNotificationsData(page)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.page !== this.props.match.params.page) {
            let page = this.props.match.params.page;
            if (!page) {
                this.props.loadingAllNotificationsData(1)
            } else {
                this.props.loadingAllNotificationsData(page)
            }
        }

    }

    onSetAllRead = () => {
        let page = this.props.match.params.page;
        if (!page) {
            this.props.setReadAllNotifications(1)
        } else {
            this.props.setReadAllNotifications(page)
        }
    }

    render() {
        let sortedNotifications = this.props.notifications
        sortedNotifications.sort((prev, next) => {
            if (prev.dt > next.dt) return -1;
            if (prev.dt > next.dt) return 1;
        })

        const notificationsElements = sortedNotifications.map(n => <Notification key={n.id}
                                                                                 creator={n.creator}
                                                                                 deal={n.deal}
                                                                                 message={n.message}
                                                                                 dt={n.dt}
                                                                                 read={n.read}
        />)

        return <div className={classes.notificationsPage}>

            <div className={classes.titleHeader}>
                <div className={classes.title}><h1>Уведомления</h1></div>
                <div className={classes.readAll}>
                    <Button onClick={this.onSetAllRead} variant="outlined" color="primary">Прочитать все уведомления</Button>
                </div>
            </div>
            <div className={classes.paginationContainer}>
                <div className={classes.pagination}>
                    <Pagination
                        page={this.props.notificationsCurrentPage ? this.props.notificationsCurrentPage : 1}
                        count={this.props.notificationsPagesCount}
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`/notifications/${item.page === 1 ? '' : `${item.page}`}`}
                                {...item}
                            />
                        )}
                    />
                </div>
                {this.props.isFetching ? <div className={classes.progress}>
                    <CircularProgress
                        size={25}
                        thickness={7}
                    />
                </div> : null}
            </div>
            <div className={`${classes.table}`}>
                {notificationsElements}
            </div>
        </div>
    }
}

const mapStateToProps = (state) => ({
    notifications: state.notifications.notifications,
    notificationsPagesCount: state.notifications.notificationsPagesCount,
    notificationsCurrentPage: state.notifications.notificationsCurrentPage,
    isFetching: state.notifications.isFetching,
})


export default compose(
    connect(mapStateToProps, {
        loadingAllNotificationsData,
        loadingNewNotificationsData,
        setReadAllNotifications
    }),
    withRouter,
    // WithAuthRedirect
)(NotificationsContainer)