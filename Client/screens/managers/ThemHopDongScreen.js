import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, AsyncStorage, Button, Alert, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native';
import RadioForm, { RadioButton, RadioButtonLabel, RadioButtonInput } from 'react-native-simple-radio-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import {apiLink} from "../../config/constant";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function ThemHopDongScreen({ navigation }) {

    const [dateNgaySinh, setDateNgaySinh] = useState(new Date().getDate());
    const [dateNgayVay, setDateNgayVay] = useState(new Date().getDate());
    const [dateNgayTraGoc, setDateNgayTraGoc] = useState(new Date().getDate());
    // const [source,setSource] = useState(null);

    // const selectImage = async()=>{
    //     ImagePicker.showImagePicker({noData:true,mediaType:'photo'},(response) => {
    //         console.log('Response = ', response);

    //         if (response.didCancel) {
    //           console.log('User cancelled image picker');
    //         } else if (response.error) {
    //           console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //           console.log('User tapped custom button: ', response.customButton);
    //         } else {

    //           // You can also display the image using data:
    //           // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    //           setSource(response.uri);
    //         }
    //       });


    // }
    const [value, setValue] = useState(0);

    var theloaivay = [
        { label: 'Ngày', value: 0 },
        { label: 'Tháng', value: 1 },
    ];



    function _onPress(value) {
        setValue(value);
    }

    function _onDateChange(value) {
        setDateNgayTraGoc(value);
    }



    const [infoHD, setInfoHD] = useState({
        tenKhachHang: '',
        diaChi: '',
        thongTinCMT: {
            idCMT: '',
            noiCap: ''
        },
        ngaySinh: {
            ngay: '',
            thang: '',
            nam: ''
        },
        sdt: '',
        thongTinHopDong: {
            ngayVay: {
                ngay: '',
                thang: '',
                nam: ''
            },
            tongTienVay: '',
            kyDongLai: '',
            soLanTra: '',
            tinChap: ''
        }


    })

    function _onDateChangeNgaySinh(date) {
        setDateNgaySinh(date);
        setInfoHD({
            tenKhachHang: infoHD.tenKhachHang,
            diaChi: infoHD.diaChi,
            thongTinCMT: {
                idCMT: infoHD.thongTinCMT.idCMT.toString(),
                noiCap: infoHD.thongTinCMT.noiCap
            },
            ngaySinh: {
                ngay: new Date(dateNgaySinh).getDay(),
                thang: new Date(dateNgaySinh).getMonth()+1,
                nam: new Date(dateNgaySinh).getFullYear()
            },
            sdt: infoHD.sdt,
            thongTinHopDong: {
                ngayVay: {
                    ngay: infoHD.thongTinHopDong.ngayVay.ngay,
                    thang: infoHD.thongTinHopDong.ngayVay.thang,
                    nam: infoHD.thongTinHopDong.ngayVay.nam
                },
                tongTienVay: infoHD.thongTinHopDong.tongTienVay,
                kyDongLai: infoHD.thongTinHopDong.kyDongLai,
                soLanTra: infoHD.thongTinHopDong.soLanTra,
                tinChap: infoHD.thongTinHopDong.tinChap
            }

        })
    }

    function _onDateChangeNgayVay(date) {
        setDateNgayVay(date);
        setInfoHD({
            tenKhachHang: infoHD.tenKhachHang,
            diaChi: infoHD.diaChi,
            thongTinCMT: {
                idCMT: infoHD.thongTinCMT.idCMT,
                noiCap: infoHD.thongTinCMT.noiCap
            },
            ngaySinh: {
                ngay: infoHD.ngaySinh.ngay,
                thang: infoHD.ngaySinh.thang,
                nam: infoHD.ngaySinh.nam
            },
            sdt: infoHD.sdt,
            thongTinHopDong: {
                ngayVay: {
                    ngay: new Date(dateNgayVay).getDay(),
                    thang: new Date(dateNgayVay).getMonth()+1,
                    nam: new Date(dateNgayVay).getFullYear()
                },
                tongTienVay: infoHD.thongTinHopDong.tongTienVay,
                kyDongLai: infoHD.thongTinHopDong.kyDongLai,
                soLanTra: infoHD.thongTinHopDong.soLanTra,
                tinChap: infoHD.thongTinHopDong.tinChap
            }

        })
    }



    return (
        <KeyboardAwareScrollView style={{ flex: 1, flexDirection: 'column', marginTop: windowHeight / 15 }}>
            <View style={styles.containerKH}>

                <Text style={{ fontSize: 24, fontWeight: 'bold', marginHorizontal: 8 }}>Thông Tin Khách Hàng Vay</Text>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        marginHorizontal: 8
                    }}
                />
                <View style={styles.thongTin}>
                    <Text style={styles.input}>Họ Tên: </Text>
                    <TextInput placeholder="Nhập họ tên khách hàng" style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1 }}
                        onChangeText={(text) => {
                            setInfoHD({
                                tenKhachHang: text,
                                diaChi: infoHD.diaChi,
                                thongTinCMT: {
                                    idCMT: infoHD.thongTinCMT.idCMT,
                                    noiCap: infoHD.thongTinCMT.noiCap
                                },
                                ngaySinh: {
                                    ngay: infoHD.ngaySinh.ngay,
                                    thang: infoHD.ngaySinh.thang,
                                    nam: infoHD.ngaySinh.nam
                                },
                                sdt: infoHD.sdt,
                                thongTinHopDong: {
                                    ngayVay: {
                                        ngay: infoHD.thongTinHopDong.ngayVay.ngay,
                                        thang: infoHD.thongTinHopDong.ngayVay.thang,
                                        nam: infoHD.thongTinHopDong.ngayVay.nam
                                    },
                                    tongTienVay: infoHD.thongTinHopDong.tongTienVay,
                                    kyDongLai: infoHD.thongTinHopDong.kyDongLai,
                                    soLanTra: infoHD.thongTinHopDong.soLanTra,
                                    tinChap: infoHD.thongTinHopDong.tinChap
                                }

                            })

                        }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Địa Chỉ: </Text>
                    <TextInput placeholder="Nhập địa chỉ" style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1 }}
                        onChangeText={(text) => {
                            setInfoHD({
                                tenKhachHang: infoHD.tenKhachHang,
                                diaChi: text,
                                thongTinCMT: {
                                    idCMT: infoHD.thongTinCMT.idCMT,
                                    noiCap: infoHD.thongTinCMT.noiCap
                                },
                                ngaySinh: {
                                    ngay: infoHD.ngaySinh.ngay,
                                    thang: infoHD.ngaySinh.thang,
                                    nam: infoHD.ngaySinh.nam
                                },
                                sdt: infoHD.sdt,
                                thongTinHopDong: {
                                    ngayVay: {
                                        ngay: infoHD.thongTinHopDong.ngayVay.ngay,
                                        thang: infoHD.thongTinHopDong.ngayVay.thang,
                                        nam: infoHD.thongTinHopDong.ngayVay.nam
                                    },
                                    tongTienVay: infoHD.thongTinHopDong.tongTienVay,
                                    kyDongLai: infoHD.thongTinHopDong.kyDongLai,
                                    soLanTra: infoHD.thongTinHopDong.soLanTra,
                                    tinChap: infoHD.thongTinHopDong.tinChap
                                }

                            })
                        }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Số CMT: </Text>
                    <TextInput placeholder="Nhập số chứng minh thư" keyboardType={"number-pad"} style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1 }}
                        onChangeText={(text) => {
                            setInfoHD({
                                tenKhachHang: infoHD.tenKhachHang,
                                diaChi: infoHD.diaChi,
                                thongTinCMT: {
                                    idCMT: text,
                                    noiCap: infoHD.thongTinCMT.noiCap
                                },
                                ngaySinh: {
                                    ngay: infoHD.ngaySinh.ngay,
                                    thang: infoHD.ngaySinh.thang,
                                    nam: infoHD.ngaySinh.nam
                                },
                                sdt: infoHD.sdt,
                                thongTinHopDong: {
                                    ngayVay: {
                                        ngay: infoHD.thongTinHopDong.ngayVay.ngay,
                                        thang: infoHD.thongTinHopDong.ngayVay.thang,
                                        nam: infoHD.thongTinHopDong.ngayVay.nam
                                    },
                                    tongTienVay: infoHD.thongTinHopDong.tongTienVay,
                                    kyDongLai: infoHD.thongTinHopDong.kyDongLai,
                                    soLanTra: infoHD.thongTinHopDong.soLanTra,
                                    tinChap: infoHD.thongTinHopDong.tinChap
                                }

                            })
                        }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Nơi Cấp: </Text>
                    <TextInput placeholder="Nhập nơi cấp CMT" style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1 }}
                        onChangeText={(text) => {
                            setInfoHD({
                                tenKhachHang: infoHD.tenKhachHang,
                                diaChi: infoHD.diaChi,
                                thongTinCMT: {
                                    idCMT: infoHD.thongTinCMT.idCMT,
                                    noiCap: text
                                },
                                ngaySinh: {
                                    ngay: infoHD.ngaySinh.ngay,
                                    thang: infoHD.ngaySinh.thang,
                                    nam: infoHD.ngaySinh.nam
                                },
                                sdt: infoHD.sdt,
                                thongTinHopDong: {
                                    ngayVay: {
                                        ngay: infoHD.thongTinHopDong.ngayVay.ngay,
                                        thang: infoHD.thongTinHopDong.ngayVay.thang,
                                        nam: infoHD.thongTinHopDong.ngayVay.nam
                                    },
                                    tongTienVay: infoHD.thongTinHopDong.tongTienVay,
                                    kyDongLai: infoHD.thongTinHopDong.kyDongLai,
                                    soLanTra: infoHD.thongTinHopDong.soLanTra,
                                    tinChap: infoHD.thongTinHopDong.tinChap
                                }

                            })
                        }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Ngày Sinh: </Text>
                    <DatePicker style={styles.datepicker}
                        date={dateNgaySinh}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => { _onDateChangeNgaySinh(date) }}
                    ></DatePicker>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Số điện thoại: </Text>
                    <TextInput placeholder="Nhập số điện thoại" keyboardType={"number-pad"} style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1 }}
                        onChangeText={(text) => {
                            setInfoHD({
                                tenKhachHang: infoHD.tenKhachHang,
                                diaChi: infoHD.diaChi,
                                thongTinCMT: {
                                    idCMT: infoHD.thongTinCMT.idCMT,
                                    noiCap: infoHD.thongTinCMT.noiCap
                                },
                                ngaySinh: {
                                    ngay: infoHD.ngaySinh.ngay,
                                    thang: infoHD.ngaySinh.thang,
                                    nam: infoHD.ngaySinh.nam
                                },
                                sdt: text,
                                thongTinHopDong: {
                                    ngayVay: {
                                        ngay: infoHD.thongTinHopDong.ngayVay.ngay,
                                        thang: infoHD.thongTinHopDong.ngayVay.thang,
                                        nam: infoHD.thongTinHopDong.ngayVay.nam
                                    },
                                    tongTienVay: infoHD.thongTinHopDong.tongTienVay,
                                    kyDongLai: infoHD.thongTinHopDong.kyDongLai,
                                    soLanTra: infoHD.thongTinHopDong.soLanTra,
                                    tinChap: infoHD.thongTinHopDong.tinChap
                                }

                            })
                        }}></TextInput>
                </View>


            </View>
            <View style={styles.containerHD}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginHorizontal: 8 }}>Thông Tin Hợp Đồng</Text>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        marginHorizontal: 8
                    }}
                />
                <View style={styles.thongTin}>
                    <Text style={styles.input}>Ngày Vay: </Text>
                    <DatePicker style={styles.datepicker}
                        date={dateNgayVay}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => { _onDateChangeNgayVay(date) }}
                    ></DatePicker>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Tổng Tiền Vay: </Text>
                    <TextInput placeholder="Nhập số tiền vay" keyboardType={"number-pad"} style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1 }}
                        onChangeText={(text) => {
                            setInfoHD({
                                tenKhachHang: infoHD.tenKhachHang,
                                diaChi: infoHD.diaChi,
                                thongTinCMT: {
                                    idCMT: infoHD.thongTinCMT.idCMT,
                                    noiCap: infoHD.thongTinCMT.noiCap
                                },
                                ngaySinh: {
                                    ngay: infoHD.ngaySinh.ngay,
                                    thang: infoHD.ngaySinh.thang,
                                    nam: infoHD.ngaySinh.nam
                                },
                                sdt: infoHD.sdt,
                                thongTinHopDong: {
                                    ngayVay: {
                                        ngay: infoHD.thongTinHopDong.ngayVay.ngay,
                                        thang: infoHD.thongTinHopDong.ngayVay.thang,
                                        nam: infoHD.thongTinHopDong.ngayVay.nam
                                    },
                                    tongTienVay: text,
                                    kyDongLai: infoHD.thongTinHopDong.kyDongLai,
                                    soLanTra: infoHD.thongTinHopDong.soLanTra,
                                    tinChap: infoHD.thongTinHopDong.tinChap
                                }

                            })
                        }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Hình thức đóng lãi: </Text>
                    <RadioForm radio_props={theloaivay}
                        animation={true}
                        initial={0}
                        onPress={(value) => { _onPress(value) }}
                        formHorizontal={true}>
                    </RadioForm>
                </View>

                <View style={{ flexDirection: 'column', marginHorizontal: 8, display: value === 0 ? '' : 'none' }}>
                    <Text style={styles.input}>Lãi triệu/ngày: </Text>
                    <TextInput placeholder="Nhập tiền lãi trên 1 triệu/1 ngày" keyboardType={"number-pad"} style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1 }}></TextInput>
                </View>

                <View style={{ flexDirection: 'column', marginHorizontal: 8, display: value === 1 ? '' : 'none' }}>
                    <Text style={styles.input}>Lãi %/tháng: </Text>
                    <TextInput placeholder="Nhập % lãi trên 1 tháng" keyboardType={"number-pad"} style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1 }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Kỳ đóng lãi: </Text>
                    <TextInput keyboardType={"number-pad"} placeholder="Nhập số ngày hoặc tháng nộp lãi 1 lần" style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1 }}
                        onChangeText={(text) => {
                            setInfoHD({
                                tenKhachHang: infoHD.tenKhachHang,
                                diaChi: infoHD.diaChi,
                                thongTinCMT: {
                                    idCMT: infoHD.thongTinCMT.idCMT,
                                    noiCap: infoHD.thongTinCMT.noiCap
                                },
                                ngaySinh: {
                                    ngay: infoHD.ngaySinh.ngay,
                                    thang: infoHD.ngaySinh.thang,
                                    nam: infoHD.ngaySinh.nam
                                },
                                sdt: infoHD.sdt,
                                thongTinHopDong: {
                                    ngayVay: {
                                        ngay: infoHD.thongTinHopDong.ngayVay.ngay,
                                        thang: infoHD.thongTinHopDong.ngayVay.thang,
                                        nam: infoHD.thongTinHopDong.ngayVay.nam
                                    },
                                    tongTienVay: infoHD.thongTinHopDong.tongTienVay,
                                    kyDongLai: text,
                                    soLanTra: infoHD.thongTinHopDong.soLanTra,
                                    tinChap: infoHD.thongTinHopDong.tinChap
                                }

                            })
                        }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Số lần trả: </Text>
                    <TextInput keyboardType={"number-pad"} placeholder="Nhập số lần trả lãi khách muốn vay" style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1 }}
                        onChangeText={(text) => {
                            setInfoHD({
                                tenKhachHang: infoHD.tenKhachHang,
                                diaChi: infoHD.diaChi,
                                thongTinCMT: {
                                    idCMT: infoHD.thongTinCMT.idCMT,
                                    noiCap: infoHD.thongTinCMT.noiCap
                                },
                                ngaySinh: {
                                    ngay: infoHD.ngaySinh.ngay,
                                    thang: infoHD.ngaySinh.thang,
                                    nam: infoHD.ngaySinh.nam
                                },
                                sdt: infoHD.sdt,
                                thongTinHopDong: {
                                    ngayVay: {
                                        ngay: infoHD.thongTinHopDong.ngayVay.ngay,
                                        thang: infoHD.thongTinHopDong.ngayVay.thang,
                                        nam: infoHD.thongTinHopDong.ngayVay.nam
                                    },
                                    tongTienVay: infoHD.thongTinHopDong.tongTienVay,
                                    kyDongLai: infoHD.thongTinHopDong.kyDongLai,
                                    soLanTra: text,
                                    tinChap: infoHD.thongTinHopDong.tinChap
                                }

                            })
                        }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Tín chấp: </Text>
                    <TextInput placeholder="Nhập tài sản thế chấp" style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1 }}
                        onChangeText={(text) => {
                            setInfoHD({
                                tenKhachHang: infoHD.tenKhachHang,
                                diaChi: infoHD.diaChi,
                                thongTinCMT: {
                                    idCMT: infoHD.thongTinCMT.idCMT,
                                    noiCap: infoHD.thongTinCMT.noiCap
                                },
                                ngaySinh: {
                                    ngay: infoHD.ngaySinh.ngay,
                                    thang: infoHD.ngaySinh.thang,
                                    nam: infoHD.ngaySinh.nam
                                },
                                sdt: infoHD.sdt,
                                thongTinHopDong: {
                                    ngayVay: {
                                        ngay: infoHD.thongTinHopDong.ngayVay.ngay,
                                        thang: infoHD.thongTinHopDong.ngayVay.thang,
                                        nam: infoHD.thongTinHopDong.ngayVay.nam
                                    },
                                    tongTienVay: infoHD.thongTinHopDong.tongTienVay,
                                    kyDongLai: infoHD.thongTinHopDong.kyDongLai,
                                    soLanTra: infoHD.thongTinHopDong.soLanTra,
                                    tinChap: text
                                }

                            })
                        }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Ngày trả gốc: </Text>
                    <DatePicker style={styles.datepicker}
                        date={dateNgayTraGoc}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => { _onDateChange(date) }}
                    ></DatePicker>
                </View>

            </View>

            <TouchableOpacity onPress={() => {
                ThemHopDong2();
            }}
                title="Thêm" fontSize={1} >
                <View style={styles.button} >
                    <Text style={styles.loginName}>Thêm</Text>
                </View>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );

    async function ThemHopDong2() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/hopdongs?token=' + token, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tenKhachHang: infoHD.tenKhachHang,
                    diaChi: infoHD.diaChi,
                    thongTinCMT: {
                        idCMT: infoHD.thongTinCMT.idCMT,
                        noiCap: infoHD.thongTinCMT.noiCap
                    },
                    ngaySinh: {
                        ngay: infoHD.ngaySinh.ngay,
                        thang: infoHD.ngaySinh.thang,
                        nam: infoHD.ngaySinh.nam
                    },
                    sdt: infoHD.sdt,
                    thongTinHopDong: {
                        ngayVay: {
                            ngay: infoHD.thongTinHopDong.ngayVay.ngay,
                            thang: infoHD.thongTinHopDong.ngayVay.thang,
                            nam: infoHD.thongTinHopDong.ngayVay.nam
                        },
                        tongTienVay: infoHD.thongTinHopDong.tongTienVay,
                        kyDongLai: infoHD.thongTinHopDong.kyDongLai,
                        soLanTra: infoHD.thongTinHopDong.soLanTra,
                        tinChap: infoHD.thongTinHopDong.tinChap
                    }

                })
            })
            let responseJson = await response.json();
            if (responseJson.status == 'ok') {
                Alert.alert('Thêm thành công !');
                navigation.goBack();
            } else if (responseJson.status == 'fail') {
                Alert.alert(responseJson.message);
                // navigation.goBack();
            }

        } catch (e) {
            await Alert.alert(e.toString());
        }
    }
}

export default ThemHopDongScreen;


const styles = StyleSheet.create({
    container: {

    },
    containerKH: {

    },
    containerHD: {
        marginTop: windowHeight / 30,
    },
    thongTin: {
        flexDirection: 'column',
        marginHorizontal: 8
    },
    input: {
        fontSize: 16,
        paddingTop: 8
    },
    datepicker: {
        width: windowWidth,
    },
    button: {
        borderWidth: 1,
        marginTop: windowHeight / 80,
        borderRadius: 5,
        height: windowHeight / 15,
        width: windowWidth / 2,
        backgroundColor: '#FF0000',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: windowWidth / 4,
        marginBottom: windowHeight / 10
    },
    loginName: {
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        color: 'white'
    },

});

