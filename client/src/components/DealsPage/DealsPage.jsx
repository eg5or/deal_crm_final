import React from 'react';
import classes from './DealsPage.module.css'
import DealsItems from './DealsItems/DealsItems';
import Button from '@material-ui/core/Button';
import AddDealContainer from './AddDeal/AddDealContainer';

const DealsPage = (props) => {
    return (
        <div className={classes.dealsPage}>
            <AddDealContainer />
            <div className={classes.dealsPageItems}>
                <DealsItems deals={props.dealsPage.deals}/>
            </div>
        </div>
    )
}

export default DealsPage;