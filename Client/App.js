import 'react-native-gesture-handler';
import React,{useState} from 'react';
import {StyleSheet} from 'react-native';
import ChuyenManHinh from './navigation/ChuyenManHinh';
import {createStore} from 'redux';
import allReducers from'./reducers';
import {Provider} from 'react-redux';
import RootErrorBoundary from "expo/build/launch/RootErrorBoundary";

const store = createStore(allReducers);
function App() {

    return(
    <Provider store={store}>
        <RootErrorBoundary>
            <ChuyenManHinh/>
        </RootErrorBoundary>
    </Provider>

    );
}
export default App;
{/*<Provider store={store}>*/}
{/*    <RootErrorBoundary>*/}
{/*        <ChuyenManHinh/>*/}
{/*    </RootErrorBoundary>*/}
{/*</Provider>*/}
{/*<View>*/}
{/*    <Dialog.Container visible={true}>*/}
{/*        <Dialog.Title>Account delete</Dialog.Title>*/}
{/*        <Dialog.Description>*/}
{/*            Do you want to delete this account? You cannot undo this action.*/}
{/*        </Dialog.Description>*/}
{/*        <Dialog.Button onPress={()=>{*/}
{/*            Alert.alert('dsdsa');*/}
{/*        }} label="Cancel" />*/}
{/*        <Dialog.Button label="Delete" />*/}
{/*    </Dialog.Container>*/}
{/*</View>*/}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
