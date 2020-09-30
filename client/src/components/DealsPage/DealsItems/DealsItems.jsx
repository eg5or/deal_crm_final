import React from 'react';
import classes from './DealsItems.module.css'
import Deal from './Deal/Deal';

const DealsItems = (props) => {
    let sortedDeals = props.deals.sort((prev, next) => {
        if ( prev.date > next.date ) return -1;
        if ( prev.date > next.date ) return 1;
    })

    let dealsElements = props.deals.map(d => <Deal key={d._id}
                                                   id={d._id}
                                                   date={d.date}
                                                   client={d.client}
                                                   manager={d.responsibility.name}
                                                   approved={d.dealStatus.approved}
                                                   providerPaid={d.dealStatus.providerPaid}
                                                   delivered={d.dealStatus.delivered}
                                                   clientPaid={d.dealStatus.clientPaid}
                                                   docSigned={d.dealStatus.docSigned}
                                                   docCollected={d.dealStatus.docCollected}
                                                   clientInvoices={d.clientInvoices}
                                                   providerInvoices={d.providerInvoices}
                                                   allDocs={d.allDocs}
                                                   delta={d.delta}
                                                   drivers={d.drivers}
                                                   forwarders={d.forwarders}
                                                   commentManager={d.commentManager}
                                                   commentHead={d.commentHead}
                                                   saveFile={props.saveFile}
                                                   deleteFile={props.deleteFile}
                                                   addDriver={props.addDriver}
                                                   addForwarder={props.addForwarder}

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