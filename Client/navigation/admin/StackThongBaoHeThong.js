import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ThongBaoHeThongScreen from "../../screens/admin/ThongBaoHeThongScreen";
const Stack = createStackNavigator();

export default function StackThongBaoHeThong() {
    return (
        <Stack.Navigator screenOptions={{
            headerBackTitle: 'Back',
        }} initialRouteName="Thông báo hệ thống">
            <Stack.Screen name="Thông báo hệ thống" component={ThongBaoHeThongScreen}></Stack.Screen>
        </Stack.Navigator>
    );
}