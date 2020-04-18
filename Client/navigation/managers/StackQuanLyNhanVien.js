import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NutKhoa, NutThem} from "../../component";
import {QuanLyNhanVienScreen, ThemNhanVienScreen,ChiTietNhanVienScreen} from "../../screens";
const Stack = createStackNavigator();
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native";
import {useSelector,useDispatch} from "react-redux";
export default function StackQuanLyChuChoVay() {
    const chuChoVayDuocChonReducers = useSelector(state=>state.chuChoVayDuocChonReducers);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={{
            headerBackTitle: 'Back',
        }} initialRouteName="Quản lý nhân viên">
            <Stack.Screen name="Quản lý nhân viên" component={QuanLyNhanVienScreen} options={ {headerRight: () => (
                    <TouchableOpacity onPress={()=> navigation.navigate('Thêm nhân viên')}>
                    <NutThem />
                    </TouchableOpacity>
                )
            }}></Stack.Screen>
            <Stack.Screen name="Thêm nhân viên" component={ThemNhanVienScreen}/>
            <Stack.Screen name="Chi tiết nhân viên"
                          component={ChiTietNhanVienScreen}
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