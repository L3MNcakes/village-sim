/**
 * BuildingsStore.js
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
import Building from '../classes/Building';

/**
 * Action imports
 **/
import type {BuildingStoreAction} from '../actions/BuildingActions';

/**
 * Constant imports
 **/
import BuildingConstants from '../constants/BuildingConstants';

class BuildingsStore extends ReduceStore<Map<string, ?Building>>
{
    constructor(): void {
        super(AppDispatcher);
    }

    getInitialState(): Map<string, ?Building> {
        return new Map();
    }

    reduce(state: Map<string, ?Building>, action: BuildingStoreAction): Map<string, ?Building> {
        switch(action.type) {
            case BuildingConstants.NEW_BUILDING:
                return state.set(action.payload.building.id, action.payload.building);
            default:
                return state;
        }
    }

    get(key: string): Building {
        return this.getState().get(key);
    }
}

const instance = new BuildingsStore();
export default instance;
