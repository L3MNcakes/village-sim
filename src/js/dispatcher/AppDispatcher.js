/**
 * AppDispatcher.js
 *
 * @author <L3MNcakes@gmail.com>
 * @flow
 **/
'use strict'

import {Dispatcher} from 'flux';

const dispatcher = new Dispatcher();
export default dispatcher;
export const dispatch = dispatcher.dispatch.bind(dispatcher);
