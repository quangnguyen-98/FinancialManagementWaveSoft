import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
const {width,height} = Dimensions.get('window');
export default function NutXoa() {

    // const navigation = useNavigation();
    return (
        <View style={styles.container} >
            <Icon name={'trash-o'} color={'black'} size={40}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width:width/8,
        height:height/14
    }

});