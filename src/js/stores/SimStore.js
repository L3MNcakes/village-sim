/**
 * SimStore.js
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
 * Action imports
 **/
import type {SimAction} from '../actions/SimActions';

/**
 * Constants imports
 **/
import SimConstants from '../constants/SimConstants';

class SimStore extends ReduceStore<Map<string, any>>
{
    constructor(): void {
        super(AppDispatcher);
    };

    getInitialState(): Map<string, any> {
        return new Map({
            isPaused: true
        });
    };

    reduce(state: Map<string, any>, action: SimAction) {
        switch(action.type) {
            case SimConstants.PAUSE:
                return new Map({isPaused: true});
            case SimConstants.UNPAUSE:
                return new Map({isPaused: false});
            default:
                return state;
        }
    };

    get(key: string): any {
        return this.getState().get(key);
    }
}

const instance = new SimStore();
export default instance;
