import React from "react";
import classes from './HeaderRight.module.css'
import AuthBlock from "./AuthBlock/AuthBlock";
import ProfileBlock from "./ProfileBlock/ProfileBlock";

const HeaderRight = (props) => {
    return <div className={classes.headerRight}>
        <div className={classes.headerRightContainer}>
            {props.isAuth ? <ProfileBlock login={props.email} exitAuth={props.exitAuth}/> : <AuthBlock
                newEmailTextAC={props.newEmailTextAC}
                newPasswordTextAC={props.newPasswordTextAC}
                clearEmailAndPassword={props.clearEmailAndPassword}
                register={props.register}
                login={props.login}
            />}
        </div>
    </div>
}
export default HeaderRight;