/**
 * VillageSim.js
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
 * Class imports
 **/
import Agent from '../classes/Agent';

/**
 * Config import
 **/
import Config from '../config';

/**
 * Store import
 **/
import SimStore from '../stores/SimStore';


type State = {
    agents: Array<Agent>
};

type Props = {
    timestamp: number
};

export default class VillageSim extends Component<void, Props, State>
{
    state: State = {
        agents: []
    };

    componentWillMount(): void {
        var agents = [];

        for(var i=0; i<Config.get("NUM_AGENTS"); i++) {
            agents.push(new Agent("agent-"+i));
        }

        this.setState({agents: agents});
    };

    componentWillReceiveProps(): void {
        if(SimStore.get("isPaused")) return;

        var agents = this.state.agents;

        for(var i=0; i<agents.length; i++) {
            agents[i].update();
        }

        this.setState({
            agents: agents
        });
    };

    render(): ?React.Element {
        var agents = this.state.agents.map(function(agent) {
            return agent.renderComponent();
        });

        return (
            <svg id="VillageSim" width={Config.get("SIM_WIDTH")} height={Config.get("SIM_HEIGHT")}>
                {agents}
            </svg>
        );
    };
};
