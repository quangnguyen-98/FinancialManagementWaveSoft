import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, ScrollView, AsyncStorage, Button, Alert, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native';
import RadioForm, { RadioButton, RadioButtonLabel, RadioButtonInput } from 'react-native-simple-radio-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import {apiLink} from "../../config/constant";
import DateTimePicker from '@react-native-community/datetimepicker';
const {width,height } = Dimensions.get('window');
const toDay = new Date();
export default function ThemHopDongScreen({ navigation }) {

    const [dateNgayTraGoc, setDateNgayTraGoc] = useState(null);
    const [cachTinhLai, setCachTinhLai] = useState(0);
    const [kieuDongLai, setKieuDongLai] = useState(0);
    const [inforHD, setInforHD] = useState({
        tenKhachHang: '',
        sdt: '',
        email:'',
        diaChi: '',
        thongTinCMT: {
            idCMT: '',
            noiCap: ''
        },
        ngaySinh: new Date(),
        thongTinHopDong: {
            ngayVay: new Date(),
            tongTienVay: '',
            soKyDongLai: null,
            cachTinhLai:'',
            giaTriLaiSuat:'',
            soLanTra: null,
            kieuDongLai:'',
            tinChap: '',
            ghiChu:''
        }
    });

    useEffect(()=>{
        setInforHD({
            ...inforHD,
            thongTinHopDong:{
                ...inforHD.thongTinHopDong,
                cachTinhLai:0
            }
        });
    },[]);
    useEffect(()=>{
        tinhNgayTraGoc(inforHD.thongTinHopDong.ngayVay,inforHD.thongTinHopDong.soKyDongLai,inforHD.thongTinHopDong.cachTinhLai,inforHD.thongTinHopDong.soLanTra);
    },[inforHD.thongTinHopDong]);

    return (
        <KeyboardAwareScrollView style={{ flex: 1, flexDirection: 'column', paddingTop: height / 15 }}>
            <View>

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
                    <TextInput placeholder="Nhập họ tên khách hàng" style={styles.textInput}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       tenKhachHang: text
                                   })

                               }}></TextInput>
                </View>
                <View style={styles.thongTin}>
                    <Text style={styles.input}>Số điện thoại: </Text>
                    <TextInput placeholder="Nhập số điện thoại" keyboardType={"number-pad"} style={styles.textInput}
                               onChangeText={(text) => {
                                   setInforHD({
                                        ...inforHD,
                                       sdt: text
                                   })
                               }}></TextInput>
                </View>
                <View style={styles.thongTin}>
                    <Text style={styles.input}>Email: </Text>
                    <TextInput placeholder="Nhập email" keyboardType={"default"} style={styles.textInput}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       email:text
                                   })
                               }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Địa Chỉ: </Text>
                    <TextInput placeholder="Nhập địa chỉ" style={styles.richTextInput}
                               multiline={true}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       diaChi: text
                                   })
                               }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Số CMT: </Text>
                    <TextInput placeholder="Nhập số chứng minh thư" keyboardType={"number-pad"} style={styles.textInput}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       thongTinCMT: {
                                           ...inforHD.thongTinCMT,
                                           idCMT: text
                                       }
                                   })
                               }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Nơi Cấp: </Text>
                    <TextInput placeholder="Nhập nơi cấp CMT" style={styles.textInput}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       thongTinCMT: {
                                           ...inforHD.thongTinCMT,
                                           noiCap: text
                                       }
                                   })
                               }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Ngày Sinh: </Text>
                    <DatePicker style={{width: '100%'}}
                                date={inforHD.ngaySinh}
                                mode="date"
                                placeholder="Chọn ngày"
                                format="YYYY-MM-DD"
                                confirmBtnText="Xác nhận"
                                cancelBtnText="Trở lại"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={(date) => {
                                    setInforHD({
                                        ...inforHD,
                                        ngaySinh: date
                                    })
                                }}
                    ></DatePicker>
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
                    <DatePicker style={{width: '100%'}}
                                date={inforHD.thongTinHopDong.ngayVay}
                                mode="date"
                                placeholder="Chọn ngày"
                                format="YYYY-MM-DD"
                                confirmBtnText="Xác nhận"
                                cancelBtnText="Trở lại"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {
                                    setInforHD({
                                        ...inforHD,
                                        thongTinHopDong: {
                                            ...inforHD.thongTinHopDong,
                                            ngayVay: date
                                        }
                                    })
                                }}
                    ></DatePicker>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Tổng Tiền Vay: </Text>
                    <TextInput placeholder="Nhập số tiền vay" keyboardType={"number-pad"} style={styles.textInput}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       thongTinHopDong: {
                                           ...inforHD.thongTinHopDong,
                                           tongTienVay: parseInt(text)
                                       }
                                   });

                               }}
                    />
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Kỳ đóng lãi: </Text>
                    <TextInput keyboardType={"number-pad"} placeholder="Nhập số ngày hoặc tháng nộp lãi 1 lần" style={styles.textInput}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       thongTinHopDong: {
                                           ...inforHD.thongTinHopDong,
                                           soKyDongLai: parseInt(text)
                                       }
                                   });

                               }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Cách tính lãi: </Text>
                    <RadioForm radio_props={[
                        { label: 'Ngày', value: 0 },
                        { label: 'Tháng', value: 1 },
                    ]}
                               // animation={true}
                               initial={0}
                               formHorizontal={true}
                               onPress={(value) => {
                                   switch (value) {
                                       case 0:{
                                           setCachTinhLai(value);
                                           setInforHD({
                                               ...inforHD,
                                               thongTinHopDong:{
                                                   ...inforHD.thongTinHopDong,
                                                   cachTinhLai:0,
                                                   giaTriLaiSuat:0
                                               }
                                           });
                                           break;
                                       }
                                       case 1:{
                                           setCachTinhLai(value);
                                           setInforHD({
                                               ...inforHD,
                                               thongTinHopDong:{
                                                   ...inforHD.thongTinHopDong,
                                                   cachTinhLai:1,
                                                   giaTriLaiSuat:0
                                               }
                                           });
                                           break;
                                       }
                                   }
                               }}
                    />
                </View>
                {
                    cachTinhLai == 0 &&(
                        <View style={styles.thongTin}>
                            <Text style={styles.input}>Lãi/triệu/ngày: </Text>
                            <TextInput placeholder="Nhập tiền lãi /triệu/ngày" keyboardType={"number-pad"} style={styles.textInput}

                                       onChangeText={(text)=>{
                                           setInforHD({
                                               ...inforHD,
                                               thongTinHopDong:{
                                                   ...inforHD.thongTinHopDong,
                                                   giaTriLaiSuat:parseInt(text)
                                               }
                                           })
                                       }}
                            />
                        </View>
                    )
                }
                {
                    cachTinhLai == 1 &&(
                        <View style={styles.thongTin}>
                            <Text style={styles.input}>Lãi %/tháng: </Text>
                            <TextInput placeholder="Nhập % lãi trên 1 tháng" keyboardType={"number-pad"} style={styles.textInput}

                                        onChangeText={(text)=>{
                                            setInforHD({
                                                ...inforHD,
                                                thongTinHopDong:{
                                                    ...inforHD.thongTinHopDong,
                                                    giaTriLaiSuat:parseInt(text)
                                                }
                                            })
                                        }}
                            />
                        </View>
                    )
                }



                <View style={styles.thongTin}>
                    <Text style={styles.input}>Số lần trả: </Text>
                    <TextInput keyboardType={"number-pad"} placeholder="Nhập số lần trả lãi" style={styles.textInput}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       thongTinHopDong: {
                                           ...inforHD.thongTinHopDong,
                                           soLanTra: parseInt(text)
                                       }
                                   });

                               }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Ngày trả gốc: </Text>
                    <DatePicker
                        date={dateNgayTraGoc}
                        mode="date"
                        onDateChange={(date) => {
                            setDateNgayTraGoc(date)
                        }}
                        style={{width: '100%'}}
                        placeholder="Chọn ngày"
                        format="YYYY-MM-DD"
                        confirmBtnText="Xác nhận"
                        cancelBtnText="Trở lại"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                    ></DatePicker>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Kiểu đóng lãi: </Text>
                    <RadioForm radio_props={[
                        { label: 'Trước', value: 0 },
                        { label: 'Sau', value: 1 },
                    ]}
                        // animation={true}
                               initial={0}
                               formHorizontal={true}
                               onPress={(value) => {
                                   switch (value) {
                                       case 0:{
                                           setKieuDongLai(value);
                                           setInforHD({
                                               ...inforHD,
                                               thongTinHopDong:{
                                                   ...inforHD.thongTinHopDong,
                                                   kieuDongLai:0
                                               }
                                           });
                                           break;
                                       }
                                       case 1:{
                                           setCachTinhLai(value);
                                           setInforHD({
                                               ...inforHD,
                                               thongTinHopDong:{
                                                   ...inforHD.thongTinHopDong,
                                                   kieuDongLai:1
                                               }
                                           });
                                           break;
                                       }
                                   }
                               }}
                    />
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Tín chấp: </Text>
                    <TextInput placeholder="Nhập tài sản thế chấp" style={styles.textInput}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       thongTinHopDong: {
                                           ...inforHD.thongTinHopDong,
                                           tinChap: text
                                       }
                                   })
                               }}></TextInput>
                </View>
                <View style={styles.thongTin}>
                    <Text style={styles.input}>Ghi chú: </Text>
                    <TextInput placeholder="Nhập ghi chú nếu có" style={styles.textInput}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       thongTinHopDong: {
                                           ...inforHD.thongTinHopDong,
                                           ghiChu: text
                                       }
                                   })
                               }}></TextInput>
                </View>



            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                // Alert.alert(JSON.stringify(inforHD));
                ThemHopDong();
            }}
                              title="Thêm" fontSize={1} >

                    <Text style={styles.loginName}>Thêm</Text>

            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );

    async function ThemHopDong() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/hopdongs?token=' + token, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tenKhachHang: inforHD.tenKhachHang,
                    sdt: inforHD.sdt,
                    email:inforHD.email,
                    diaChi: inforHD.diaChi,
                    thongTinCMT: {
                        idCMT: inforHD.thongTinCMT.idCMT,
                        noiCap: inforHD.thongTinCMT.noiCap
                    },
                    ngaySinh: new Date(inforHD.ngaySinh),
                    thongTinHopDong: {
                        ngayVay: new Date(inforHD.thongTinHopDong.ngayVay),
                        tongTienVay: inforHD.thongTinHopDong.tongTienVay,
                        soKyDongLai: inforHD.thongTinHopDong.soKyDongLai,
                        cachTinhLai:inforHD.thongTinHopDong.cachTinhLai,
                        giaTriLaiSuat:inforHD.thongTinHopDong.giaTriLaiSuat,
                        soLanTra: inforHD.thongTinHopDong.soLanTra,
                        kieuDongLai: inforHD.thongTinHopDong.kieuDongLai,
                        tinChap: inforHD.thongTinHopDong.tinChap,
                        ghiChu: inforHD.thongTinHopDong.ghiChu,
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

    function tinhNgayTraGoc(ngayVay, soKyDongLai, cachTinhLai,  soLanTra) {
        // console.log(soLanTra);
        // setDateNgayTraGoc(null);
        if(ngayVay.length == 0 || Number.isNaN(soKyDongLai) || Number.isNaN(cachTinhLai) || Number.isNaN(soLanTra)){
          setDateNgayTraGoc(null);
        }
        else  {
            if (cachTinhLai == 0) {       //cachTinhLai: ngay
                var ngay = new Date(ngayVay);
                ngay.setDate(ngay.getDate()-1);
                for(let i=0; i<soLanTra;i++){
                    ngay.setDate(ngay.getDate()+parseInt(soKyDongLai));

                    if(i==soLanTra-1){
                        setDateNgayTraGoc(new Date(ngay.getFullYear(),ngay.getMonth(),ngay.getDate()));
                    }
                }
            }
            else if(cachTinhLai == 1){      //cachTinhLai: thang
                var ngay = new Date(ngayVay);
                for (let i = 0; i < soLanTra ; i++) {
                    ngay.setMonth(ngay.getMonth() + parseInt(soKyDongLai));

                    if(i==soLanTra-1){
                        setDateNgayTraGoc(new Date(ngay.getFullYear(),ngay.getMonth(),ngay.getDate()));
                    }
                }

            }
        }

    }
}




const styles = StyleSheet.create({
    containerHD: {
        marginTop: height / 30,
    },
    thongTin: {
        flexDirection: 'column',
        marginHorizontal: 8
    },
    input: {
        fontSize: 16,
        paddingTop: 8
    },
    button:{
        marginTop: height / 40,
        borderRadius: 5,
        height: height / 10,
        width: width / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: width / 4,
        marginBottom: height / 10,
        backgroundColor: 'green'
    },
    loginName: {
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        color: 'white'
    },
    textInput: {
        borderWidth: 1,
        height: 32,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF"
    },
    richTextInput: {
        borderWidth: 1,
        height: 60,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF"
    },
});

