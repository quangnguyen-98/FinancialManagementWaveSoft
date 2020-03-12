import React from 'react';
import {StyleSheet, Text, View, ImageBackground, TextInput, Button, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DongLaiScreen from '../../screens/options/DongLaiScreen';
import MainChuChoVayScreen from "../managers/MainChuChoVayScreen";

const Stack = createStackNavigator();

export default function AdminNavigator() {
    return (

        <Stack.Navigator screenOptions={{
            headerBackTitle: 'Back'
        }} initialRouteName="Home">
        <Stack.Screen options={{
            headerShown: false
        }} name="Home" component={MainChuChoVayScreen}/>
        <Stack.Screen name="Details" component={DongLaiScreen}/>
        </Stack.Navigator>

    );
}