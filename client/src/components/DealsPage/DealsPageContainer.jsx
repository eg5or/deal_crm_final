import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {compose} from "redux";
// styles
import classes from "./DealsPage.module.css";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import CircularProgress from "@material-ui/core/CircularProgress";
// components
import AddDealContainer from "./AddDeal/AddDealContainer";
import DealsItems from "./DealsItems/DealsItems";
// reducers
import {
    addDriver,
    addForwarder, addGift, deleteDriverFromDeal,
    deleteFile, deleteForwarderFromDeal, deleteGiftFromDeal, editAddress, editComment, loadingDealsPage, loadingOneDeal,
    saveFile,
    toggleStatus
} from "../../redux/deals-reducer";

class DealsPage extends React.Component {
    componentDidMount() {
        // обновляем страницу сделок
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

    // функция обновления страницы сделок
    updateDealPage = () => {
        let page = this.props.history.location.search // страница /dealspage?page=
        let id = this.props.match.params.id // id сделки /dealspage/:id
        if (!page) {
            // если страница не указана
            if (id) {
                // если id присутствует отправляем его в thunk loadingDealsPage
                this.props.loadingDealsPage(id)
            } else {
                // иначе загружаем первую страницу сделок
                this.props.loadingDealsPage(null, null, 1)
            }
        } else {
            // если страница указана, берем номер страницы и отправляем его в thunk loadingDealsPage
            this.props.loadingDealsPage(null, null, +page.slice(6))
        }
    }

    render() {
        return (
            <div className={classes.dealsPage}>
                <AddDealContainer/>
                {/*если в адресной строке не вбит id то показываем Пагинатор*/}
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
                    {/*если идет загрузка показываем анимацию*/}
                    {this.props.isFetching && <div className={classes.progress}>
                        <CircularProgress
                            size={25}
                            thickness={7}
                        />
                    </div>}
                </div>}
                <DealsItems
                    deals={this.props.dealsData}
                    allDrivers={this.props.driversData}
                    allForwarders={this.props.forwardersData}
                    allCompanies={this.props.companiesTableData}
                    saveFile={this.props.saveFile}
                    deleteFile={this.props.deleteFile}
                    addDriver={this.props.addDriver}
                    addForwarder={this.props.addForwarder}
                    addGift={this.props.addGift}
                    toggleStatus={this.props.toggleStatus}
                    deleteDriverFromDeal={this.props.deleteDriverFromDeal}
                    deleteForwarderFromDeal={this.props.deleteForwarderFromDeal}
                    deleteGiftFromDeal={this.props.deleteGiftFromDeal}
                    editComment={this.props.editComment}
                    editAddress={this.props.editAddress}
                    authBlock={this.props.authBlock}
                    isFetching={this.props.isFetching}
                    loading={this.props.loading}
                />
            </div>
        )
    }
}

// Local State
const mapStateToProps = (state) => {
    return {
        dealsData: state.dealsPage.dealsData,
        driversData: state.dealsPage.driversData,
        forwardersData: state.dealsPage.forwardersData,
        companiesTableData: state.companiesPage.companiesTableData,
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
        addGift,
        toggleStatus,
        deleteDriverFromDeal,
        deleteForwarderFromDeal,
        deleteGiftFromDeal,
        editComment,
        editAddress,
        loadingOneDeal,
    }),
    withRouter,
    // WithAuthRedirect
)(DealsPage)

