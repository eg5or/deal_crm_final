import React from 'react';
import {connect} from 'react-redux';
import DealsPage from './DealsPage';

const mapStateToProps = (state) => {
    return {
        dealsPage: state.dealsPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        }
    }

export const DealsPageContaine = connect(mapStateToProps, mapDispatchToProps)(DealsPage);

