import React from 'react';
import {TouchableOpacity, View} from "react-native";
import {createStackNavigator} from '@react-navigation/stack';
import {NutThem,NutKhoa }from "../../component";
import {QuanLyChuChoVayScreen,ThemChuChoVayScreen,ChiTietChuChoVayScreen} from "../../screens";
import {useSelector,useDispatch} from "react-redux";
const Stack = createStackNavigator();
import {useNavigation} from "@react-navigation/native";

export default function StackQuanLyChuChoVay() {
    const chuChoVayDuocChonReducers = useSelector(state=>state.chuChoVayDuocChonReducers);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return (

        <Stack.Navigator screenOptions={{
            headerBackTitle: 'Back',
        }} initialRouteName="Quản lý chủ cho vay">
            <Stack.Screen name="Quản lý chủ cho vay"
                          component={QuanLyChuChoVayScreen}
                          options={{
                              headerRight: () => (
                                  <TouchableOpacity
                                      onPress={() => navigation.navigate('Thêm chủ cho vay')}>
                                      <NutThem/>
                                  </TouchableOpacity>

                              ),
                              headerStyle: {}
                          }}
            />
            <Stack.Screen name="Thêm chủ cho vay"
                          component={ThemChuChoVayScreen}/>
            <Stack.Screen name="Chi tiết chủ cho vay"
                          component={ChiTietChuChoVayScreen}
                          options={{
                              title: '',
                              headerRight: () => (
                                  <TouchableOpacity
                                      onPress={() =>{
                                                dispatch({type:'OPEN_DIALOG'});
                                      }}>

                                    <NutKhoa trangThaiKhoa={chuChoVayDuocChonReducers.trangThaiKhoa==true}/>
                                  </TouchableOpacity>

                              ),
                          }}
            />

        </Stack.Navigator>

    );
}