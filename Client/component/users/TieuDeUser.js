import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button, Image, TouchableOpacity, Alert, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class TieuDeUser extends React.Component {
    render() {
        return (
            <View style={styles.wraper}>

                    <View style={styles.KH_image} >
                        {/*<Icon  name='face-outline' color='black' size={110}/>*/}
                        <Image source={{url: this.props.hinhAnh.toString()}} style={{width: '100%', height: '100%'}} />
                    </View>
                    <View style={styles.KH_info}>
                        <Text style={styles.text1}>{this.props.hoTen}</Text>
                        <Text style={styles.text2}> {this.props.email}</Text>
                    </View>

            </View>
        );
    }

}
const styles = StyleSheet.create({
    wraper: {
        flex: 1,
        backgroundColor: "#1e90ff",
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: '2%',
        paddingBottom: '0.5%',
        paddingLeft: '2%',
        borderRadius:2,
        shadowColor:'#000000',
        shadowOpacity:0.3,
        shadowRadius:5,
        shadowOffset:{width:0,height:0}
    },
    KH_image: {
        flex:3,
        width: '100%',
        height: '100%',
        borderWidth: 1,
        justifyContent:'center',
        alignItems: 'center',

    },
    KH_info: {
        flex:5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text1: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: 'bold'
    },
    text2: {
        color: "#FFFFFF",
        fontSize: 17,
        paddingTop: '2%'
    }

});

