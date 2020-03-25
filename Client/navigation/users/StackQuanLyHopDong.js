import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {QuanLyHopDongScreen} from "../../screens";
import {NutThem, NutXacNhanThem, NutKhoa} from "../../component";
import {ThemHopDongScreen} from '../../screens'
import {useNavigation} from "@react-navigation/native";
import {useSelector,useDispatch} from "react-redux";

const Stack = createStackNavigator();

export default function StackQuanLyHopDong() {
    const dispatch = useDispatch();
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