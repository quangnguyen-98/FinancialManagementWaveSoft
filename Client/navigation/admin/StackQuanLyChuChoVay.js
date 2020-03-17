import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NutThem from "../../component/controlButton/NutThem";
import QuanLyChuChoVayScreen from "../../screens/admin/QuanLyChuChoVayScreen";
import ThemChuChoVayScreen from "../../screens/admin/ThemChuChoVayScreen";
const Stack = createStackNavigator();
import {useNavigation} from "@react-navigation/core";
import {TouchableOpacity} from "react-native";
export default function StackQuanLyChuChoVay() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={{
            headerBackTitle: 'Back',
        }} initialRouteName="Quản lý chủ cho vay">
            <Stack.Screen name="Quản lý chủ cho vay" component={QuanLyChuChoVayScreen} options={ {headerRight: () => (
                    <TouchableOpacity onPress={()=> navigation.navigate('Thêm chủ cho vay')}>
                        <NutThem />
                    </TouchableOpacity>

                ),
                headerStyle: {
            }
            }}></Stack.Screen>
            <Stack.Screen name="Thêm chủ cho vay" component={ThemChuChoVayScreen}/>
        </Stack.Navigator>

    );
}