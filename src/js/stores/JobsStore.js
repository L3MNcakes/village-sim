/**
 * JobsStore.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 **/
'use strict'

/**
 * Npm imports
 **/
import {ReduceStore} from 'flux/utils';
import {Set} from 'immutable';

/**
 * Dispatcher imports
 **/
import AppDispatcher from '../dispatcher/AppDispatcher';

/**
 * Action imports
 **/
import type {JobStoreAction} from '../actions/JobActions';

/**
 * Constant imports
 **/
import JobConstants from '../constants/JobConstants';

class JobsStore extends ReduceStore<Set>
{
    constructor(): void {
        super(AppDispatcher);
    }

    getInitialState(): Set {
        return new Set();
    }

    reduce(state: Set, action: JobStoreAction): Set {
        switch(action.type) {
            case JobConstants.NEW_JOB:
                return state.add(action.payload.job);
            default:
                return state;
        }
    }
}

const instance = new JobsStore();
export default instance;
