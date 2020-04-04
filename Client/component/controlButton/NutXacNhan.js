import React, {useState} from 'react';
import {View, StyleSheet, Dimensions,Text} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
const {width,height} = Dimensions.get('window');

export default function NutXacNhan() {

    // const navigation = useNavigation();
    return (
        <View style={styles.container} >
            <Text style={{fontSize:20, paddingLeft:8,color:'white'}}>Xác Nhận</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        width:width/2.2,
        height:height/15,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        marginRight:16,
        marginTop:8,
        alignSelf:'center',
        backgroundColor:'#0033FF',
    }

});