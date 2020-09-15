import React from 'react';
import classes from './DealsPage.module.css'
import DealsItems from './DealsItems/DealsItems';

const DealsPage = (props) => {
    return (
        <div className={classes.dealsPage}>
            <div className={classes.filters}> Filters</div>
            <div className={classes.dealsPageItems}>
                <DealsItems deals={props.dealsPage.deals}/>
            </div>
        </div>
    )
}

export default DealsPage;