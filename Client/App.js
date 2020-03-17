import React,{useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import ChuyenManHinh from './navigation/ChuyenManHinh';
import {createStore} from 'redux';
import switchScreenReducers from "./reducers/switchScreenReducers";
import allReducers from'./reducers';
import {Provider} from 'react-redux';
// const store = createStore(switchScreenReducers);
const store = createStore(allReducers);
function App() {
    return(
        <Provider store={store}>
            <ChuyenManHinh/>
        </Provider>
    );
}
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
