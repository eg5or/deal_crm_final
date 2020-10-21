import React, {useRef} from 'react';
import PrintItem from "./PrintItem";
import ApplicationAuto from "./ApplicationAuto";

class ComponentToPrint extends React.Component {
    render() {
        const printClientInvoicesElements = this.props.clientInvoices.map(c => <PrintItem key={c._id}
                                                                                     fileUrl={c.fileUrl}
        />)
        const printProviderInvoicesElements = this.props.providerInvoices.map(c => <PrintItem key={c._id}
                                                                                         fileUrl={c.fileUrl}
        />)
        return (
            <>
                <div className="print-container" style={{margin: "0", padding: "0"}}>
                        {printClientInvoicesElements}
                        {printProviderInvoicesElements}
                        <ApplicationAuto location={this.props.location}
                        dealNumber={this.props.dealNumber}
                        date={this.props.date}
                        client={this.props.client}
                        drivers={this.props.drivers}
                        forwarders={this.props.forwarders}
                        gifts={this.props.gifts}
                        />
                </div>
            </>
        );
    }
}

export default ComponentToPrint;