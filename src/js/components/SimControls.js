/**
 * SimControls.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 **/
'use strict'

/**
 * Npm imports
 **/
import React, {Component} from 'react';

/**
 * Dispatcher import
 **/
import {dispatch} from '../dispatcher/AppDispatcher';

/**
 * Constant imports
 **/
import SimConstants from '../constants/SimConstants';

/**
 * Store imports
 **/
import SimStore from '../stores/SimStore';

type State = {
    isPaused: boolean
}

export default class SimControls extends Component<void, Object, State>
{
    state: State = {
        isPaused: SimStore.get("isPaused")
    };

    handleClick(evt: Event): void {
        dispatch({
            type: this.state.isPaused ? SimConstants.UNPAUSE : SimConstants.PAUSE
        });

        this.setState({
            isPaused: !this.state.isPaused
        });
    };

    render(): ?React.Element {
        return (
            <div class="text-centered">
                <a href="#" onClick={this.handleClick.bind(this)}>
                    {this.state.isPaused ? "Unpause" : "Pause"}
                </a>
            </div>
        );
    };
}
