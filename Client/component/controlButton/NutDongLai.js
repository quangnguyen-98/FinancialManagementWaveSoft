import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
const {width,height} = Dimensions.get('window');
export default function NutDongLai() {
    // const navigation = useNavigation();
    return (
        <View style={styles.container} >
            <Icon name={'ios-cash'} color={'black'} size={40}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width:width/8,
        height:height/14
    }

});