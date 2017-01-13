/**
 * AgentsStore.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 **/
'use strict'

/**
 * Npm imports
 **/
import {ReduceStore} from 'flux/utils';
import {Map} from 'immutable';

/**
 * Dispatcher imports
 **/
import AppDispatcher from '../dispatcher/AppDispatcher';

/**
 * Class imports
 **/
import Agent from '../classes/Agent';

/**
 * Action imports
 **/
import type {AgentStoreAction} from '../actions/AgentActions';

/**
 * Constant imports
 **/
import AgentConstants from '../constants/AgentConstants';

class AgentsStore extends ReduceStore<Map<string, ?Agent>> {
    constructor(): void {
        super(AppDispatcher);
    }

    getInitialState(): Map<string, ?Agent> {
        return new Map();
    }

    reduce(state: Map<string, ?Agent>, action: AgentStoreAction): Map<string, ?Agent> {
        switch(action.type) {
            case AgentConstants.NEW_AGENT:
                return state.set(action.payload.agent.id, action.payload.agent);
            default:
                return state;
        }
    }

    get(key: string): Agent {
        return this.getState().get(key);
    }

    agentIds(): Array<string> {
        return Object.keys(this.getState().toObject());
    }
}

const instance = new AgentsStore();
export default instance;
