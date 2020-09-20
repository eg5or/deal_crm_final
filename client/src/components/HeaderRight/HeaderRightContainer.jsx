import React from "react";
import {connect} from 'react-redux';
import {
    clearEmailAndPassword,
    exitAuth,
    newEmailTextAC,
    newPasswordTextAC,
    setAuthUserData
} from '../../redux/auth-reducer';
import {authAPI} from '../../API/api';
import HeaderRight from "./HeaderRight";

class HeaderRightContainer extends React.Component {

    componentDidMount() {


    }

    register = () => {
        let email = this.props.newEmailText
        let password = this.props.newPasswordText
        authAPI.registerToCRM(email, password)
        this.props.clearEmailAndPassword()
    }

    login = () => {
        let email = this.props.newEmailText
        let password = this.props.newPasswordText
        authAPI.loginToCRM(email, password).then(response => {
            let token = response.data.token
            let email = response.data.email
            let userId = response.data.userId
            this.props.setAuthUserData(userId, email, token)
        })
    }


    render() {
        return <HeaderRight {...this.props} register={this.register} login={this.login} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.authBlock.isAuth,
    email: state.authBlock.email,
    id: state.authBlock.userId,
    token: state.authBlock.token,
    newEmailText: state.authBlock.newEmailText,
    newPasswordText: state.authBlock.newPasswordText,
})
export default connect(mapStateToProps, {
    setAuthUserData,
    newEmailTextAC,
    newPasswordTextAC,
    exitAuth,
    clearEmailAndPassword
})(HeaderRightContainer);