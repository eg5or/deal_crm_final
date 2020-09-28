import React, {useState} from "react";
import classes from './ProfileBlock.module.css'
import Button from "@material-ui/core/Button";

const ProfileBlock = (props) => {

    let onLogout = () => {
        props.logout(props.userId)
    }

    return (
        <div className={classes.profileBlock}>
            <div className={classes.yourLogin}>Ваш логин: {props.email}</div>
            <div className={classes.btnExit}>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={onLogout}
                >Выйти</Button>
            </div>
        </div>
    )
}

export default ProfileBlock;