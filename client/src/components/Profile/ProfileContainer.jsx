import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";



class ProfileContainer extends React.Component {


    render() {


        return (
            <div>
                <Profile profileData={this.props.profileData}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profileData: state.authBlock
})

export default connect(mapStateToProps, {

})(ProfileContainer);