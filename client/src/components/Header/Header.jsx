import React, {useState} from "react";
import classes from './Header.module.css'
import config from '../../config/config.json'
import {withRouter} from 'react-router-dom';
import {compose} from "redux";
import {connect} from "react-redux";
import {loadingLastReleaseData} from "../../redux/releases-reducer";
import AppBlock from "./AppBlock";


class Header extends React.Component {
    componentDidMount() {
        this.props.loadingLastReleaseData(config.appVersion)
    }

    render() {
        return (
            <header className={classes.header}>
                <div className={classes.headerContainer}>
                    <div className={classes.logo}>
                        <img alt='' src={`${config.baseUrl}/images/logo_min_black.png`}/>
                    </div>
                    <AppBlock
                        title={this.props.lastReleaseData.title}
                        text={this.props.lastReleaseData.text}
                        items={this.props.lastReleaseData.items}
                        date={this.props.lastReleaseData.date}
                    />
                </div>
            </header>
        )
    }
}

export default Header;

// Local State
const mapStateToProps = (state) => {
    return {
        lastReleaseData: state.releases.lastReleaseData
    }
}

export const HeaderContainer = compose(
    connect(mapStateToProps, {
        loadingLastReleaseData,
    }),
    withRouter,
    // WithAuthRedirect
)(Header)