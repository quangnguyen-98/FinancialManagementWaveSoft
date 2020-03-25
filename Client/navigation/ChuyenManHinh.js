import React, {useState, useEffect} from 'react';
import { AsyncStorage} from 'react-native';
import {DangNhapScreen} from "../screens";
import StackDangNhap from "./StackDangNhap";
import DrawerAdmin from "./admin/DrawerAdmin";
import DrawerManagers from "./managers/DrawerManagers";
import DrawerUsers from "./users/DrawerUsers";
import {useSelector, useDispatch} from 'react-redux';
import switchScreenActions from "../actions/switchScreenActions";
import {apiLink} from "../config/constant";

export default function ChuyenManHinh() {
    const screen = useSelector(state => state.switchScreenReducers);
    const dispatch = useDispatch();

    useEffect( () => {
        getRole().then((data)=>{
            if (data.role === 0) {
                dispatch(switchScreenActions.admin());
            } else if (data.role === 1) {
                dispatch(switchScreenActions.managers());
            } else if (data.role === 2) {
                dispatch(switchScreenActions.users());
            } else if (data.role == undefined) {
                dispatch(switchScreenActions.login());
            }
        })
    }, []);

    useEffect( () => {
        getRole().then((data)=>{
            if (data.role === 0) {
                dispatch(switchScreenActions.admin());
            } else if (data.role === 1) {
                dispatch(switchScreenActions.managers());
            } else if (data.role === 2) {
                dispatch(switchScreenActions.users());
            } else if (data.role == undefined) {
                dispatch(switchScreenActions.login());
            }
        })
    });

    function returnName(screen){
        if(screen == 'login'){
            return <StackDangNhap/>;
        }
        else if(screen=='admin'){
            return <DrawerAdmin/>;
        }
        else if(screen=='managers'){
            return <DrawerManagers/>;
        }
        else if(screen=='users'){
            return <DrawerUsers/>;
        }
    }
    return (
       returnName(screen)
    );
}



async function getRole() {
    let token = await AsyncStorage.getItem('token');
    let response = await fetch(apiLink + 'auth/checklogined?token=' + token);
    let responseJson = await response.json();
    return responseJson;
}