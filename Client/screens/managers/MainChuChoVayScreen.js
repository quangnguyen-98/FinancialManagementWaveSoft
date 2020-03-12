import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button, Image, TouchableOpacity, Alert, ScrollView} from 'react-native';

import QLHDComponent from '../../component/QLHDComponent';
import DangXuatComponent from '../../component/DangXuatComponent';
import DongLaiComponent from '../../component/DongLaiComponent';
import GiaHanComponent from '../../component/GiaHanComponent';
import NhanTinComponent from '../../component/NhanTinComponent';
import TatToanComponent from '../../component/TatToanComponent';
import TraBotVayThemComponent from '../../component/TraBotVayThemComponent';

export default function MainChuChoVayScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <View style={styles.mainhead}>
                    <Image style={styles.KH_image} source={require('../../assets/react.png')}></Image>
                    <View style={styles.KH_info}>
                        <Text style={styles.text1}>Huỳnh Phúc Huy</Text>
                        <Text style={styles.text2}>Mã KH: KH001</Text>
                    </View>
                </View>
            </View>
            <View style={styles.main}>
                <ScrollView>
                    <View style={styles.chucnangALL}>

                        <QLHDComponent></QLHDComponent>

                        <DongLaiComponent></DongLaiComponent>

                        <TatToanComponent></TatToanComponent>

                        <TraBotVayThemComponent></TraBotVayThemComponent>

                        <GiaHanComponent></GiaHanComponent>

                        <NhanTinComponent></NhanTinComponent>

                        <DangXuatComponent></DangXuatComponent>
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
    head: {
        flex: 1,
        backgroundColor: "#2075ed",
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    main: {
        flex: 3,
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
    KH_info: {
        justifyContent: 'center',
        alignItems: 'stretch',
        marginLeft: 16
    },
    chucnangALL: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
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

