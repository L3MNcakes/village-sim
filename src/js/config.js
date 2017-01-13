/**
 * config.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 **/
'use strict'

import {Map} from 'immutable';

export default Map({
    SIM_WIDTH: 1600,
    SIM_HEIGHT: 900,
    WORLD_TICK: 50,

    NUM_AGENTS: 10,
    AGENT_RADIUS: 10,
    AGENT_SPEED: 5,

    MIN_SPAWN_CURRENCY: 100,
    MAX_SPAWN_CURRENCY: 1000,

    BUILDING_WIDTH: 25,
});
