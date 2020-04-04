import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, AsyncStorage, Button, Alert, TextInput, Dimensions, Image, TouchableOpacity, Keyboard } from 'react-native';
import RadioForm, { RadioButton, RadioButtonLabel, RadioButtonInput } from 'react-native-simple-radio-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import { apiLink } from "../../config/constant";
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
const { width, height } = Dimensions.get('window');
const toDay = new Date();
export default function ThemHopDongScreen({ navigation }) {

    
    const [cachTinhLai, setCachTinhLai] = useState(0);
    const [kieuDongLai, setKieuDongLai] = useState(0);
    const [inforHD, setInforHD] = useState({
        tenKhachHang: '',
        sdt: '',
        email: '',
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
            cachTinhLai: '',
            giaTriLaiSuat: '',
            soLanTra: null,
            ngayTraGoc: new Date(),
            // kieuDongLai:'',
            tinChap: '',
            ghiChu: ''
        }
    });

    // useEffect(() => {
    // }, [dateNgaySinh]);

    useEffect(() => {
        setInforHD({
            ...inforHD,
            thongTinHopDong: {
                ...inforHD.thongTinHopDong,
                cachTinhLai: 0
            }
        });
    }, []);

    useEffect(() => {
        tinhNgayTraGoc(inforHD.thongTinHopDong.ngayVay, inforHD.thongTinHopDong.soKyDongLai, inforHD.thongTinHopDong.cachTinhLai, inforHD.thongTinHopDong.soLanTra);    
    }, [inforHD.thongTinHopDong]);

    
    const [thangNgaySinh, setThangNgaySinh] = useState(0);
    const [dateNgaySinh, setDateNgaySinh] = useState(new Date());
    const [isVisibleNgaySinh, setIsVisibleNgaySinh] = useState(false);

    const [thangNgayVay, setThangNgayVay] = useState(0);
    const [dateNgayVay, setDateNgayVay] = useState(new Date());
    const [isVisibleNgayVay, setIsVisibleNgayVay] = useState(false);

    const [dateNgayTraGoc, setDateNgayTraGoc] = useState(new Date());




    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

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
                    <TextInput placeholder="Nhập email" keyboardType={"default"} style={styles.textInput} keyboardType={"email-address"}
                        onChangeText={(text) => {
                            setInforHD({
                                ...inforHD,
                                email: text
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
                    <DateTimePicker isVisible={isVisibleNgaySinh}
                        headerTextIOS={'Chọn ngày sinh'}
                        mode={'date'}
                        onConfirm={(selectedDate) => {
                            setThangNgaySinh(selectedDate.getMonth());
                            setDateNgaySinh(selectedDate);
                            setIsVisibleNgaySinh(false);
                            setInforHD({
                                ...inforHD,
                                ngaySinh: selectedDate
                            });
                        }}
                        onCancel={() => {
                            setIsVisibleNgaySinh(false);
                        }}>

                    </DateTimePicker>
                    <TextInput placeholder="Chọn ngày sinh" value={dateNgaySinh.getDate().toString() + "-" + (thangNgaySinh + 1).toString() + "-" + dateNgaySinh.getFullYear().toString()} editable={false} style={styles.textInput} onTouchStart={() => {
                        setIsVisibleNgaySinh(true);
                    }}></TextInput>
                </View>

            </View>
            <View style={styles.containerHD} onTouchStart={()=>{
                setInforHD({
                    ...inforHD,
                    thongTinHopDong: {
                        ...inforHD.thongTinHopDong,
                        ngayTraGoc:dateNgayTraGoc
                    }
                })
            }}>
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
                    <DateTimePicker isVisible={isVisibleNgayVay}
                        headerTextIOS={'Chọn ngày vay'}
                        mode={'date'}
                        onConfirm={(selectedDate) => {
                            setThangNgayVay(selectedDate.getMonth());
                            setDateNgayVay(selectedDate);
                            setIsVisibleNgayVay(false);
                            setInforHD({
                                ...inforHD,
                                thongTinHopDong: {
                                    ...inforHD.thongTinHopDong,
                                    ngayVay:selectedDate
                                }
                            });
                        }}
                        onCancel={() => {
                            setIsVisibleNgayVay(false);
                        }}>

                    </DateTimePicker>
                    <TextInput placeholder="Chọn ngày vay" value={dateNgayVay.getDate().toString() + "-" + (thangNgayVay + 1).toString() + "-" + dateNgayVay.getFullYear().toString()} editable={false} style={styles.textInput} onTouchStart={() => {
                        setIsVisibleNgayVay(true);
                    }}></TextInput>
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
                                    soKyDongLai: parseInt(text),
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
                                case 0: {
                                    setCachTinhLai(value);
                                    setInforHD({
                                        ...inforHD,
                                        thongTinHopDong: {
                                            ...inforHD.thongTinHopDong,
                                            cachTinhLai: 0,
                                            giaTriLaiSuat: 0
                                        }
                                    });
                                    break;
                                }
                                case 1: {
                                    setCachTinhLai(value);
                                    setInforHD({
                                        ...inforHD,
                                        thongTinHopDong: {
                                            ...inforHD.thongTinHopDong,
                                            cachTinhLai: 1,
                                            giaTriLaiSuat: 0
                                        }
                                    });
                                    break;
                                }
                            }
                        }}
                    />
                </View>
                {
                    cachTinhLai == 0 && (
                        <View style={styles.thongTin}>
                            <Text style={styles.input}>Lãi/triệu/ngày: </Text>
                            <TextInput placeholder="Nhập tiền lãi /triệu/ngày" keyboardType={"number-pad"} style={styles.textInput}

                                onChangeText={(text) => {
                                    setInforHD({
                                        ...inforHD,
                                        thongTinHopDong: {
                                            ...inforHD.thongTinHopDong,
                                            giaTriLaiSuat: parseInt(text)
                                        }
                                    })
                                }}
                            />
                        </View>
                    )
                }
                {
                    cachTinhLai == 1 && (
                        <View style={styles.thongTin}>
                            <Text style={styles.input}>Lãi %/tháng: </Text>
                            <TextInput placeholder="Nhập % lãi trên 1 tháng" keyboardType={"number-pad"} style={styles.textInput}

                                onChangeText={(text) => {
                                    setInforHD({
                                        ...inforHD,
                                        thongTinHopDong: {
                                            ...inforHD.thongTinHopDong,
                                            giaTriLaiSuat: parseInt(text)
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
                        onResponderMove={() => {

                        }}
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
                <Text style={styles.input}>Ngày Trả Gốc: </Text>
                <TextInput value={dateNgayTraGoc.getDate().toString() + "-" + (dateNgayTraGoc.getMonth()+1).toString() + "-" + dateNgayTraGoc.getFullYear().toString()} editable={false} style={styles.textInput}></TextInput>
                </View>

                {/* <View style={styles.thongTin}>
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
                </View> */}

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Tín chấp: </Text>
                    <TextInput placeholder="Nhập tài sản thế chấp" style={styles.textInput}
                        onChangeText={(text) => {
                            //alert(dateNgayTraGoc.toString() + "     " + inforHD.thongTinHopDong.ngayVay.toString()+ "     " + inforHD.thongTinHopDong.cachTinhLai.toString()+ "     " + inforHD.thongTinHopDong.soKyDongLai.toString()+ "     " + inforHD.thongTinHopDong.soLanTra.toString());
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
                    
                    //Alert.alert(JSON.stringify(inforHD));
                    ThemHopDong();
                }}
                title="Thêm" fontSize={1}
            >

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
                    email: inforHD.email,
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
                        cachTinhLai: inforHD.thongTinHopDong.cachTinhLai,
                        giaTriLaiSuat: inforHD.thongTinHopDong.giaTriLaiSuat,
                        soLanTra: inforHD.thongTinHopDong.soLanTra,
                        ngayTraGoc: new Date(inforHD.thongTinHopDong.ngayTraGoc.getFullYear(),inforHD.thongTinHopDong.ngayTraGoc.getMonth(),inforHD.thongTinHopDong.ngayTraGoc.getDate()+1),
                        //kieuDongLai: inforHD.thongTinHopDong.kieuDongLai,
                        tinChap: inforHD.thongTinHopDong.tinChap,
                        ghiChu: inforHD.thongTinHopDong.ghiChu,
                    },
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

    function tinhNgayTraGoc(ngayVay, soKyDongLai, cachTinhLai, soLanTra) {
        // console.log(soLanTra);
        // setDateNgayTraGoc(null);
        if (ngayVay.length == 0 || Number.isNaN(soKyDongLai) || Number.isNaN(cachTinhLai) || Number.isNaN(soLanTra)) {
            setDateNgayTraGoc(new Date());
        }
        else {
            if (cachTinhLai == 0) {       //cachTinhLai: ngay
                var ngay = moment([ngayVay.getFullYear(),ngayVay.getMonth(),ngayVay.getDate()]).add((soKyDongLai*soLanTra),"days");
                setDateNgayTraGoc(new Date(ngay));
            }
            else if (cachTinhLai == 1) {      //cachTinhLai: thang
                var ngay = moment([ngayVay.getFullYear(),ngayVay.getMonth(),ngayVay.getDate()]).add((soKyDongLai*soLanTra),"months");
                setDateNgayTraGoc(new Date(ngay));

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
    button: {
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
        backgroundColor: "#FFFFFF",
        borderRadius: 3
    },
    richTextInput: {
        borderWidth: 1,
        height: 60,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF",
        borderRadius: 3
    },
});

