import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {changePasswordToNew} from "../../redux/auth-reducer";

class ProfileContainer extends React.Component {
    componentDidMount() {

    }

    render() {
        return <div>
            <Profile
                profileData={this.props.profileData}
                changePasswordToNew={this.props.changePasswordToNew}
            />
        </div>
    }
}

const mapStateToProps = (state) => ({
    profileData: state.authBlock,
})

export default connect(mapStateToProps, {
    changePasswordToNew
})(ProfileContainer);