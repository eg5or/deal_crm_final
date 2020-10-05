import React from "react";
import {connect} from 'react-redux';
import {
    logout
} from '../../redux/auth-reducer';
import HeaderRight from "./HeaderRight";

class HeaderRightContainer extends React.Component {

    render() {
        return <HeaderRight
            {...this.props}
            logout={this.props.logout}
            authBlock={this.props.authBlock}
        />
    }
}

const mapStateToProps = (state) => ({
    authBlock: state.authBlock
})
export default connect(mapStateToProps, {
    logout
})(HeaderRightContainer);