import React from 'react';
import './App.css';
import {Redirect, Route, withRouter} from 'react-router-dom';
import Vars from './components/Vars/Vars';
import PriceListCreator from './components/PriceListCreator/PriceListCreator';
import {DealsPageContainer} from './components/DealsPage/DealsPageContainer';
import Calculator from './components/Calculator/Calculator';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import HeaderRightContainer from "./components/HeaderRight/HeaderRightContainer";
import CompaniesContainer from "./components/Clients/ClientsContainer";
import SideBarVars from "./components/SideBar/SideBarVars/SideBarVars";
import SideBarCompanies from "./components/SideBar/SideBarCompanies/SideBarCompanies";
import {initializeApp} from "./redux/appReducer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Preloader from "./common/Preloader/Preloader";
import NotificationsContainer from "./components/Profile/Notifications/NotificationsContainer";
import {StickyContainer, Sticky} from 'react-sticky';
import {compose} from "redux";
import {connect} from 'react-redux';


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {

            return <div className='preloader'><Preloader/></div>
        }

        if (!this.props.isAuth) return <Redirect to='/login'/>

        return (
            <div className='app-wrapper'>
                <div className='allHeader'>
                    <Header/>
                    <NavBar/>
                    <HeaderRightContainer/>
                </div>
                <div className='app-wrapper-content'>
                    <Route path='/calculator' render={() => <Calculator/>}/>
                    <Route path='/clients' render={() => {
                        return <div className='app-wrapper-content-with-sidebar'>
                            <div className='content'><CompaniesContainer/></div>
                            <div className='sidebar'><SideBarCompanies/></div>
                        </div>
                    }}/>
                    <Route path='/dealspage/:id?' render={() => <DealsPageContainer/>}/>
                    <Route path='/pricelistcreator' render={() => <PriceListCreator/>}/>
                    <Route path='/profile' render={() => <ProfileContainer/>}/>
                    <Route path='/notifications/:page?' render={() => <NotificationsContainer/>}/>
                    <Route path='/vars' render={() => {
                        return <div className='app-wrapper-content-with-sidebar'>
                            <div className='content'>
                                <Vars/>
                            </div>
                            <div>
                                <SideBarVars/>
                            </div>
                        </div>
                    }}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    isAuth: state.authBlock.isAuth,
})

export default compose(
    withRouter,
    connect(mapStateToProps, {
        initializeApp
    })
)(App)