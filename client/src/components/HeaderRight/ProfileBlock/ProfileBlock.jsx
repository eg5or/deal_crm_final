import React, {useState} from "react";
import classes from './ProfileBlock.module.css'
import Button from "@material-ui/core/Button";

const ProfileBlock = (props) => {

    let onExitAuth = () => {
        props.exitAuth()
    }

    return (
        <div className={classes.profileBlock}>
            <div className={classes.yourLogin}>Ваш логин: {props.login}</div>
            <div className={classes.btnExit}>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={onExitAuth}
                >Выйти</Button>
            </div>
        </div>
    )
}

export default ProfileBlock;