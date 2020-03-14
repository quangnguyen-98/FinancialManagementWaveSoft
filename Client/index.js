import React from 'react';
import {AppRegistry} from 'react-native';
import {createStore} from 'redux';
import App from './App';
import allReducers from "./reducers/";
import switchScreenReducers from "./reducers/switchScreenReducers";
import {Provider} from 'react-redux';
const store = createStore(switchScreenReducers);
const Client = function () {
        return(
            <Provider store={store}>
                <App/>
            </Provider>
        );

}
AppRegistry.registerComponent('Container',()=>Client);