/**
 * BuildingComponent.js
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
 * Config import
 **/
import Config from '../config';

/**
 * Class imports
 **/
import Building from '../classes/Building';

/**
 * Constant imports
 **/
import DetailsConstants from '../constants/DetailsConstants';

/**
 * Dispatcher import
 **/
import {dispatch} from '../dispatcher/AppDispatcher';

type Props = {
    buildingObj: Building
};

type State = {};

export default class BuildingComponent extends Component<void, Props, State>
{
    state: State;

    render(): ?React.Element {
        return (
            <rect
                x={this.props.buildingObj.position.x}
                y={this.props.buildingObj.position.y}
                width={10}
                height={10}
            />
        );
    }
}
