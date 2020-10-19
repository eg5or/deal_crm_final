import React from 'react';
import {connect} from "react-redux";
// components
import Settings from "./Settings";
// reducers
import {changePosition} from "../../redux/settings-reducer";

class SettingsContainer extends React.Component {
    componentDidMount() {

    }

    render() {
        return <div>
            <Settings
                profileData={this.props.profileData}
                managerMode={this.props.managerMode}
                changePosition={this.props.changePosition}
            />
        </div>
    }
}

const mapStateToProps = (state) => ({
    profileData: state.authBlock,
    managerMode: state.settings.managerMode
})

export default connect(mapStateToProps, {
    changePosition
})(SettingsContainer);