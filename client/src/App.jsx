import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Vars from './components/Vars/Vars';
import Profile from './components/Profile/Profile';
import PriceListCreator from './components/PriceListCreator/PriceListCreator';
import {DealsPageContainer} from './components/DealsPage/DealsPageContainer';
import Calculator from './components/Calculator/Calculator';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import HeaderRightContainer from "./components/HeaderRight/HeaderRightContainer";
import {ThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import blueGrey from "@material-ui/core/colors/blueGrey";
import CompaniesContainer from "./components/Companies/CompaniesContainer";
import SideBarVars from "./components/SideBar/SideBarVars/SideBarVars";
import SideBarCompanies from "./components/SideBar/SideBarCompanies/SideBarCompanies";

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

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className='app-wrapper'>
                <Header/>
                <NavBar/>
                <HeaderRightContainer/>
                <div className='app-wrapper-content'>
                    <Route path='/calculator' render={() => <Calculator/>}/>
                    <Route path='/companies' render={() => {
                        return <div className='app-wrapper-content-with-sidebar'>
                            <div className='content'><CompaniesContainer/></div>
                            <div className='sidebar'><SideBarCompanies/></div>
                        </div>
                    }}/>
                    <Route path='/dealspage' render={() => <DealsPageContainer/>}/>
                    <Route path='/pricelistcreator' render={() => <PriceListCreator/>}/>
                    <Route path='/profile' render={() => <Profile/>}/>
                    <Route path='/vars' render={() => {
                        return <div className='app-wrapper-content-with-sidebar'>
                            <div className='content'>
                                <Vars />
                            </div>
                            <div>
                                <SideBarVars/>
                            </div>
                        </div>
                    }}/>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;