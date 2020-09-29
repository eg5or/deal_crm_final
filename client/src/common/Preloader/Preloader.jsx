import React from 'react';
import preloader from '../../assets/images/loader.svg';
import classes from './Preloader.module.css'

let Preloader = (props) => {
    return <div className={classes.preloaderContainer}>
        <img alt='' src={preloader} />
    </div>
}

export default Preloader;