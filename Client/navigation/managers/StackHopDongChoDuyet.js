import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {DongLaiScreen, HopDongDangVay} from "../../screens";
import {NutThem, NutXacNhanThem, NutKhoa, NutSua, NutDongLai} from "../../component";
import { ThemHopDongScreen } from '../../screens'
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { ChiTietHopDongScreen,LichSuHoatDongScreen,HopDongChoDuyet } from '../../screens';

const Stack = createStackNavigator();

export default function StackHopDongChoDuyet() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={{
            headerBackTitle: 'Back',
        }} initialRouteName="Hợp đồng chờ duyệt">
            <Stack.Screen name="Hợp đồng chờ duyệt" component={HopDongChoDuyet}/>
            <Stack.Screen name="Chi tiết hợp đồng" component={ChiTietHopDongScreen}
                          options={{
                              headerRight: () => (
                                  <TouchableOpacity
                                      onPress={() => navigation.navigate('Xem lãi')}>
                                      <NutDongLai />
                                  </TouchableOpacity>

                              ),
                          }}
            />
            <Stack.Screen name="Xem lãi" component={DongLaiScreen}/>

        </Stack.Navigator>

    );
}