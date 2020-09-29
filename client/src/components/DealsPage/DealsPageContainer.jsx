import React from 'react';
import {connect} from 'react-redux';
import {loadingDealsTableData, saveFile} from "../../redux/deals-reducer";
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
    saveFile
})(DealsPage);

