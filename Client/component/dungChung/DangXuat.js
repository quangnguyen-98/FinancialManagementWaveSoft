import React, {useState,useEffect} from 'react';
import {AsyncStorage, Text, View} from "react-native";
import {useSelector, useDispatch} from 'react-redux';

export default function DangXuat() {
    // useEffect(()=>{
    //     resetTokenAndGoLogin();
    // },[]);
    // resetTokenAndGoLogin().then(()=>{
    //
    // });
    let dispatch = useDispatch();
    dispatch({type: 'LOGIN'});
    return null;
}


