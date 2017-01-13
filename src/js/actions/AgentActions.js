/**
 * AgentActions.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 **/
'use strict'

/**
 * Npm imports
 **/
import Victor from 'victor';

/**
 * Class imports
 **/
import Agent from '../classes/Agent';

/**
 * Constant imports
 **/
import AgentConstants from '../constants/AgentConstants';

export type AgentAction = {
        type: null,
        payload: null
    } | {
        type: AgentConstants.MOVE,
        payload: {
            pos: Victor,
            origPos: Victor
        }
    } | {
        type: AgentConstants.MOVE_TO_AGENT,
        payload: {
            agent: Agent
        }
    } | {
        type: AgentConstants.CONSTRUCT_BUILDING,
        payload: {
            paymentOffer: number
        }
    };

export type AgentStoreAction = {
        type: AgentConstants.NEW_AGENT,
        payload: {
            agent: Agent
        }
    };
