import React from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Icon from "react-native-vector-icons/Foundation";
const {width,height} = Dimensions.get('window');
export default function NutXacNhanThem() {

    // const navigation = useNavigation();
    return (
        <View style={styles.container} >
            <Icon name={'page-add'} color={'black'} size={40}/>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        width:width/8,
        height:height/14
    }

});