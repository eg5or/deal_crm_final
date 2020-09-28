import React from 'react';
import './App.css';
import {Route, withRouter} from 'react-router-dom';
import Vars from './components/Vars/Vars';
import PriceListCreator from './components/PriceListCreator/PriceListCreator';
import {DealsPageContainer} from './components/DealsPage/DealsPageContainer';
import Calculator from './components/Calculator/Calculator';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import HeaderRightContainer from "./components/HeaderRight/HeaderRightContainer";
import {ThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import blueGrey from "@material-ui/core/colors/blueGrey";
import CompaniesContainer from "./components/Clients/ClientsContainer";
import SideBarVars from "./components/SideBar/SideBarVars/SideBarVars";
import SideBarCompanies from "./components/SideBar/SideBarCompanies/SideBarCompanies";
import {initializeApp} from "./redux/appReducer";
import {compose} from "redux";
import {connect} from "react-redux";
import AuthBlock from "./components/HeaderRight/AuthBlock/AuthBlock";
import {clearEmailAndPassword, login, logout, newEmailTextAC, newPasswordTextAC, register} from "./redux/auth-reducer";
import Alert from "@material-ui/lab/Alert";
import ProfileContainer from "./components/Profile/ProfileContainer";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blueGrey[800],
        },
        secondary: {
            main: blueGrey[100],
        },
    },
});

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <div>Loading...</div>
        }

        return (
            <ThemeProvider theme={theme}>
                {this.props.isAuth ? <div className='app-wrapper'>
                        <Header/>
                        <NavBar/>
                        <HeaderRightContainer/>
                        <div className='app-wrapper-content'>
                            <Route path='/calculator' render={() => <Calculator/>}/>
                            <Route path='/clients' render={() => {
                                return <div className='app-wrapper-content-with-sidebar'>
                                    <div className='content'><CompaniesContainer/></div>
                                    <div className='sidebar'><SideBarCompanies/></div>
                                </div>
                            }}/>
                            <Route path='/dealspage' render={() => <DealsPageContainer/>}/>
                            <Route path='/pricelistcreator' render={() => <PriceListCreator/>}/>
                            <Route path='/profile' render={() => <ProfileContainer />}/>
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
                    : <div className='auth-wrapper'>
                        <div className='authBlock'>
                            <AuthBlock
                                newEmailText={this.props.newEmailText}
                                newPasswordText={this.props.newPasswordText}
                                newEmailTextAC={this.props.newEmailTextAC}
                                newPasswordTextAC={this.props.newPasswordTextAC}
                                clearEmailAndPassword={this.props.clearEmailAndPassword}
                                register={this.props.register}
                                login={this.props.login}
                            />
                        </div>
                        {this.props.responseMessage !=='' && <div className='errorBlock'><Alert severity="error">{this.props.responseMessage}</Alert></div>}
                    </div>}
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    isAuth: state.authBlock.isAuth,
    newEmailText: state.authBlock.newEmailText,
    newPasswordText: state.authBlock.newPasswordText,
    responseMessage: state.authBlock.responseMessage,
})

export default compose(
    withRouter,
    connect(mapStateToProps, {
        initializeApp,
        newEmailTextAC,
        newPasswordTextAC,
        clearEmailAndPassword,
        login,
        register,
    })
)(App)