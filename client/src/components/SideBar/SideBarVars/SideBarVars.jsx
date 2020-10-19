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
                        to='/vars/employees'
                        className={classes.link}
                        activeClassName={classes.active}
                    >
                        Сотрудники
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink
                        to='/vars/companies'
                        className={classes.link}
                        activeClassName={classes.active}
                    >
                        Компании
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default SideBarVars;