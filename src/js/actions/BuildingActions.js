/**
 * AgentActions.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 **/
'use strict'

/**
 * Class imports
 **/
import Building from '../classes/Building';

/**
 * Constant imports
 **/
import BuildingConstants from '../constants/BuildingConstants';

export type BuildingStoreAction = {
        type: BuildingConstants.NEW_BUILDING,
        payload: {
            building: Building
        }
    };
