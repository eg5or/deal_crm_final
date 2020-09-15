import React from 'react';
import classes from './DealsItems.module.css'
import Deal from './Deal/Deal';

const DealsItems = (props) => {
    let dealsElements = props.deals.map(d => <Deal key={d.id}
                                                   date={d.date}
                                                   client={d.client}
                                                   manager={d.responsibility.managerName}
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