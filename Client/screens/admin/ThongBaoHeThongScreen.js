import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView, AsyncStorage, Button,Alert} from 'react-native';

export default function ThemChuChoVay({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Màn hình thông báo hệ thống</Text>
            <Button onPress={async () =>{
                await Alert.alert('Quay trở lại');
                await navigation.goBack();
            }}
                    title="Quay trở về"/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    thongTin: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: '2%'
    }

});

