import React from 'react';
import classes from './NavBar.module.css'
import {NavLink} from 'react-router-dom';
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';

const NavBar = () => {
    return (
        <nav className={classes.navbar}>
            <div className={classes.items}>
                <div className={classes.item}>
                    <NavLink
                        to='/calculator'
                        className={classes.link}
                        activeClassName={classes.active}
                    >
                        Калькулятор
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink
                        to='/clients'
                        className={classes.link}
                        activeClassName={classes.active}
                    >
                        Клиенты
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink
                        to='/dealspage'
                        className={classes.link}
                        activeClassName={classes.active}
                    >
                        Сделки
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink
                        to='/pricelistcreator'
                        className={classes.link}
                        activeClassName={classes.active}
                    >
                        Прайс-лист
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink
                        to='/profile'
                        className={classes.link}
                        activeClassName={classes.active}
                    >
                        Профиль
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink
                        to='/vars/drivers'
                        className={classes.link}
                        activeClassName={classes.active}
                    >
                        Переменные
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}
export default NavBar;