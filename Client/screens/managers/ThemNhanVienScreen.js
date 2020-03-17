import React, {useState} from 'react';
import {Text, View, StyleSheet, Button,Alert} from 'react-native';

export default function ThemNhanVienScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Màn hình thêm nhân viên</Text>
            <Button onPress={async () =>{
                await Alert.alert('Thêm thành công');
                await navigation.goBack();
            }}
                    title="Thêm"/>
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

