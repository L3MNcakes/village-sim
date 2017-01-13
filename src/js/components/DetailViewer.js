/**
 * DetailViewer.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 **/
'use strict'

/**
 * Npm imports
 **/
import React, {Component} from 'react';
import {Container} from 'flux/utils';

/**
 * Dispatcher import
 **/
import AppDispatcher from '../dispatcher/AppDispatcher';

/**
 * Store imports
 **/
import DetailsStore from '../stores/DetailsStore';

type State = {
    header: ?string,
    details: ?Object
};

class DetailViewer extends Component<void, Object, State>
{
    static getStores() {
        return [DetailsStore];
    };

    static calculateState(prevState: State): State {
        return {
            header: DetailsStore.get('header'),
            details: DetailsStore.get('details')
        };
    };

    state: State;

    render(): ?React.Element {
        var details = [];

        for(var label in this.state.details) {
            details.push(
                <div key={"detail-"+label}>
                    <span className="detail-label">{label}:</span> {this.state.details[label]}
                </div>
            );
        }

        return this.state.header != null ? (
            <div id="DetailViewer">
                <h1>{this.state.header}</h1>
                {details}
            </div>
        ) : null;
    };
}

const DetailViewerContainer = Container.create(DetailViewer);
export default DetailViewerContainer;
