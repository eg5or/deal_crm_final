import React from 'react';
import classes from './SideBar.module.css'

const SideBar = (props) => {
    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebarContainer}>SideBar</div>
        </div>
    )
}

export default SideBar;