import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, AsyncStorage} from 'react-native';
import DangNhapScreen from "../screens/DangNhapScreen";
import DrawerAdmin from "./admin/DrawerAdmin";
import DrawerManagers from "./managers/DrawerManagers";
import {useSelector, useDispatch} from 'react-redux';
import switchScreenActions from "../actions/switchScreenActions";

function ChuyenManHinh() {
    const screen = useSelector(state => state.switchScreenReducers);
    const dispatch = useDispatch();

    let mainScreen;
    if (screen === 'login') {
        mainScreen = <DangNhapScreen/>
    } else if (screen === 'admin') {
        mainScreen = <DrawerAdmin/>
    } else if (screen === 'managers') {
        mainScreen = <DrawerManagers/>
    } else if (screen === 'users') {
        mainScreen = <DrawerManagers/>
    }

    useEffect( () => {
        getRole().then((data)=>{
            if (data === '0') {
                dispatch(switchScreenActions.admin());
            } else if (data === '1') {
                dispatch(switchScreenActions.managers());
            } else if (data === '2') {
                dispatch(switchScreenActions.users());
            } else if (data === 'none') {
                dispatch(switchScreenActions.login());
            }
        })
    }, []);

    useEffect( () => {
        getRole().then((data)=>{
            if (data === '0') {
                dispatch(switchScreenActions.admin());
            } else if (data === '1') {
                dispatch(switchScreenActions.managers());
            } else if (data === '2') {
                dispatch(switchScreenActions.users());
            } else if (data === 'none') {
                dispatch(switchScreenActions.login());
            }
        })
    });
    return (
        mainScreen
    );

}

export default ChuyenManHinh;

async function getRole() {
    let role = await AsyncStorage.getItem('role');
    return role;
}

// if (screen === 'login') {
//     mainScreen = <DangNhapScreen/>
// } else if (screen === 'admin') {
//     mainScreen = <DrawerAdmin/>
// }else if (screen === 'managers') {
//     mainScreen = <DrawerManagers/>
// }else if (screen === 'users') {
//     mainScreen = <DrawerManagers/>
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
