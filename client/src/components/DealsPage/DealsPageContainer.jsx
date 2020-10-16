import React from 'react';
import {connect} from 'react-redux';
import {
    addDriver,
    addForwarder, deleteDriverFromDeal,
    deleteFile, deleteForwarderFromDeal, editComment, loadingDealsPage, loadingOneDeal,
    saveFile, toggleFirstLoadingPage,
    toggleStatus
} from "../../redux/deals-reducer";
import classes from "./DealsPage.module.css";
import AddDealContainer from "./AddDeal/AddDealContainer";
import DealsItems from "./DealsItems/DealsItems";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import {Link, withRouter} from "react-router-dom";
import {compose} from "redux";
import CircularProgress from "@material-ui/core/CircularProgress";

class DealsPage extends React.Component {
    componentDidMount() {
        this.updateDealPage()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.search !== this.props.location.search) {
            this.updateDealPage()
        }
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.updateDealPage()
        }
    }

    updateDealPage = () => {
        let page = this.props.history.location.search
        let id = this.props.match.params.id
        if (!page) {
            if (id) {
                this.props.loadingDealsPage(id)
            } else {
                this.props.loadingDealsPage(null, null, 1)
            }
        } else {
            this.props.loadingDealsPage(null, null, +page.slice(6))
        }
    }

    render() {
        return (
            <div className={classes.dealsPage}>
                <AddDealContainer/>
                {!this.props.match.params.id && <div className={classes.paginationBar}>
                    <div className={classes.pagination}>
                        <Pagination
                            shape="rounded"
                            size="small"
                            page={this.props.dealsCurrentPage}
                            count={this.props.dealsPageCount}
                            renderItem={(item) => (
                                <PaginationItem
                                    component={Link}
                                    to={`/dealspage${item.page === 1 ? '' : `?page=${item.page}`}`}
                                    {...item}
                                />
                            )}
                        />
                    </div>
                    {this.props.isFetching ? <div className={classes.progress}>
                        <CircularProgress
                            size={25}
                            thickness={7}
                        />
                    </div> : null}
                </div>}
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
                        isFetching={this.props.isFetching}
                        loading={this.props.loading}
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
        filter: state.dealsPage.filter,
        initialized: state.dealsPage.initialized,
        dealsPageCount: state.dealsPage.dealsPageCount,
        dealsCurrentPage: state.dealsPage.dealsCurrentPage,
        isFetching: state.dealsPage.isFetching,
        loading: state.dealsPage.loading,
    }
}

export const DealsPageContainer = compose(
    connect(mapStateToProps, {
        loadingDealsPage,
        saveFile,
        deleteFile,
        addDriver,
        addForwarder,
        toggleStatus,
        deleteDriverFromDeal,
        deleteForwarderFromDeal,
        editComment,
        loadingOneDeal,
    }),
    withRouter,
    // WithAuthRedirect
)(DealsPage)

