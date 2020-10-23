import React from 'react';
import {connect} from "react-redux";
// styles
import classes from './release.module.css'
import {addNewRelease, deleteRelease, loadingReleasesData} from "../../redux/releases-reducer";
import Release from "./Release";
import AddRelease from "./AddRelease";
// components
// reducers

class ReleasesContainer extends React.Component {
    componentDidMount() {
        this.props.loadingReleasesData()
    }

    render() {
        const releasesElements = this.props.releasesData.map(r => <Release key={r._id}
                                                                           id={r._id}
                                                                           title={r.title}
                                                                           text={r.text}
                                                                           items={r.items}
                                                                           version={r.version}
                                                                           date={r.date}
                                                                           deleteRelease={this.props.deleteRelease}
                                                                           name={this.props.name}
        />)

        return <div className={classes.releases}>
            <div className={classes.title}><h1>Релизы</h1></div>
            {this.props.name === 'Егор Сумкин' && <div className={classes.addRelease}>
                <AddRelease
                    addNewRelease={this.props.addNewRelease}
                />
            </div>}
            <div className={classes.releasesItems}>
                {releasesElements}
            </div>
        </div>
    }
}

const mapStateToProps = (state) => ({
    releasesData: state.releases.releasesData,
    name: state.authBlock.name,
})

export default connect(mapStateToProps, {
    loadingReleasesData,
    addNewRelease,
    deleteRelease
})(ReleasesContainer);