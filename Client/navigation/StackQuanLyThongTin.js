import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ThongTinUserScreen,ThayDoiThongTinUserScreen} from "../screens";
const Stack = createStackNavigator();

export default function StackQuanLyThongTin() {
    return (
        <Stack.Navigator screenOptions={{
            headerBackTitle: 'Back'
        }} initialRouteName="Thong tin">
        <Stack.Screen options={{
            // headerShown: false
            headerStyle: {
                backgroundColor: '#1e90ff'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitle:'Wavesoft FM',
            fontSize: 30
        }} name="Thong tin" component={ThongTinUserScreen}/>
            <Stack.Screen  name="Thay đổi thông tin" component={ThayDoiThongTinUserScreen}/>
        </Stack.Navigator>

    );
}