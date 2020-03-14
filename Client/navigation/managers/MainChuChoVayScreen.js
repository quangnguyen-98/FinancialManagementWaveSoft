import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button, Image, TouchableOpacity, Alert, ScrollView} from 'react-native';

import QLHD from '../../component/QLHD';
import DangXuat from '../../component/DangXuat';
import DongLai from '../../component/DongLai';
import GiaHan from '../../component/GiaHan';
import NhanTin from '../../component/NhanTin';
import TatToan from '../../component/TatToan';
import TraBotVayThemComponent from '../../component/TraBotVayThem';
import TieuDeUser from "../../component/users/TieuDeUser";
import Icon from 'react-native-vector-icons/FontAwesome'
export default function MainChuChoVayScreen() {
    return (
        <View style={styles.container}>
            <TieuDeUser/>
            <View style={styles.main}>
                <ScrollView>
                    <View style={styles.chucnangALL}>

                        <QLHD></QLHD>

                        <DongLai></DongLai>

                        <TatToan></TatToan>

                        <TraBotVayThemComponent></TraBotVayThemComponent>

                        <GiaHan></GiaHan>

                        <NhanTin></NhanTin>

                        <DangXuat></DangXuat>
                    </View>
                </ScrollView>
            </View>
        </View>

    );


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    main: {
        flex: 3,
    },
    head: {
        flex: 1,
        backgroundColor: "#2075ed",
        justifyContent: 'center',
    },
    mainhead: {
        height: 128,
        marginHorizontal: 16,
        flexDirection: 'row'
    },
    KH_image: {
        width: 128,
        height: 128,
        borderColor: "#FFFFFF",
        borderWidth: 1
    },
    KH_info: {
        justifyContent: 'center',
        alignItems: 'stretch',
        marginLeft: 16
    },
    text1: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: 'bold'
    },
    text2: {
        color: "#FFFFFF",
        fontSize: 16,
        paddingTop: 5
    },
    chucnangALL: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        width: '50%',
        height: 112,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16
    },
    icon: {
        width: 64,
        height: 64,
    },
    text3: {
        paddingTop: 10,
        fontWeight: 'bold'
    },
    item2: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

