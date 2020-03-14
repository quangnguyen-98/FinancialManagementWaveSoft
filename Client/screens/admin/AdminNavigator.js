import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DongLaiScreen from '../../screens/options/DongLaiScreen';
import MainChuChoVayScreen from "../managers/MainChuChoVayScreen";
import QLHDScreen from '../../screens/options/QLHDScreen';
import QLChuChoVayScreen from '../../screens/options/QLChuChoVayScreen';
import TatToanScreen from '../../screens/options/TatToanScreen';
import TraBotVayThemScreen from '../../screens/options/TraBotVayThemScreen';
import GiaHanScreen from '../../screens/options/GiaHanScreen';
import NhanTinScreen from '../../screens/options/NhanTinScreen';

const Stack = createStackNavigator();

export default function AdminNavigator() {
    return (

        <Stack.Navigator screenOptions={{
            headerBackTitle: 'Back'
        }} initialRouteName="Home">
            <Stack.Screen options={{
                headerShown: false
            }} name="Home" component={MainChuChoVayScreen} />
            <Stack.Screen name="DongLai" component={DongLaiScreen} />
            <Stack.Screen name="QLHD" component={QLHDScreen} />
            <Stack.Screen name="TatToan" component={TatToanScreen} />
            <Stack.Screen name="TraBotVayThem" component={TraBotVayThemScreen} />
            <Stack.Screen name="GiaHan" component={GiaHanScreen} />
            <Stack.Screen name="NhanTin" component={NhanTinScreen} />
            <Stack.Screen name="QLChuChoVay" component={QLChuChoVayScreen} />
        </Stack.Navigator>

    );
}