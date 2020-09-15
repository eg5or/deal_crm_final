import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Vars from './components/Vars/Vars';
import Profile from './components/Profile/Profile';
import PriceListCreator from './components/PriceListCreator/PriceListCreator';
import {DealsPageContaine} from './components/DealsPage/DealsPageContaine';
import Companies from './components/Companies/Companies';
import Calculator from './components/Calculator/Calculator';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';
import HeaderRight from './components/HeaderRight/HeaderRight';

const App = () => {
  return (
      <div className='app-wrapper'>
        <Header />
        <NavBar />
        <SideBar />
        <HeaderRight />
        <div className='app-wrapper-content'>
          <Route path='/calculator' render={ () => <Calculator /> } />
          <Route path='/companies' render={ () => <Companies /> } />
          <Route path='/dealspage' render={ () => <DealsPageContaine /> } />
          <Route path='/pricelistcreator' render={ () => <PriceListCreator /> } />
          <Route path='/profile' render={ () => <Profile /> } />
          <Route path='/vars' render={ () => <Vars /> } />
        </div>
      </div>
  );
}

export default App;