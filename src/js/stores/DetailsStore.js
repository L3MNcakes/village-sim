/**
 * DetailsStore.js
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
import type {DetailsAction} from '../actions/DetailsActions';

/**
 * Constants imports
 **/
import DetailsConstants from '../constants/DetailsConstants';

class DetailStore extends ReduceStore<Map<string, any>>
{
    constructor(): void {
        super(AppDispatcher);
    };

    getInitialState(): Map<string,any> {
        return new Map({
            header: null,
            details: null
        });
    };

    reduce(state: Map<string, any>, action: DetailsAction): Map<string,any> {
        switch(action.type) {
            case DetailsConstants.SHOW_DETAILS:
                return action.payload;
            case DetailsConstants.HIDE_DETAILS:
                return new Map({heading: null, details: null});
            default:
                return state;
        }
    };

    get(key: string): any {
        return this.getState().get(key);
    }
}

const instance = new DetailStore();
export default instance;
