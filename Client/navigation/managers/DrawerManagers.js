import React from 'react';
import {Dimensions} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import DangXuat from "../../component/DangXuat";
import StackQuanLyThongTin from "../StackQuanLyThongTin"
import StackQuanLyNhanVien from "./StackQuanLyNhanVien";
import StackQuanLyHopDong from './StackQuanLyHopDong';

const Drawer = createDrawerNavigator();
const {width, height} = Dimensions.get('window');
export default function DrawerManagers(props) {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerStyle={{
                backgroundColor: '#efebed',
                width: width / 100 * 80,
            }}
                              hideStatusBar={true}
                              initialRouteName="Thông tin"
            >
                <Drawer.Screen name="Thông tin" component={StackQuanLyThongTin}/>
                <Drawer.Screen name="Quản lý hợp đồng" component={StackQuanLyHopDong}/>
                <Drawer.Screen name="Quản lý nhân viên" component={StackQuanLyNhanVien}/>
                <Drawer.Screen name="Cài đặt" component={DangXuat}/>
                <Drawer.Screen name="Đăng xuất" component={DangXuat}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

