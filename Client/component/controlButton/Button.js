import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
const {width,height} = Dimensions.get('window');

export default function NutNhanTin(props) {

    const style = {
        borderRadius: 5,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: props.color
    }
    return (
        <View style={style} >
            <Text style={styles.loginName}>{props.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loginName: {
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    },

});