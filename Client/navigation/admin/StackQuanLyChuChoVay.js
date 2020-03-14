import React from 'react';
import {Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import QuanLyChuChoVayScreen from "../../screens/admin/QuanLyChuChoVayScreen";
import NutThemChuChoVay from "../../component/managers/NutThemChuChoVay";
import ThemChuChoVay from "../../screens/admin/ThemChuChoVay";
const Stack = createStackNavigator();

export default function StackQuanLyChuChoVay() {
    return (
        <Stack.Navigator screenOptions={{
            headerBackTitle: 'Back',
        }} initialRouteName="Quản lý chủ cho vay">
            <Stack.Screen name="Quản lý chủ cho vay" component={QuanLyChuChoVayScreen} options={ {headerRight: () => (
                    <NutThemChuChoVay />
                ),
                headerStyle: {
            }
            }}></Stack.Screen>
            <Stack.Screen name="Thêm chủ cho vay" component={ThemChuChoVay}/>
        </Stack.Navigator>

    );
}