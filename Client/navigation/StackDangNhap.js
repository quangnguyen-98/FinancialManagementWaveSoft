import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DangNhapScreen, QuenMatKhauScreen} from "../screens";
import {NavigationContainer} from '@react-navigation/native';
const Stack = createStackNavigator();

export default function StackDangNhap() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerBackTitle: 'Back'
            }} initialRouteName="Dang nhap">
                <Stack.Screen options={{
                     headerShown: false
                }} name="Dang nhap" component={DangNhapScreen}/>
                <Stack.Screen  name="Quên mật khẩu" component={QuenMatKhauScreen}/>
            </Stack.Navigator>
        </NavigationContainer>


    );
}