import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom';
import store from './redux/redux-store';
import {Provider} from 'react-redux';
import LoginPage from "./components/LoginPage/LoginPage";
import {ThemeProvider} from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import blueGrey from "@material-ui/core/colors/blueGrey";

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

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <App/>
                    <Route path='/login' render={() => <LoginPage/>}/>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
