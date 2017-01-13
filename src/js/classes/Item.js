/**
 * Item.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 **/
'use strict'

export default class Item {
    type: string;
    quantity: number;

    constructor(type: string, quantity: number): void {
        this.type = type;
        this.quantity = quantity;
    }
}
