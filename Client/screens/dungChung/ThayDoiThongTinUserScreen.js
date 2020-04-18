import React, {useEffect, useState} from 'react';
import {Alert, AsyncStorage, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from "react-redux";
import {apiLink} from "../../config/constant";
import {useNavigation} from "@react-navigation/native";
import RadioForm from "react-native-simple-radio-button";

const {width, height} = Dimensions.get('window');
const toDay = new Date();

export default function ThayDoiThongTinUserScreen({route}) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const thongTinUser = route.params.thongTinUser;
    const [khoaNutThem, setKhoaNutThem] = useState(false);
    const [trangThaiGioiTinh, setTrangThaiGioiTinh] = useState(thongTinUser.gioiTinh ? 0 : 1)
    const [hienThiPickerNgaySinh, setHienThiPickerNgaySinh] = useState(false);

    const [infor, setInfor] = useState({
        hoTen: '',
        gioiTinh: '',
        ngaySinh: new Date(),
        sdt: '',
        diaChi: '',
    });

    useEffect(() => {
        setInfor({
            hoTen: thongTinUser.hoTen,
            gioiTinh: thongTinUser.gioiTinh,
            ngaySinh: new Date(thongTinUser.ngaySinh),
            sdt: thongTinUser.sdt,
            diaChi: thongTinUser.diaChi,
        })
        setTrangThaiGioiTinh(infor.gioiTinh ? 0 : 1);
        dispatch({type: 'OPEN_DIALOG'});
    }, [])

    return (
        <KeyboardAwareScrollView
            style={styles.container} enableResetScrollToCoords={false}
        >
            <Text style={styles.text}>Họ tên</Text>
            <TextInput style={styles.textInput}
                       value={infor.hoTen}
                       placeholder="Họ tên"
                       onChangeText={(text) => setInfor({
                           ...infor,
                           hoTen: text

                       })}
            ></TextInput>
            <Text style={styles.text}>Giới tính</Text>
            <RadioForm
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#2196f3'}
                // animation={true}
                radio_props={[
                    {label: 'Nam', value: 0},
                    {label: 'Nữ', value: 1}
                ]}
                initial={trangThaiGioiTinh}
                onPress={(value) => setInfor({
                    ...infor,
                    gioiTinh: value == 0 ? true : false

                })}
            />
            <Text style={styles.text}>Ngày sinh</Text>

            <DateTimePickerModal isVisible={hienThiPickerNgaySinh}
                                 headerTextIOS={'Chọn ngày sinh'}
                                 confirmTextIOS={'Xác nhận'}
                                 mode={'date'}
                                 date={new Date(infor.ngaySinh)}
                                 onConfirm={(selectedDate) => {
                                     setHienThiPickerNgaySinh(false);
                                     setInfor({
                                         ...infor,
                                         ngaySinh: new Date(selectedDate)
                                     })

                                 }}
                                 onCancel={() => {
                                     setHienThiPickerNgaySinh(false);
                                 }}>

            </DateTimePickerModal>
            <TouchableOpacity onPress={() => setHienThiPickerNgaySinh(true)}>
                <Text
                    style={styles.datePickerInput}>{` ${infor.ngaySinh.getDate()}-${(infor.ngaySinh.getMonth() + 1)}-${infor.ngaySinh.getFullYear()}`}</Text>
            </TouchableOpacity>

            <Text style={styles.text}>Số điện thoại</Text>
            <TextInput style={styles.textInput}
                       value={infor.sdt}
                       placeholder="Số điện thoại"
                       onChangeText={(text) => setInfor({
                           ...infor,
                           sdt: text

                       })}
            ></TextInput>
            <Text style={styles.text}>Địa chỉ</Text>
            <TextInput style={styles.richTextInput}
                       value={infor.diaChi}
                       multiline={true}
                       placeholder="Địa chỉ"
                       onChangeText={(text) => setInfor({
                           ...infor,
                           diaChi: text
                       })}
            ></TextInput>


            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {
                if (khoaNutThem === false) {
                    setKhoaNutThem(true);
                    SuaThongTinUser().then(() => {
                        navigation.goBack();
                        dispatch({type: 'CLOSE_DIALOG'});
                        dispatch({type: 'REFRESH'});
                    })
                }

            }}>
                <View style={styles.buttonXacNhan}>
                    <Text style={styles.textXacNhan}>Cập nhật</Text>
                </View>

            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );

    async function SuaThongTinUser() {
        try {
            let token = await AsyncStorage.getItem('token');
            // let userName = await AsyncStorage.getItem('userName');
            let response = await fetch(apiLink + 'users?token=' + token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // username: userName,
                    hoTen: infor.hoTen,
                    gioiTinh: infor.gioiTinh,
                    ngaySinh: infor.ngaySinh,
                    diaChi: infor.diaChi,
                    sdt: infor.sdt,
                })
            })
            let responseJson = await response.json();
            if (responseJson.status == 'ok') {
                Alert.alert(responseJson.message);
                // dispatch({type: 'LOGIN'});
            } else if (responseJson.status == 'fail') {
                Alert.alert(responseJson.message);
            }
        } catch (e) {
            await Alert.alert(e.toString());
        }
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: height / 20,
        paddingHorizontal: height / 30
    },


    richTextInput: {
        borderWidth: 1,
        height: 80,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF",
        borderRadius: 3
    },
    text: {
        fontSize: 20
    },
    buttonXacNhan: {
        padding: 10,
        borderRadius: 5,
        fontWeight: 'bold',
        marginTop: '5%',
        marginBottom: '20%',
        backgroundColor: 'green'
    },
    textXacNhan: {
        color: '#ffffff',
        fontSize: 30,
    },
    textInput: {
        borderWidth: 1,
        height: 32,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF",
        borderRadius: 3
    },
    datePickerInput: {
        borderWidth: 1,
        height: 32,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF",
        borderRadius: 3,
        paddingTop: 7,
    },

});


