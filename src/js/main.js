/**
 * main.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 **/
'use strict'

/**
 * Npm imports
 **/
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Component imports
 **/
import App from './components/App';

/**
 * Config import
 **/
import Config from './config';

var update = (): void => {
    var timestamp = (new Date()).getTime();

    ReactDOM.render(
        <App timestamp={timestamp} />,
        document.getElementById("Main")
    );
};

setInterval(update, Config.get("WORLD_TICK"));
