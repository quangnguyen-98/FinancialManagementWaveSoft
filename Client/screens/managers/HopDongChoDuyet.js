import React, {useState, useEffect} from 'react';
import {
    View,
    StyleSheet,
    Alert,
    AsyncStorage,
    ScrollView,
    Text
} from 'react-native';
import {apiLink} from "../../config/constant";
import {ThongTinUserTheoDong, TieuDeUser} from "../../component";
import {useSelector, useDispatch} from "react-redux";
import Dialog from "react-native-dialog";
import {useNavigation} from "@react-navigation/native";

export default function HopDongChoDuyet({navigation, route}) {


    return (

        <View style={styles.container}>
            <Text>Màn hình quản lý các hợp đồng đang chờ duyệt</Text>
        </View>

    );


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:200
    },
    thongTin: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: '2%'
    }

});

