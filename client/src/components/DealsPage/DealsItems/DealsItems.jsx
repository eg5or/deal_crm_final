import React from 'react';
import classes from './DealsItems.module.css'
import Deal from './Deal/Deal';

const DealsItems = (props) => {
    let sortedDeals = props.deals
    sortedDeals.sort((prev, next) => {
        if ( prev.date > next.date ) return -1;
        if ( prev.date > next.date ) return 1;
    })

    let dealsElements = sortedDeals.map(d => <Deal key={d._id}
                                                   allDrivers={props.allDrivers}
                                                   allForwarders={props.allForwarders}
                                                   id={d._id}
                                                   date={d.date}
                                                   client={d.client}
                                                   manager={d.responsibility.name}
                                                   dealStatus={d.dealStatus}
                                                   clientInvoices={d.clientInvoices}
                                                   providerInvoices={d.providerInvoices}
                                                   allDocs={d.allDocs}
                                                   delta={d.delta}
                                                   drivers={d.drivers}
                                                   forwarders={d.forwarders}
                                                   commentManager={d.commentManager}
                                                   commentHead={d.commentHead}
                                                   authBlock={props.authBlock}
                                                   // functions
                                                   saveFile={props.saveFile}
                                                   deleteFile={props.deleteFile}
                                                   addDriver={props.addDriver}
                                                   addForwarder={props.addForwarder}
                                                   toggleStatus={props.toggleStatus}
                                                   deleteDriverFromDeal={props.deleteDriverFromDeal}
                                                   deleteForwarderFromDeal={props.deleteForwarderFromDeal}
                                                   editComment={props.editComment}

    />)

    return (
        <div>
            <div className={classes.dealsPageItems}>
                {dealsElements}
            </div>
        </div>
    )
};

export default DealsItems;