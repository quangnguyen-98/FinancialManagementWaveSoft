import React from 'react';
import {StyleSheet, Text, View, ImageBackground, TextInput, Button, Dimensions} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import StackQuanLyChuChoVay from "./StackQuanLyChuChoVay";
import DangXuat from "../../component/DangXuat";
import StackQuanLyThongTin from './StackQuanLyThongTin';

function NotificationsScreen({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button onPress={() => navigation.goBack()} title="Go back home"/>
        </View>
    );
}

const Drawer = createDrawerNavigator();
const {width, height} = Dimensions.get('window');
export default function DrawerAdmin(props) {
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
                <Drawer.Screen name="Thông báo hệ thống" component={StackQuanLyChuChoVay}/>
                <Drawer.Screen name="Cài đặt" component={DangXuat}/>
                <Drawer.Screen name="Đăng xuất" component={DangXuat}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 120
    }
});
