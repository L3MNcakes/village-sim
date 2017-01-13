/**
 * App.js
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
 * Component imports
 **/
import VillageSim from './VillageSim';
import DetailViewer from './DetailViewer';
import SimControls from './SimControls';

type Props = {
    timestamp: number
};

export default class App extends Component<void, Props, null>
{
    state: null;

    render(): ?React.Element {
        return (
            <div id="App">
                <h1>Village-Sim</h1>
                <SimControls />
                <VillageSim timestamp={this.props.timestamp} />
                <DetailViewer />
            </div>
        );
    };
}
