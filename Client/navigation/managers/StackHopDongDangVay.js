import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NutThem,NutDongLai} from "../../component";
import {useNavigation} from "@react-navigation/native";
import {useSelector, useDispatch} from "react-redux";
import {ChiTietHopDongScreen, LichSuHoatDongScreen, DongLaiScreen,PhieuThuScreen,TatToanScreen,ChiTietLichSuScreen, HopDongDangVay,ThemHopDongScreen} from '../../screens';

const Stack = createStackNavigator();

export default function StackHopDongDangVay() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={{
            headerBackTitle: 'Back',
        }} initialRouteName="Quản lý hợp đồng">
            <Stack.Screen name="Quản lý hợp đồng" component={HopDongDangVay}
                          options={{
                              headerRight: () => (
                                  <TouchableOpacity onPress={() => navigation.navigate('Thêm hợp đồng')}>
                                      <NutThem/>
                                  </TouchableOpacity>
                              ),
                              headerStyle: {}
                          }}>
            </Stack.Screen>
            <Stack.Screen name="Thêm hợp đồng" component={ThemHopDongScreen}/>
            <Stack.Screen name="Chi tiết hợp đồng" component={ChiTietHopDongScreen}
                          options={{
                              headerRight: () => (
                                  <TouchableOpacity
                                      onPress={() => navigation.navigate('Đóng lãi')}>
                                      <NutDongLai />
                                  </TouchableOpacity>

                              ),
                          }}
            />
            <Stack.Screen name="Đóng lãi" component={DongLaiScreen}/>
                <Stack.Screen name="Tất toán" component={TatToanScreen}/>
            <Stack.Screen name="Phiếu Thu" component={PhieuThuScreen}/>
            <Stack.Screen name="Lịch sử hoạt động" component={LichSuHoatDongScreen}/>
            <Stack.Screen name="Chi tiết lịch sử" component={ChiTietLichSuScreen}/>
        </Stack.Navigator>

    );
}