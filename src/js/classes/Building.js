/**
 * Building.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 **/
'use strict'

/**
 * Npm imports
 **/
import React, {Component} from 'react';
import Victor from 'victor';

/**
 * Dispatcher import
 **/
import {dispatch} from '../dispatcher/AppDispatcher';

/**
 * Store import
 **/
import BuildingsStore from '../stores/BuildingsStore';

/**
 * Config import
 **/
import Config from '../config';

/**
 * Class imports
 **/
import Agent from '../classes/Agent';

/**
 * Component imports
 **/
import BuildingComponent from '../components/BuildingComponent';

/**
 * Constant imports
 **/
import BuildingConstants from '../constants/BuildingConstants';

export default class Building
{
    id: string;

    name: string;
    owner: Agent;
    position: Victor;

    constructor(id: string, name: string, owner: Agent): void {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.position = owner.position.clone();

        dispatch({
            type: BuildingConstants.NEW_BUILDING,
            payload: {
                building: this
            }
        });
    }

    renderComponent(): ?React.Element {
        return (
            <BuildingComponent key={this.id} buildingObj={this} />
        );
    }
}
