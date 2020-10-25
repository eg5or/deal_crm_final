import React from 'react';
import {Redirect, Route, withRouter} from 'react-router-dom';
import {compose} from "redux";
import {connect} from 'react-redux';
// styles
import './App.css';
// components
import Vars from './components/Vars/Vars';
import PriceListCreator from './components/PriceListCreator/PriceListCreator';
import {DealsPageContainer} from './components/DealsPage/DealsPageContainer';
import Calculator from './components/Calculator/Calculator';
import {HeaderContainer} from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import HeaderRightContainer from "./components/HeaderRight/HeaderRightContainer";
import CompaniesContainer from "./components/Clients/ClientsContainer";
import SideBarVars from "./components/SideBar/SideBarVars/SideBarVars";
import SideBarCompanies from "./components/SideBar/SideBarCompanies/SideBarCompanies";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Preloader from "./common/Preloader/Preloader";
import NotificationsContainer from "./components/Profile/Notifications/NotificationsContainer";
// reducers
import {initializeApp} from "./redux/appReducer";
import SettingsContainer from "./components/Settings/SettingsContainer";
import ReleasesContainer from "./components/Releases/ReleasesContainer";
import Stats from "./components/Stats/Stats";

class App extends React.Component {
    componentDidMount() {
        // инициализируем приложение
        this.props.initializeApp()
    }

    render() {
        // если инициализация еще не прошла отображаем Прелоадер
        if (!this.props.initialized) {
            return <div className='preloader'><Preloader/></div>
        }
        // если пользователь не авторизован то редиректим его на страницу Логин
        if (!this.props.isAuth) return <Redirect to='/login'/>

        return (
            <div className='app-wrapper'>
                <div className='allHeader'>
                    <HeaderContainer />
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
                    <Route path='/settings' render={() => <SettingsContainer/>}/>
                    <Route path='/stats' render={() => <Stats/>}/>
                    <Route path='/releases' render={() => <ReleasesContainer/>}/>
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

// Local State
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