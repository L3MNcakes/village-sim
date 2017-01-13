/**
 * DetailsActions.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 **/
'use strict'

/**
 * Npm imports
 **/
import {Map} from 'immutable';

/**
 * Constant imports
 **/
import DetailsConstants from '../constants/DetailsConstants';

export type DetailsAction = {
        type: DetailsConstants.SHOW_DETAILS,
        payload: Map<string, any>
    } | {
        type: DetailsConstants.HIDE_DETAILS
    };
