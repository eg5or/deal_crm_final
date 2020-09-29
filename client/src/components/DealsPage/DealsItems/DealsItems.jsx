import React from 'react';
import classes from './DealsItems.module.css'
import Deal from './Deal/Deal';
import {saveFile} from "../../../redux/deals-reducer";

const DealsItems = (props) => {
    let sortedDeals = props.deals.sort((prev, next) => {
        if ( prev.date > next.date ) return -1;
        if ( prev.date > next.date ) return 1;
    })

    console.log(props.deals)
    console.log(sortedDeals)
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
                                                   clientInvoices={d.docsFiles.clientInvoices}
                                                   sumClientInvoices={d.docsFiles.sumClientInvoices}
                                                   providerInvoices={d.docsFiles.providerInvoices}
                                                   sumProviderInvoices={d.docsFiles.sumProviderInvoices}
                                                   allDocs={d.docsFiles.allDocs}
                                                   delta={d.docsFiles.delta}
                                                   drivers={d.deliver.drivers}
                                                   forwarders={d.deliver.forwarders}
                                                   commentManager={d.commentManager}
                                                   commentHead={d.commentHead}
                                                   deliver={d.deliver}
                                                   saveFile={props.saveFile}

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