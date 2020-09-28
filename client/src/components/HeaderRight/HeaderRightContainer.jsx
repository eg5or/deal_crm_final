import React from "react";
import {connect} from 'react-redux';
import {
    setAuthUserData, logout
} from '../../redux/auth-reducer';
import HeaderRight from "./HeaderRight";

class HeaderRightContainer extends React.Component {

    render() {
        return <HeaderRight
            {...this.props}
            logout={this.props.logout}
            userId={this.props.userId}
            email={this.props.email}
        />
    }
}

const mapStateToProps = (state) => ({
    email: state.authBlock.email,
    userId: state.authBlock.userId,
})
export default connect(mapStateToProps, {
    setAuthUserData,
    logout

})(HeaderRightContainer);