import React from 'react';
import {connect} from 'react-redux';
import {
    addDriver,
    addForwarder, deleteDriverFromDeal,
    deleteFile, deleteForwarderFromDeal, editComment, loadingDealsPage,
    saveFile,
    toggleStatus
} from "../../redux/deals-reducer";
import classes from "./DealsPage.module.css";
import AddDealContainer from "./AddDeal/AddDealContainer";
import DealsItems from "./DealsItems/DealsItems";

class DealsPage extends React.Component {
    componentDidMount() {
        if (this.props.filter === '') {
            this.props.loadingDealsPage()
        } else {
            this.props.loadingDealsPage(this.props.filter)
        }
    }

    render() {
        return (
            <div className={classes.dealsPage}>
                <AddDealContainer/>
                <div className={classes.dealsPageItems}>
                    <DealsItems
                        deals={this.props.dealsData}
                        allDrivers={this.props.driversData}
                        allForwarders={this.props.forwardersData}
                        saveFile={this.props.saveFile}
                        deleteFile={this.props.deleteFile}
                        addDriver={this.props.addDriver}
                        addForwarder={this.props.addForwarder}
                        toggleStatus={this.props.toggleStatus}
                        deleteDriverFromDeal={this.props.deleteDriverFromDeal}
                        deleteForwarderFromDeal={this.props.deleteForwarderFromDeal}
                        editComment={this.props.editComment}
                        authBlock={this.props.authBlock}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dealsData: state.dealsPage.dealsData,
        driversData: state.dealsPage.driversData,
        forwardersData: state.dealsPage.forwardersData,
        authBlock: state.authBlock,
        filter: state.dealsPage.filter
    }
}

export const DealsPageContainer = connect(mapStateToProps, {
    loadingDealsPage,
    saveFile,
    deleteFile,
    addDriver,
    addForwarder,
    toggleStatus,
    deleteDriverFromDeal,
    deleteForwarderFromDeal,
    editComment
})(DealsPage);

