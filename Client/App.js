import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import ChuyenManHinh from './navigation/ChuyenManHinh';
import {createStore} from 'redux';
import allReducers from'./reducers';
import {Provider} from 'react-redux';
import RootErrorBoundary from "expo/build/launch/RootErrorBoundary";
import ErrorBoundary from './ErrorBoundary';
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
