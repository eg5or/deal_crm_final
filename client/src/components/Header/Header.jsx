import React from "react";
import classes from './Header.module.css'
import Clock from "../Сlock/Clock";

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.headerContainer}>
                <div className={classes.dealCRM}>
                    <img alt='' src='images/logo_min_black.png' />
                </div>
            </div>

        </header>
    )
}
export default Header;