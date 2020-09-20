import React, { Component } from "react";
import classes from './Clock.module.css'

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString(),
        };
    }
    componentDidMount() {
        this.intervalID = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick() {
        this.setState({
            time: new Date().toLocaleString(),
        });
    }
    render() {
        return <p className={classes.clockText}>{this.state.time}</p>;
    }
}

export default Clock;