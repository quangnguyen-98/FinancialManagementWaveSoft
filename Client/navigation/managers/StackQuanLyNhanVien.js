import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NutThem from "../../component/controlButton/NutThem";
import QuanLyNhanVienScreen from "../../screens/managers/QuanLyNhanVienScreen";
import ThemNhanVienScreen from "../../screens/managers/ThemNhanVienScreen";
const Stack = createStackNavigator();
import {useNavigation} from "@react-navigation/core";
import {TouchableOpacity} from "react-native";
export default function StackQuanLyChuChoVay() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={{
            headerBackTitle: 'Back',
        }} initialRouteName="Quản lý nhân viên">
            <Stack.Screen name="Quản lý nhân viên" component={QuanLyNhanVienScreen} options={ {headerRight: () => (
                    <TouchableOpacity onPress={()=> navigation.navigate('Thêm nhân viên')}>
                    <NutThem />
                    </TouchableOpacity>
                ),
                headerStyle: {
                }
            }}></Stack.Screen>
            <Stack.Screen name="Thêm nhân viên" component={ThemNhanVienScreen}/>
        </Stack.Navigator>

    );
}