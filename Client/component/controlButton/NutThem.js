import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
const {width,height} = Dimensions.get('window');
export default function NutThem() {

        // const navigation = useNavigation();
        return (
            <View style={styles.container} >
                   <Icon name={'md-add-circle-outline'} color={'black'} size={40}/>
            </View>
        );
}

const styles = StyleSheet.create({
    container:{
        width:width/8,
        height:height/14
    }

});