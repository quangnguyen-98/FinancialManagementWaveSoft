import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import QuanLyChuChoVay from "./QuanLyChuChoVay";
import DangXuat from "../../component/DangXuat";
import MainChuChoVayScreen from '../managers/MainChuChoVayScreen';
import { createStackNavigator } from '@react-navigation/stack';
import DongLaiScreen from '../../screens/options/DongLaiScreen';

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MainChuChoVayScreen></MainChuChoVayScreen>
        </View>
    );
}
function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Notifications" component={NotificationsScreen} />
                <Drawer.Screen name="Quản lý chủ cho vay" component={QuanLyChuChoVay} />
                <Drawer.Screen name="Out" component={DangXuat} />


            </Drawer.Navigator>
            <Stack.Navigator>
                <Stack.Screen name="DongLai" component={DongLaiScreen} options={{ title: 'Đóng lãi' }}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 120
    }
});
