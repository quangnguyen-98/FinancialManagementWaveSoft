import React from 'react';
import {Dimensions} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import StackQuanLyChuChoVay from "./StackQuanLyChuChoVay";
import StackQuanLyThongTin from "../StackQuanLyThongTin";
import StackThongBaoHeThong from "./StackThongBaoHeThong";
import {DoiMatKhauScreen} from "../../screens";
import DangXuat from "../../component/dungChung/DangXuat";

const Drawer = createDrawerNavigator();
const {width, height} = Dimensions.get('window');
export default function DrawerAdmin() {
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
                <Drawer.Screen name="Quản lý chủ cho vay" component={StackQuanLyChuChoVay}/>
                <Drawer.Screen name="Thông báo hệ thống" component={StackThongBaoHeThong}/>
                <Drawer.Screen name="Đổi mật khẩu" component={DoiMatKhauScreen}/>
                <Drawer.Screen name="Đăng xuất" component={DangXuat}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

