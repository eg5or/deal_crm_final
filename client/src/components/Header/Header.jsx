import React from "react";
import classes from './Header.module.css'
import Clock from "../Сlock/Clock";

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.headerContainer}>
                <div className={classes.dealCRM}>Deal CRM</div>
            </div>

        </header>
    )
}
export default Header;