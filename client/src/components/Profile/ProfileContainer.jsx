import React from 'react';
import classes from './Profile.module.css'
import {connect} from "react-redux";
import Profile from "./Profile";
import {savePhoto} from "../../redux/profileReducer";


class ProfileContainer extends React.Component {


    render() {


        return (
            <div>
                <Profile savePhoto={this.props.savePhoto} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
    savePhoto
})(ProfileContainer);