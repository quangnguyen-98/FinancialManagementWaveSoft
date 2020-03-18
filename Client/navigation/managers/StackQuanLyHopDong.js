import React from 'react';
import {Button,TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import QuanLyHopDongScreen from "../../screens/managers/QuanLyHopDongScreen";
import NutThem from "../../component/controlButton/NutThem";
import ThemHopDongScreen from '../../screens/managers/ThemHopDongScreen'
import {useNavigation} from "@react-navigation/core";

const Stack = createStackNavigator();

export default function StackQuanLyHopDong() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={{
            headerBackTitle: 'Back',
        }} initialRouteName="Quản lý hợp đồng">
            <Stack.Screen name="Quản lý hợp đồng" component={QuanLyHopDongScreen} options={ {headerRight: () => (
                    <TouchableOpacity onPress={()=> navigation.navigate('Thêm hợp đồng')}>
                    <NutThem />
                </TouchableOpacity>
                ),
                headerStyle: {
            }
            }}></Stack.Screen>
            <Stack.Screen name="Thêm hợp đồng" component={ThemHopDongScreen}/>
        </Stack.Navigator>

    );
}