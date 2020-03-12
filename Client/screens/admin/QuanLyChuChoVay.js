import React from 'react';
import {StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
export default class QuanLyChuChoVay extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Màn hình quản lý chủ cho vay</Text>
            </View>

        );
    }

}
const styles = StyleSheet.create({
   container:{
       alignItems:'center',
       justifyContent:'center',
       flex:1
   }
});

