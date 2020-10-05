import React from "react";
import classes from './HeaderRight.module.css'
import ProfileBlock from "./ProfileBlock/ProfileBlock";

const HeaderRight = (props) => {
    return <div className={classes.headerRight}>
        <div className={classes.headerRightContainer}>
            <ProfileBlock authBlock={props.authBlock} logout={props.logout}/>
        </div>
    </div>
}
export default HeaderRight;