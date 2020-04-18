import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    AsyncStorage,
    Alert,
    TextInput,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {apiLink} from "../../config/constant";
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";
import {formatCurrency,resetMoney} from '../../utils/hamHoTro';

const {width, height} = Dimensions.get('window');
export default function ThemHopDongScreen({navigation}) {
    const dispatch = useDispatch();
    const switchScreenReducers = useSelector(state => state.switchScreenReducers);
    const [khoaNutThem, setKhoaNutThem] = useState(false);
    const [isVisibleNgaySinh, setIsVisibleNgaySinh] = useState(false);
    const [isVisibleNgayVay, setIsVisibleNgayVay] = useState(false);
    const [dateNgayTraGoc, setDateNgayTraGoc] = useState(new Date());
    const [tongTienVay, setTongTienVay] = useState(0);
    const [giaTriLaiSuat, setGiaTriLaiSuat] = useState(0);
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
            tongTienVay: 0,
            soKyDongLai: null,
            cachTinhLai: 0,
            giaTriLaiSuat: 0,
            soLanTra: null,
            ngayTraGoc: new Date(),
            kieuDongLai:0,
            tinChap: '',
            ghiChu: ''
        }
    });

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
        tinhNgayTraGoc(inforHD.thongTinHopDong.ngayVay, inforHD.thongTinHopDong.soKyDongLai, inforHD.thongTinHopDong.cachTinhLai, inforHD.thongTinHopDong.soLanTra,inforHD.thongTinHopDong.kieuDongLai);
    }, [inforHD.thongTinHopDong]);

    async function ThemHopDong() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + switchScreenReducers+ '/hopdongs?usertype='+switchScreenReducers+'&token=' + token, {
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
                        tongTienVay: parseInt(resetMoney(inforHD.thongTinHopDong.tongTienVay)),
                        soKyDongLai: parseInt(inforHD.thongTinHopDong.soKyDongLai),
                        cachTinhLai: parseInt(inforHD.thongTinHopDong.cachTinhLai),
                        giaTriLaiSuat: parseInt(resetMoney(inforHD.thongTinHopDong.giaTriLaiSuat)),
                        soLanTra: parseInt(inforHD.thongTinHopDong.soLanTra),
                        ngayTraGoc: new Date(dateNgayTraGoc),
                        kieuDongLai: parseInt(inforHD.thongTinHopDong.kieuDongLai),
                        tinChap: inforHD.thongTinHopDong.tinChap,
                        ghiChu: inforHD.thongTinHopDong.ghiChu,
                    },
                })

            })
            let responseJson = await response.json();
            if (responseJson.status === 'ok') {
                dispatch({type: 'REFRESH'});
                Alert.alert(responseJson.message);
                navigation.goBack();
            } else if (responseJson.status === 'fail') {
                Alert.alert(responseJson.message);
                setKhoaNutThem(false);
                // navigation.goBack();
            }

        } catch (e) {
            await Alert.alert(e.toString());
        }
    }

    function tinhNgayTraGoc(ngayVay, soKyDongLai, cachTinhLai, soLanTra,kieuDongLai) {
        if (ngayVay.length == 0 || Number.isNaN(soKyDongLai) || Number.isNaN(cachTinhLai) || Number.isNaN(soLanTra)) {
            setDateNgayTraGoc(new Date());
        } else {
            if (cachTinhLai == 0) {       //cachTinhLai: ngay
                let ngay = moment(ngayVay).add((soKyDongLai * soLanTra)-1, "days");
                setDateNgayTraGoc(new Date(ngay));
            } else if (cachTinhLai == 1) {      //cachTinhLai: thang
                    let ngay = moment(ngayVay).add((soKyDongLai * soLanTra), "months");
                    setDateNgayTraGoc(new Date(ngay));
            }
        }

    }

    return (
        <KeyboardAwareScrollView
            style={{flex: 1, flexDirection: 'column', paddingTop: height / 15}}
            enableResetScrollToCoords={false}
        >
            <View>
                <Text style={{fontSize: 24, fontWeight: 'bold', marginHorizontal: 8}}>Thông Tin Khách Hàng Vay</Text>
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
                               maxLength={40}
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
                               maxLength={11}
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
                               keyboardType={"email-address"} maxLength={60}
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
                               multiline={true} maxLength={70}
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
                               maxLength={13}
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
                    <TextInput placeholder="Nhập nơi cấp CMT" style={styles.textInput} maxLength={30}
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
                                    confirmTextIOS={'Xác nhận'}
                                    mode={'date'}
                                    date={inforHD.ngaySinh}
                                    onConfirm={(selectedDate) => {
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
                    <TouchableOpacity onPress={()=>setIsVisibleNgaySinh(true)}>
                        <Text style={styles.text}>{` ${inforHD.ngaySinh.getDate()}-${(inforHD.ngaySinh.getMonth() + 1)}-${inforHD.ngaySinh.getFullYear()}`}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.containerHD}>
                <Text style={{fontSize: 24, fontWeight: 'bold', marginHorizontal: 8}}>Thông Tin Hợp Đồng</Text>
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
                                    confirmTextIOS={'Xác nhận'}
                                    mode={'date'}
                                    date={inforHD.thongTinHopDong.ngayVay}
                                    onConfirm={(selectedDate) => {
                                        setIsVisibleNgayVay(false);
                                        setInforHD({
                                            ...inforHD,
                                            thongTinHopDong: {
                                                ...inforHD.thongTinHopDong,
                                                ngayVay: selectedDate
                                            }
                                        });
                                    }}
                                    onCancel={() => {
                                        setIsVisibleNgayVay(false);
                                    }}>

                    </DateTimePicker>
                    <TouchableOpacity onPress={()=>setIsVisibleNgayVay(true)}>
                        <Text style={styles.text}>{` ${inforHD.thongTinHopDong.ngayVay.getDate()}-${(inforHD.thongTinHopDong.ngayVay.getMonth() + 1)}-${inforHD.thongTinHopDong.ngayVay.getFullYear()}`}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Tổng Tiền Vay: </Text>
                    <TextInput placeholder="Nhập số tiền vay" keyboardType={"number-pad"} style={styles.textInput}
                               value={tongTienVay.toString()} maxLength={15}
                               onChangeText={(text) => {
                                   let textrs = resetMoney(text);
                                   setTongTienVay(formatCurrency(textrs));
                                   setInforHD({
                                       ...inforHD,
                                       thongTinHopDong: {
                                           ...inforHD.thongTinHopDong,
                                           tongTienVay: textrs
                                       }
                                   });

                               }}
                    />
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Kỳ đóng lãi: </Text>
                    <TextInput keyboardType={"number-pad"} placeholder="Nhập số ngày hoặc tháng nộp lãi 1 lần"
                               style={styles.textInput} maxLength={100}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       thongTinHopDong: {
                                           ...inforHD.thongTinHopDong,
                                           soKyDongLai: text,
                                       }
                                   });

                               }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Cách tính lãi: </Text>
                    <RadioForm radio_props={[
                        {label: 'Ngày', value: 0},
                        {label: 'Tháng', value: 1},
                    ]}
                        // animation={true}
                               initial={0}
                               formHorizontal={true}
                               onPress={(value) => {
                                   setInforHD({
                                       ...inforHD,
                                       thongTinHopDong: {
                                           ...inforHD.thongTinHopDong,
                                           cachTinhLai: value,
                                           giaTriLaiSuat: 0
                                       }
                                   });
                               }}
                    />
                </View>
                {
                    inforHD.thongTinHopDong.cachTinhLai == 0 && (
                        <View style={styles.thongTin}>
                            <Text style={styles.input}>Lãi/triệu/ngày: </Text>
                            <TextInput placeholder="Nhập tiền lãi /triệu/ngày" keyboardType={"number-pad"} style={styles.textInput}
                                       value={giaTriLaiSuat.toString()} maxLength={15}
                                       onChangeText={(text) => {
                                           let textrs = resetMoney(text);
                                           setGiaTriLaiSuat(formatCurrency(textrs));
                                           setInforHD({
                                               ...inforHD,
                                               thongTinHopDong: {
                                                   ...inforHD.thongTinHopDong,
                                                   giaTriLaiSuat:textrs
                                               }
                                           })
                                       }}
                            />
                        </View>
                    )
                }
                {
                    inforHD.thongTinHopDong.cachTinhLai == 1 && (
                        <View style={styles.thongTin}>
                            <Text style={styles.input}>Lãi %/tháng: </Text>
                            <TextInput placeholder="Nhập % lãi trên 1 tháng" keyboardType={"number-pad"} style={styles.textInput}
                                       value={formatCurrency(inforHD.thongTinHopDong.giaTriLaiSuat)}
                                       onChangeText={(text) => {
                                           if( parseInt(text)>100){text=100}
                                           setInforHD({
                                               ...inforHD,
                                               thongTinHopDong: {
                                                   ...inforHD.thongTinHopDong,
                                                   giaTriLaiSuat: resetMoney(text)
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
                               maxLength={100}
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
                    <TextInput
                        value={dateNgayTraGoc.getDate().toString() + "-" + (dateNgayTraGoc.getMonth() + 1).toString() + "-" + dateNgayTraGoc.getFullYear().toString()}
                        editable={false} style={styles.textInput}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Kiểu đóng lãi: </Text>
                    <RadioForm radio_props={[
                        {label: 'Sau', value: 0},
                        {label: 'Trước', value: 1},
                    ]}
                               initial={0}
                               formHorizontal={true}
                               onPress={(value) => {
                                   setInforHD({
                                       ...inforHD,
                                       thongTinHopDong: {
                                           ...inforHD.thongTinHopDong,
                                           kieuDongLai: value
                                       }
                                   });
                               }}
                    />
                </View>

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
                    if (!khoaNutThem) {
                        setKhoaNutThem(true);
                        ThemHopDong().then(()=>{
                            setKhoaNutThem(false);
                        })
                    }
                }}
            >
                <Text style={styles.loginName}>Thêm</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );
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
    text: {
        borderWidth: 1,
        height: 32,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF",
        borderRadius: 3,
        paddingTop:7,
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

