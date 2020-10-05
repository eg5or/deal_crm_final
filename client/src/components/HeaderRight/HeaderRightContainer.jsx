import React from "react";
import {connect} from 'react-redux';
import {
    logout
} from '../../redux/auth-reducer';
import HeaderRight from "./HeaderRight";
import {loadingCountNoDeliveredDeals, loadingCountNoDoneDeals} from "../../redux/profileReducer";
import Profile from "../Profile/Profile";

class HeaderRightContainer extends React.Component {
    componentDidMount() {
        // this.props.loadingCountNoDoneDeals()
        // this.props.loadingCountNoDeliveredDeals()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.props.loadingCountNoDoneDeals()
            this.props.loadingCountNoDeliveredDeals()
        }
    }

    render() {
        return <HeaderRight
            {...this.props}
            logout={this.props.logout}
            authBlock={this.props.authBlock}
            countNoDoneDeals={this.props.countNoDoneDeals}
            countNoDeliveredDeals={this.props.countNoDeliveredDeals}
        />
    }
}

const mapStateToProps = (state) => ({
    authBlock: state.authBlock,
    countNoDoneDeals: state.profilePage.countNoDoneDeals,
    countNoDeliveredDeals: state.profilePage.countNoDeliveredDeals,
    deals: state.dealsPage.dealsData
})
export default connect(mapStateToProps, {
    logout,
    loadingCountNoDoneDeals,
    loadingCountNoDeliveredDeals
})(HeaderRightContainer);