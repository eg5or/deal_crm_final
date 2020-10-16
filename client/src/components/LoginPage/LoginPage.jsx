import React from "react";
import AuthBlock from "./AuthBlock/AuthBlock";
import Alert from "@material-ui/lab/Alert";
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {clearEmailAndPassword, login, newEmailTextAC, newPasswordTextAC, register} from "../../redux/auth-reducer";
import classes from './LoginPage.module.css'
import CircularProgress from "@material-ui/core/CircularProgress";

class LoginPage extends React.Component {


    render() {
        if (this.props.isAuth) {
            return <Redirect to={'/dealspage'}/>
        }
        return <div className={classes.authWrapper}>
            <div className={classes.authBlock}>
                <AuthBlock
                    newEmailText={this.props.newEmailText}
                    newPasswordText={this.props.newPasswordText}
                    newEmailTextAC={this.props.newEmailTextAC}
                    newPasswordTextAC={this.props.newPasswordTextAC}
                    clearEmailAndPassword={this.props.clearEmailAndPassword}
                    register={this.props.register}
                    login={this.props.login}
                />
            </div>
            {this.props.responseMessage !== '' &&
            <div className={classes.errorBlock}><Alert severity="error">{this.props.responseMessage}</Alert></div>}
            {this.props.isWaitingLogin && <div className={classes.isWaitingLogin}><CircularProgress color="primary" size={30}/></div>}
        </div>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.authBlock.isAuth,
    newEmailText: state.authBlock.newEmailText,
    newPasswordText: state.authBlock.newPasswordText,
    responseMessage: state.authBlock.responseMessage,
    isWaitingLogin: state.authBlock.isWaitingLogin,
})

export default compose(
    withRouter,
    connect(mapStateToProps, {
        newEmailTextAC,
        newPasswordTextAC,
        clearEmailAndPassword,
        login,
        register,
    })
)(LoginPage)