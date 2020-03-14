import React,{useState} from 'react';
import {Text,View,StyleSheet,TextInput, Button,Image,TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function QLHDComponent(){
    const navigation = useNavigation();
    return(
        <View style={styles.item}>
                            <TouchableOpacity style={styles.item2} onPress={() => navigation.navigate('QLHD')}>
                            <Image style={styles.icon} source={require('../assets/contract.png')}></Image>
                            <Text style={styles.text3}>Quản lý hợp đồng</Text>
                            </TouchableOpacity>                            
                        </View>
    );
}

const styles = StyleSheet.create({
    item:{
        width: '50%',
        height:112,
        justifyContent:'center',
        alignItems:'center',
        marginTop:16
    },
    icon:{
        width:64,
        height:64,
    },
    text3:{
        paddingTop:10,
        fontWeight:'bold'
    },
    item2:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    }
});