import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HopDongDangVay } from "../../screens";
import { NutThem, NutXacNhanThem, NutKhoa, NutSua } from "../../component";
import { ThemHopDongScreen } from '../../screens'
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { ChiTietHopDongScreen,LichSuHoatDongScreen,HopDongDaDong } from '../../screens';

const Stack = createStackNavigator();

export default function StackHopDongDaDong() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={{
            headerBackTitle: 'Back',
        }} initialRouteName="Hợp đồng đã đóng">
            <Stack.Screen name="Hợp đồng đã đóng" component={HopDongDaDong}/>
            <Stack.Screen name="Chi tiết hợp đồng" component={ChiTietHopDongScreen}/>
            <Stack.Screen name="Lịch sử hợp đồng" component={LichSuHoatDongScreen}/>
        </Stack.Navigator>

    );
}