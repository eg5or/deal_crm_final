import React from "react";
import classes from './Header.module.css'

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.headerContainer}>
                <span className={classes.dealCRM}>Deal CRM</span>
            </div>
        </header>
    )
}
export default Header;