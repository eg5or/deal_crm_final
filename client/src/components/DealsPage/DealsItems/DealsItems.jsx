import React from 'react';
import classes from './DealsItems.module.css'
import Deal from './Deal/Deal';
import {editAddress, updateDeltaWD} from "../../../redux/deals-reducer";

const DealsItems = (props) => {
    let sortedDeals = props.deals
    sortedDeals.sort((prev, next) => {
        if (prev.date > next.date) return -1;
        if (prev.date > next.date) return 1;
    })

    let dealsElements = sortedDeals.map(d => <Deal key={d._id}
                                                   allDrivers={props.allDrivers}
                                                   allForwarders={props.allForwarders}
                                                   allCompanies={props.allCompanies}
                                                   id={d._id}
                                                   dealNumber={d.dealNumber}
                                                   date={d.date}
                                                   client={d.client}
                                                   manager={d.responsibility.name}
                                                   location={d.responsibility.location}
                                                   managerId={d.responsibility._id}
                                                   dealStatus={d.dealStatus}
                                                   clientInvoices={d.clientInvoices}
                                                   providerInvoices={d.providerInvoices}
                                                   allDocs={d.allDocs}
                                                   delta={d.delta}
                                                   deltaWD={d.deltaWD}
                                                   drivers={d.drivers}
                                                   forwarders={d.forwarders}
                                                   gifts={d.gifts}
                                                   taxes={d.taxes}
                                                   address={d.address}
                                                   commentManager={d.commentManager}
                                                   commentHead={d.commentHead}
                                                   authBlock={props.authBlock}
                                                   loading={props.loading}
                                                    // functions
                                                   saveFile={props.saveFile}
                                                   deleteFile={props.deleteFile}
                                                   addDriver={props.addDriver}
                                                   addForwarder={props.addForwarder}
                                                   addGift={props.addGift}
                                                   toggleStatus={props.toggleStatus}
                                                   deleteDriverFromDeal={props.deleteDriverFromDeal}
                                                   deleteForwarderFromDeal={props.deleteForwarderFromDeal}
                                                   deleteGiftFromDeal={props.deleteGiftFromDeal}
                                                   editComment={props.editComment}
                                                   editAddress={props.editAddress}
                                                   updateDeltaWD={props.updateDeltaWD}
                                                   updateDelta={props.updateDelta}

    />)

    return (
        <div className={`${classes.dealsPageItems}`}>
            {dealsElements}
        </div>
    )
};

export default DealsItems;