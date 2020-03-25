import React, {useState} from 'react';
import {Text, View, StyleSheet, } from 'react-native';
export default function ThongTinUserTheoDong(props) {
    return (
        <View style={styles.wrapItem}>
            <Text style={styles.itemLeft} >{props.tieuDe}</Text>
            <Text style={styles.itemRight}>{props.giaTri}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    wrapItem:{
        width:'100%',
        height:'10%',
        flexDirection:'row',
        borderBottomColor:'#a9a9a9',
        borderBottomWidth:1,
        marginVertical:10
    },
    itemLeft:{
        flex:1,
        fontWeight:'bold',
        fontSize:22,
        paddingLeft:'8%'

    },
    itemRight:{
        flex:2,
        fontWeight:'bold',
        fontSize:22,
        paddingLeft:'10%',
        color:'#1e90ff'

    }

});