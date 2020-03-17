import React, {useState} from 'react';
import {Text, View, StyleSheet, Image,Dimensions,TouchableOpacity} from 'react-native';
const {width,height} = Dimensions.get('window');
export default function ChuChoVayItem(props) {
        return (
            <TouchableOpacity >
                <View style={!props.trangThaiKhoa?styles.wrapItemUnlock:styles.wrapItemlock}>
                    <Image style={styles.hinhAnh} source={{url:props.hinhAnh}}/>
                    <View style={styles.thongTin}>
                        <View style={styles.ten}>
                            <Text style={styles.textTen}>{props.hoTen}</Text>
                        </View>
                        <View style={styles.email}>
                            <Text style={styles.textEmail}>{props.email}</Text>
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        );
}

const styles = StyleSheet.create({
    wrapItemUnlock: {
        padding:5,
        height: height/7,
        flexDirection: 'row',
        // borderColor: '#a9a9a9',
        // borderWidth: 1,
        marginBottom:5,
        backgroundColor:'#ffffff',
        borderRadius:3,
        shadowColor:'#000000',
        shadowOpacity:0.3,
        shadowRadius:5,
        shadowOffset:{width:0,height:0}
    },
    wrapItemlock: {
        padding:5,
        height: height/7,
        flexDirection: 'row',
        marginBottom:5,
        backgroundColor:'#ffc81e',
        borderRadius:3,
        shadowColor:'#000000',
        shadowOpacity:0.3,
        shadowRadius:5,
        shadowOffset:{width:0,height:0}
    },
    hinhAnh:{
        flex: 1
    },
    thongTin:{
        flex: 3.5,
        justifyContent:'center',
        color: '#1e90ff'
    },
    ten: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',


    },
    email: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    textTen:{
        fontWeight: 'bold',
        fontSize: 22,
        color: '#1e90ff'
    },
    textEmail:{
        fontWeight: 'bold',
        fontSize: 20
    }

});