/**
 * SimActions.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 **/
'use strict'

/**
 * Constant imports
 **/
import SimConstants from '../constants/SimConstants';

export type SimAction = {
        type: SimConstants.PAUSE
    } | {
        type: SimConstants.UNPAUSE
    };
