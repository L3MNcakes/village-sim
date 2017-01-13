/**
 * Agent.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 **/
'use strict'

/**
 * Npm imports
 **/
import React from 'react';
import Random from 'random-js';
import Victor from 'victor';
import {Set, OrderedSet} from 'immutable';

/**
 * Dispatcher import
 **/
import {dispatch} from '../dispatcher/AppDispatcher';

/**
 * Store import
 **/
import AgentsStore from '../stores/AgentsStore';
import BuildingsStore from '../stores/BuildingsStore';

/**
 * Config import
 **/
import Config from '../config';

/**
 * Class imports
 **/
import Item from './Item';
import Building from './Building';

/**
 * Component imports
 **/
import AgentComponent from '../components/AgentComponent';

/**
 * Action imports
 **/
import type {AgentAction} from '../actions/AgentActions';

/**
 * Constant imports
 **/
import AgentConstants from '../constants/AgentConstants';
import ItemConstants from '../constants/ItemConstants';
import JobConstants from '../constants/JobConstants';

var rng = new Random(),
    randomName = (): string => {
        var chars: string  = "abcdefghijklmnopqrstuvwxyz",
            name: string  = rng.string(rng.integer(6, 10), chars);

        name = name[0].toUpperCase() + name.slice(1);

        return name;
    };

export default class Agent {
    // ID is used as an internal identifier for an Agent
    id: string;

    // The actionQueue contains an ordered queue (first in, first out) of actions the agent will perform
    actionQueue: OrderedSet<AgentAction>;

    name: string;
    dynastyName: string;
    position: Victor;
    inventory: Set<Item>;
    buildings: Set<Building>;

    constructor(id: string): void {
        this.id = id;
        this.actionQueue = new OrderedSet();

        this.name = randomName();
        this.dynastyName = randomName();
        this.position = new Victor(rng.integer(0, Config.get("SIM_WIDTH")), rng.integer(0, Config.get("SIM_HEIGHT")));

        this.inventory = new Set([
            new Item(ItemConstants.TYPE_CURRENCY, rng.integer(Config.get("MIN_SPAWN_CURRENCY"), Config.get("MAX_SPAWN_CURRENCY")))
        ]);

        this.buildings = new Set();

        // Adds the newly created agent to the AgentsStore
        dispatch({
            type: AgentConstants.NEW_AGENT,
            payload: {
                agent: this
            }
        });
    }

    update(): void {
        if(this.actionQueue.size == 0) {
            this.decideAction();
        }

        switch(this.actionQueue.first().type) {
            case AgentConstants.MOVE:
                return this.handleMove();
            case AgentConstants.MOVE_TO_AGENT:
                return this.handleMoveToAgent();
            case AgentConstants.CONSTRUCT_BUILDING:
                return this.handleConstructBuilding();
        }
    }

    decideAction(): void {
        var availableActions = [
            AgentConstants.MOVE,
            AgentConstants.MOVE_TO_AGENT,
            AgentConstants.CONSTRUCT_BUILDING
        ];

        var pickAction = rng.pick(availableActions),
            action: AgentAction;

        switch(pickAction) {
            case AgentConstants.MOVE:
                action = {
                    type: AgentConstants.MOVE,
                    payload: {
                        pos: new Victor(
                            rng.integer(0, Config.get("SIM_WIDTH")),
                            rng.integer(0, Config.get("SIM_HEIGHT"))
                        ),
                        origPos: this.position.clone()
                    }
                };
                break;
            case AgentConstants.MOVE_TO_AGENT:
                action = {
                    type: AgentConstants.MOVE_TO_AGENT,
                    payload: {
                        agent: AgentsStore.get(rng.pick(AgentsStore.agentIds()))
                    }
                };
                break;
            case AgentConstants.CONSTRUCT_BUILDING:
                action = {
                    type: AgentConstants.CONSTRUCT_BUILDING,
                    payload: {
                        paymentOffer: rng.integer(0, this.getMoney())
                    }
                };
                break;
        }

        // For some reason OrderedSet.add doesn't return an OrderedSet. 0_o
        this.actionQueue = new OrderedSet(this.actionQueue.add(action));
    }

    getFullName(): string {
        return this.name + " " + this.dynastyName;
    }

    getMoney(): number {
        for(var item: Item of this.inventory.values()) {
            if(item.type == ItemConstants.TYPE_CURRENCY) {
                return item.quantity;
            }
        }

        return 0;
    }

    handleMove(): void {
        var action = this.actionQueue.first(),
            targetPos = action.payload && action.payload.pos ? action.payload.pos : null,
            origPos = action.payload && action.payload.origPos ? action.payload.origPos : null;

        if(!targetPos || !origPos || (this.position.x == targetPos.x && this.position.y == targetPos.y)) {
            this.actionQueue = this.actionQueue.delete(action);
            return;
        }

        var deltaVec = targetPos.clone().subtract(origPos).normalize(),
            moveVec = deltaVec.clone().multiply(new Victor(Config.get("AGENT_SPEED"), Config.get("AGENT_SPEED"))),
            newPos = this.position.clone().add(moveVec);

        if(this.position.distance(targetPos) < (Config.get("AGENT_RADIUS") / 2)) {
            newPos = targetPos;
        }

        this.position = newPos.clone();
    }

    handleMoveToAgent(): void {
        var action = this.actionQueue.first(),
            targetPos = action.payload && action.payload.agent ? action.payload.agent.position : null;

        if(!action.payload || !targetPos || action.payload.agent == this || this.position.distance(targetPos) < (Config.get("AGENT_RADIUS") * 2)) {
            this.actionQueue = this.actionQueue.delete(action);
            return;
        }

        var deltaVec = targetPos.clone().subtract(this.position).normalize(),
            moveVec = deltaVec.clone().multiply(new Victor(Config.get("AGENT_SPEED"), Config.get("AGENT_SPEED"))),
            newPos = this.position.clone().add(moveVec);

        this.position = newPos.clone();
    }

    handleConstructBuilding(): void {
        var action = this.actionQueue.first(),
            jobAction = {
                type: JobConstants.NEW_JOB,
                payload: {
                    type: JobConstants.TYPE_CONSTRUCT_BULDING,
                    requestedBy: this,
                    amountOffered: action.payload && action.payload.paymentOffer ? action.payload.paymentOffer : 0
                }
            };

        this.actionQueue = this.actionQueue.delete(action);
    }

    renderComponent(): ?React.Element {
        return (
            <AgentComponent key={this.id} agentObj={this} />
        );
    }
}
