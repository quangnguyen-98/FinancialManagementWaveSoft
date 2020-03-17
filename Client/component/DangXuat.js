import React, {useState,useEffect} from 'react';
import {AsyncStorage, Text, View} from "react-native";
import {useSelector, useDispatch} from 'react-redux';

function DangXuat() {
    // useEffect(()=>{
    //     resetTokenAndGoLogin();
    // },[]);
    // resetTokenAndGoLogin().then(()=>{
    //
    // });
    let dispatch = useDispatch();
    dispatch({type: 'LOGIN'});
    return (
        <View>
            <Text>logout</Text>
        </View>

    );
}

async function resetTokenAndGoLogin() {
     await AsyncStorage.setItem('token','none');
    await AsyncStorage.setItem('role','none');
    let dispatch = useDispatch();
    dispatch({type: 'LOGIN'});
}

export default DangXuat;