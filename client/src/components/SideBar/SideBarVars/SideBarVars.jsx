import React from 'react';
import classes from './SideBarVars.module.css'
import {NavLink} from "react-router-dom";

const SideBarVars = (props) => {
    return (
        <div className={classes.sidebarContainer}>
            <div className={classes.items}>
                <div className={classes.item}>
                    <NavLink
                        to='/vars/drivers'
                        className={classes.link}
                        activeClassName={classes.active}
                    >
                        Водители
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink
                        to='/vars/forwarders'
                        className={classes.link}
                        activeClassName={classes.active}
                    >
                        Экспедиторы
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink
                        to='/vars/managers'
                        className={classes.link}
                        activeClassName={classes.active}
                    >
                        Менеджеры
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default SideBarVars;