import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/core";
export default function NutThemChuChoVay() {

        const navigation = useNavigation();
        return (
            <View style={styles.container} >
               <TouchableOpacity onPress={()=> navigation.navigate('Thêm chủ cho vay')}>
                   <Icon name={'md-add-circle-outline'} color={'black'} size={40}/>
               </TouchableOpacity>
            </View>


        );


}
const styles = StyleSheet.create({
    container:{
        width:40,
        height:40
    },
    wrapMenu:{
        width:'100%',
        height:'5%',
        borderBottomColor:'#a9a9a9',
        borderBottomWidth:1
    }

});