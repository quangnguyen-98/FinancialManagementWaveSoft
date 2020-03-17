import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ThongTinUserScreen from "../screens/ThongTinUserScreen";
const Stack = createStackNavigator();

export default function StackQuanLyThongTin() {
    return (
        <Stack.Navigator screenOptions={{
            headerBackTitle: 'Back'
        }} initialRouteName="Thong tin">
        <Stack.Screen options={{
            // headerShown: false
            headerTitle:null,
            backgroundColor:'blue'
        }} name="Thong tin" component={ThongTinUserScreen}/>
        {/*<Stack.Screen name="Details" component={DongLaiScreen}/>*/}
        </Stack.Navigator>

    );
}