/**
 * JobActions.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 **/
'use strict'

/**
 * Class imports
 **/
import Agent from '../classes/Agent';

/**
 * Constant imports
 **/
import JobConstants from '../constants/JobConstants';

export type Job = {
        type: JobConstants.TYPE_CONSTRUCT_BULDING,
        requestedBy: Agent,
        amountOffered: number
    };

export type JobStoreAction = {
        type: JobConstants.NEW_JOB,
        payload: {
            job: Job
        }
    };
