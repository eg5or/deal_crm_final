import React from 'react';
import {connect} from 'react-redux';
import {addDriver, addForwarder, deleteFile, loadingDealsTableData, saveFile} from "../../redux/deals-reducer";
import classes from "./DealsPage.module.css";
import AddDealContainer from "./AddDeal/AddDealContainer";
import DealsItems from "./DealsItems/DealsItems";

class DealsPage extends React.Component {
    componentDidMount() {
        this.props.loadingDealsTableData()
    }

    render() {
        return (
            <div className={classes.dealsPage}>
                <AddDealContainer/>
                <div className={classes.dealsPageItems}>
                    <DealsItems
                        deals={this.props.dealsData}
                        saveFile={this.props.saveFile}
                        deleteFile={this.props.deleteFile}
                        addDriver={this.props.addDriver}
                        addForwarder={this.props.addForwarder}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dealsData: state.dealsPage.dealsData
    }
}

export const DealsPageContainer = connect(mapStateToProps, {
    loadingDealsTableData,
    saveFile,
    deleteFile,
    addDriver,
    addForwarder
})(DealsPage);

