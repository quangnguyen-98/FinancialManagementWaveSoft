import React, { useState } from 'react';
import { Alert, AsyncStorage, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../../component/controlButton/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { apiLink } from "../../config/constant";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { width, height } = Dimensions.get('window');
export default function ModalXoaHopDong() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [khoaNutXoa, setKhoaNutXoa] = useState(false);
    const hopDongDuocChonReducers = useSelector(state => state.hopDongDuocChonReducers);
    const [thongTinMatKhau, setThongTinMatKhau] = useState('');
    return (
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
            <KeyboardAwareScrollView style={styles.wraperContentHopDong}>
                <Text style={{ alignSelf: 'center', fontSize: 26, fontWeight: '900', color: 'red' }}>Xóa hợp đồng</Text>
                <View style={{ flexDirection: 'column', marginTop: 20 }}>
                    <Text style={styles.input}>Nhập mật khẩu để xóa.Lưu ý sau khi xóa sẽ không thể khôi phục trạng thái hợp đồng.</Text>
                    <TextInput style={styles.textInput} maxLength={25} keyboardType={'visible-password'}
                        onChangeText={(text) => { setThongTinMatKhau(text) }} />
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '10%', flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.sizeButton}
                            onPress={() => { dispatch({ type: 'CLOSE_MODAL_XOAHOPDONG' }) }}
                        >
                            <Button name={'Hủy'} color={'#1890ff'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sizeButton}
                            onPress={() => {
                                // console.log(thongTinGiaHan.soLanThem);
                                if (khoaNutXoa === false) {
                                    setKhoaNutXoa(true);
                                    XoaHopDong().then((res) => {
                                        if (res.status === 'ok') {
                                            Alert.alert('Xóa thành công !', null,
                                                [
                                                    {
                                                        text: 'Ok', onPress: () => {
                                                            navigation.goBack();
                                                            dispatch({ type: 'CLOSE_MODAL_XOAHOPDONG' });
                                                            dispatch({ type: 'REFRESH' });
                                                        }
                                                    }
                                                ]
                                            );
                                        } else if (res.status === 'fail') {
                                            Alert.alert(res.message);
                                        }
                                    }).then(() => {
                                        setKhoaNutXoa(false);
                                    })

                                }
                            }}
                        >
                            <Button name={'Xác nhận'} color={'green'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );

    async function XoaHopDong() {
        try {
            let token = await AsyncStorage.getItem('token');

            let checkPass = await fetch(apiLink + 'auth/checkpasstruockhixoa?password=' + thongTinMatKhau + '&token=' + token);
            let checkPassJson = await checkPass.json();
            if (checkPassJson.status === 'fail') {
                return checkPassJson;
            }
            let response = await fetch(apiLink + 'managers/xoahopdongs?token=' + token, {
                method: 'PUT',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idHopDong: hopDongDuocChonReducers,
                })
            });
            let responseJson = await response.json();
            return responseJson;
        } catch (e) {

            console.log(JSON.stringify(e));
        }
    }
}
const styles = StyleSheet.create({
    wraperContentHopDong: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: width / 12,
        paddingVertical: height / 25,
        paddingHorizontal: width / 30,
        marginVertical: height / 4,
        borderRadius: 10,
        flex: 1
    },
    input: {
        fontSize: 16,
        paddingTop: 8
    },
    textInput: {
        borderWidth: 1,
        height: 32,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF",
        borderRadius: 3
    },
    richTextInput: {
        borderWidth: 1,
        height: 80,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF",
        borderRadius: 3
    },
    sizeButton: {
        width: width * 0.3,
        height: height / 10,
        marginHorizontal: 15
    }
});
