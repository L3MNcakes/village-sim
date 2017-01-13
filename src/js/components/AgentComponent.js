/**
 * AgentComponent.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 **/
'use strict'

/**
 * Npm imports
 **/
import React, {Component} from 'react';
import {Map} from 'immutable';

/**
 * Config import
 **/
import Config from '../config';

/**
 * Class imports
 **/
import Agent from '../classes/Agent';

/**
 * Constant imports
 **/
import DetailsConstants from '../constants/DetailsConstants';

/**
 * Dispatcher import
 **/
import {dispatch} from '../dispatcher/AppDispatcher';

type Props = {
    agentObj: Agent
};

type State = {};

export default class AgentComponent extends Component<void, Props, State>
{
    state: State;

    handleClick(evt: Event): void {
        dispatch({
            type: DetailsConstants.SHOW_DETAILS,
            payload: new Map({
                header: this.props.agentObj.getFullName(),
                details: {
                    Money: this.props.agentObj.getMoney()
                }
            })
        });
    };

    render(): ?React.Element {
        return (
            <circle
                className="agent"
                cx={this.props.agentObj.position.x}
                cy={this.props.agentObj.position.y}
                r={Config.get("AGENT_RADIUS")}
                onClick={this.handleClick.bind(this)}
            />
        );
    }
}
