import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, AsyncStorage, Button, Alert, TextInput, Dimensions, Image, TouchableOpacity, Modal, RefreshControl } from 'react-native';
import RadioForm, { RadioButton, RadioButtonLabel, RadioButtonInput } from 'react-native-simple-radio-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { apiLink } from "../../config/constant";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "react-native-dialog";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from 'moment';
import {
    NutSua,
    NutTatToan,
    NutDongLai,
    NutGiaHanKy,
    NutTraBotGoc,
    NutVayThem,
    NutNhanTin,
    NutXacNhan,
    NutXemLichSu
} from "../../component/index";


const { width, height } = Dimensions.get('window');

export default function ChiTietHopDongScreen({ route, navigation }) {
    const { id } = route.params;
    const [tongTienTatToan, setTongTienTatToan] = useState(0);
    const [inforHD, setInforHD] = useState({
        maHopDong: '',
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
            soKyDongLai: '',
            cachTinhLai: '',
            giaTriLaiSuat: '',
            soLanTra: '',
            //kieuDongLai: '',
            ngayTraGoc: new Date(),
            tinChap: '',
            ghiChu: ''
        },
        trangThaiHopDong: ''
    });

    const [statusEdit, setStatusEdit] = useState(false);

    useEffect(() => {
        initDataChiTiet();
        getInforHopDong(id).then((result) => {
            setInforHD({
                maHopDong: result.maHopDong,
                tenKhachHang: result.tenKhachHang,
                sdt: result.sdt,
                email: result.email,
                diaChi: result.diaChi,
                thongTinCMT: {
                    idCMT: result.thongTinCMT.idCMT,
                    noiCap: result.thongTinCMT.noiCap
                },
                ngaySinh: result.ngaySinh,
                thongTinHopDong: {
                    ngayVay: result.thongTinHopDong.ngayVay,
                    tongTienVay: result.thongTinHopDong.tongTienVay,
                    soKyDongLai: result.thongTinHopDong.soKyDongLai,
                    cachTinhLai: result.thongTinHopDong.cachTinhLai,
                    giaTriLaiSuat: result.thongTinHopDong.giaTriLaiSuat,
                    soLanTra: result.thongTinHopDong.soLanTra,
                    // kieuDongLai: result.thongTinHopDong.kieuDongLai,
                    ngayTraGoc: result.thongTinHopDong.ngayTraGoc,
                    tinChap: result.thongTinHopDong.tinChap,
                    ghiChu: result.thongTinHopDong.ghiChu
                },
                trangThaiHopDong: result.trangThaiHopDong
            });
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const [isVisibleNgaySinh, setIsVisibleNgaySinh] = useState(false);

    const [isVisibleNgayVay, setIsVisibleNgayVay] = useState(false);

    const [openModalTatToan, setOpenModalTatToan] = useState(false);
    const [openModalDongLai, setOpenModalDongLai] = useState(false);
    const [openModalTraBotGoc, setOpenModalTraBotGoc] = useState(false);
    const [openModalVayThem, setOpenModalVayThem] = useState(false);
    const [openModalGiaHanKy, setOpenModalGiaHanKy] = useState(false);

    const [nguoiThanhToan, setNguoiThanhToan] = useState({
        tatToan: "",
        dongLai: "",
        traBotGoc: "",
        vayThem: ""
    });

    const [tien, setTien] = useState({
        dongLai: 0,
        traBotGoc: 0,
        vayThem: 0
    });

    useEffect(() => {
        if (parseInt(tienLaiDaDong + moneyDongLai) < laiToNow) {
            setTrangThaiNoLai(1); //nợ lãi
        } else {
            setTrangThaiNoLai(0); // đủ lãi
        }

    }, [tien.dongLai])

    const [ghiChu, setGhiChu] = useState({
        tatToan: "",
        dongLai: "",
        traBotGoc: "",
        vayThem: ""
    });

    const [liDo, setLiDo] = useState("");

    const dateNow = new Date();
    const [laiToNow, setLaiToNow] = useState(1);

    const [dataChiTiet, setDataChiTiet] = useState(null);

    const [tienLaiDaDong, setTienLaiDaDong] = useState(1);

    const [trangThaiNoLai, setTrangThaiNoLai] = useState(0);

    const [moneyDongLai, setMoneyDongLai] = useState(1);

    const [soLanGiaHanThem, setSoLanGiaHanThem] = useState(0);

    const [ngayDuocCapNhat, setNgayDuocCapNhat] = useState(new Date());

    const [tienSauKhiTraBotGoc, setTienSauKhiTraBotGoc] = useState(1);

    const [tienSauKhiVayThem, setTienSauKhiVayThem] = useState(1);

    var resultNgaySinh = inforHD.ngaySinh.toString().substring(0, 10);
    var resultNgayVay = inforHD.thongTinHopDong.ngayVay.toString().substring(0, 10);
    var resultNgayTraGoc = inforHD.thongTinHopDong.ngayTraGoc.toString().substring(0, 10);

    const [refreshing, setRefreshing] = useState(false);

    return (
        <KeyboardAwareScrollView style={{ flex: 1, flexDirection: 'column', paddingTop: height / 15 }} refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={refreshData}
        />}>

            {/* Modal Tất Toán */}
            <Modal visible={openModalTatToan} transparent={true}>
                <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                    <View style={{ backgroundColor: "#FFFFFF", marginHorizontal: width / 12, paddingVertical: height / 25, paddingHorizontal: width / 30, marginVertical: height / 6, borderRadius: 10, flex: 1 }}>
                        <View style={{ position: 'absolute', marginLeft: width / 1.36, width: 25, height: 25 }}>
                            <TouchableOpacity onPress={() => {
                                setOpenModalTatToan(false);
                            }}>
                                <Icon name={'close'} color={'black'} size={18} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ alignSelf: 'center', fontSize: 26, fontWeight: '900', color: 'red' }}>
                            Thông Tin Tất Toán
                        </Text>
                        <View style={{ flexDirection: 'column', marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Người Thanh Toán:</Text>
                            <TextInput placeholder={"Nhập tên người thanh toán tiền"} style={styles.textInput} onChangeText={(text) => {
                                setNguoiThanhToan({ tatToan: text });
                            }}></TextInput>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>Tiền Tất Toán:</Text>
                            <TextInput placeholder={"Nhập số tiền tất toán"} style={styles.textInput} editable={false} value={tongTienTatToan.toString()}></TextInput>
                            <Text style={styles.input}>Ngày Tất Toán: </Text>
                            <TextInput value={dateNow.getDate().toString() + '-' + (dateNow.getMonth() + 1).toString() + '-' + dateNow.getFullYear().toString()} editable={false} style={styles.textInput} onTouchStart={() => {
                                //setIsVisibleNgaySinh(true);
                            }}></TextInput>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>Ghi Chú:</Text>
                            <TextInput placeholder={"Nhập ghi chú nếu có"} style={styles.richTextInput} multiline={true} onChangeText={(text) => {
                                setGhiChu({ tatToan: text });
                            }}></TextInput>
                            <TouchableOpacity onPress={() => {
                                TatToanHopDong(id);
                            }}>
                                <NutXacNhan></NutXacNhan>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            {/* Modal Đóng Lãi */}
            <Modal visible={openModalDongLai} transparent={true}>
                <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                    <View style={{ backgroundColor: "#FFFFFF", marginHorizontal: width / 12, paddingVertical: height / 25, paddingHorizontal: width / 20, marginVertical: height / 6, borderRadius: 10, flex: 1 }}>
                        <View style={{ position: 'absolute', marginLeft: width / 1.36, width: 25, height: 25 }}>
                            <TouchableOpacity onPress={() => {
                                setOpenModalDongLai(false);
                            }}>
                                <Icon name={'close'} color={'black'} size={18} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ alignSelf: 'center', fontSize: 26, fontWeight: '900', color: 'red' }}>
                            Thông Tin Đóng Lãi
                        </Text>
                        <View style={{ flexDirection: 'column', marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Người Thanh Toán:</Text>
                            <TextInput placeholder={"Nhập tên người thanh toán tiền"} style={styles.textInput} onChangeText={(text) => {
                                setNguoiThanhToan({ dongLai: text });
                            }}></TextInput>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>Tiền Đóng Lãi:</Text>
                            <TextInput placeholder={"Nhập số tiền đóng lãi"} defaultValue={'0'} style={styles.textInput} keyboardType='number-pad' onChangeText={(text) => {
                                setTien({ dongLai: parseInt(text) });
                                setMoneyDongLai(parseInt(text));
                            }}></TextInput>
                            <Text style={styles.input}>Ngày Đóng Lãi: </Text>
                            <TextInput value={dateNow.getDate().toString() + '-' + (dateNow.getMonth() + 1).toString() + '-' + dateNow.getFullYear().toString()} editable={false} style={styles.textInput}></TextInput>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>Ghi Chú:</Text>
                            <TextInput placeholder={"Nhập ghi chú nếu có"} style={styles.richTextInput} multiline={true} multiline={true} onChangeText={(text) => {
                                setGhiChu({ dongLai: text });
                            }}></TextInput>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 16 }}>Lãi đến ngày hôm nay: </Text>
                                <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 16, color: 'red' }}>{laiToNow}</Text>
                            </View>
                            <View style={{ marginTop: 8 }}>
                                <TouchableOpacity onPress={() => {
                                    if (inforHD.trangThaiHopDong != trangThaiNoLai) {
                                        CapNhatTrangThaiHopDong(id);
                                        ThemChiTietHopDong_DongLai();
                                    }
                                    else {
                                        ThemChiTietHopDong_DongLai();
                                    }
                                }}>
                                    <NutXacNhan></NutXacNhan>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>



            {/* Modal Trả Bớt Gốc */}
            <Modal visible={openModalTraBotGoc} transparent={true}>
                <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                    <View style={{ backgroundColor: "#FFFFFF", marginHorizontal: width / 12, paddingVertical: height / 25, paddingHorizontal: width / 20, marginVertical: height / 6, borderRadius: 10, flex: 1 }}>
                        <View style={{ position: 'absolute', marginLeft: width / 1.36, width: 25, height: 25 }}>
                            <TouchableOpacity onPress={() => {
                                setOpenModalTraBotGoc(false);
                            }}>
                                <Icon name={'close'} color={'black'} size={18} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ alignContent: 'center', fontSize: 26, fontWeight: '900', color: 'red', width: width }}>
                            Thông Tin Trả Bớt Gốc
                        </Text>
                        <View style={{ flexDirection: 'column', marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Người Thanh Toán:</Text>
                            <TextInput placeholder={"Nhập tên người thanh toán tiền"} style={styles.textInput} onChangeText={(text) => {
                                setNguoiThanhToan({ traBotGoc: text });
                            }}></TextInput>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>Tiền Trả Bớt Gốc:</Text>
                            <TextInput placeholder={"Nhập số tiền trả bớt gốc"} defaultValue={'0'} style={styles.textInput} keyboardType={"numeric"} onChangeText={(text) => {
                                setTien({ traBotGoc: parseInt(text) });
                                tinhTienVayGocSauKhiDaTraBotGoc(inforHD.thongTinHopDong.tongTienVay, parseInt(text));
                            }}></TextInput>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>Ngày Trả Bớt Gốc:</Text>
                            <TextInput placeholder="Chọn ngày vay" value={dateNow.getDate().toString() + '-' + (dateNow.getMonth() + 1).toString() + '-' + dateNow.getFullYear().toString()} editable={false} style={styles.textInput} onTouchStart={() => {
                                //setIsVisibleNgaySinh(true);
                            }}></TextInput>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>Ghi Chú:</Text>
                            <TextInput placeholder={"Nhập ghi chú nếu có"} style={styles.richTextInput} multiline={true} onChangeText={(text) => {
                                setGhiChu({ traBotGoc: text })
                            }}></TextInput>
                            <TouchableOpacity onPress={() => {
                                CapNhatTongTienVay_SauKhiTraBotGoc(id);
                            }}>
                                <NutXacNhan></NutXacNhan>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>



            {/* Modal Vay Thêm */}
            <Modal visible={openModalVayThem} transparent={true}>
                <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                    <View style={{ backgroundColor: "#FFFFFF", marginHorizontal: width / 12, paddingVertical: height / 25, paddingHorizontal: width / 20, marginVertical: height / 6, borderRadius: 10, flex: 1 }}>
                        <View style={{ position: 'absolute', marginLeft: width / 1.36, width: 25, height: 25 }}>
                            <TouchableOpacity onPress={() => {
                                setOpenModalVayThem(false);
                            }}>
                                <Icon name={'close'} color={'black'} size={18} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ alignContent: 'center', fontSize: 26, fontWeight: '900', color: 'red', width: width }}>
                            Thông Tin Vay Thêm
                        </Text>
                        <View style={{ flexDirection: 'column', marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Người Thanh Toán:</Text>
                            <TextInput placeholder={"Nhập tên người thanh toán tiền"} style={styles.textInput} onChangeText={(text) => {
                                setNguoiThanhToan({ vayThem: text });
                            }}></TextInput>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>Tiền Vay Thêm:</Text>
                            <TextInput placeholder={"Nhập số tiền vay thêm"} defaultValue={"0"} style={styles.textInput} onChangeText={(text) => {
                                setTien({ vayThem: parseInt(text) });
                                tinhTienVayGocSauKhiVayThem(inforHD.thongTinHopDong.tongTienVay, parseInt(text));
                            }}></TextInput>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>Ngày Vay Thêm:</Text>
                            <TextInput placeholder="Chọn ngày vay" value={dateNow.getDate().toString() + '-' + (dateNow.getMonth() + 1).toString() + '-' + dateNow.getFullYear().toString()} editable={false} style={styles.textInput} onTouchStart={() => {
                                //setIsVisibleNgaySinh(true);
                            }}></TextInput>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>Ghi Chú:</Text>
                            <TextInput placeholder={"Nhập ghi chú nếu có"} style={styles.richTextInput} multiline={true} onChangeText={(text) => {
                                setGhiChu({ vayThem: text });
                            }}></TextInput>
                            <TouchableOpacity onPress={() => {
                                CapNhatTongTienVay_SauKhiVayThem(id);
                                //alert(tienSauKhiVayThem);
                            }}>
                                <NutXacNhan></NutXacNhan>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>



            {/* Modal Gia Hạn Kỳ */}
            <Modal visible={openModalGiaHanKy} transparent={true}>
                <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                    <View style={{ backgroundColor: "#FFFFFF", marginHorizontal: width / 12, paddingVertical: height / 25, paddingHorizontal: width / 20, marginVertical: height / 6, borderRadius: 10, flex: 1 }}>
                        <View style={{ position: 'absolute', marginLeft: width / 1.36, width: 25, height: 25 }}>
                            <TouchableOpacity onPress={() => {
                                setOpenModalGiaHanKy(false);
                            }}>
                                <Icon name={'close'} color={'black'} size={18} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ alignContent: 'center', fontSize: 26, fontWeight: '900', color: 'red', width: width }}>
                            Thông Tin Gia Hạn Kỳ
                        </Text>
                        <View style={{ flexDirection: 'column', marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Mã Cho Vay:</Text>
                            <TextInput value={inforHD.maHopDong} style={styles.textInput} editable={false}></TextInput>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>Số Lần Gia Hạn Thêm:</Text>
                            <TextInput placeholder={"Nhập số lần gia hạn thêm"} defaultValue={'0'} keyboardType={'number-pad'} style={styles.textInput} onChangeText={(text) => {
                                setSoLanGiaHanThem(parseInt(text));
                                tinhNgaySauKhiDaGiaHan(inforHD.thongTinHopDong.cachTinhLai, inforHD.thongTinHopDong.ngayTraGoc, parseInt(text));
                                //setTimeToGiaHan(parseInt(text));
                            }}></TextInput>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>Lí Do Gia Hạn:</Text>
                            <TextInput placeholder={"Nhập lí do gia hạn hợp đồng"} style={styles.richTextInput} multiline={true} onChangeText={(text) => {
                                setLiDo(text);
                            }}></TextInput>
                            <TouchableOpacity onPress={() => {
                                //tinhNgaySauKhiDaGiaHan(inforHD.thongTinHopDong.cachTinhLai, inforHD.thongTinHopDong.ngayTraGoc, soLanGiaHanThem);

                                //alert(ngayDuocCapNhat);
                                CapNhatNgayTraGoc(id);
                            }}>
                                <NutXacNhan></NutXacNhan>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>




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
                        editable={statusEdit}
                        defaultValue={inforHD.tenKhachHang.toString()}
                        onChangeText={(text) => {


                        }}></TextInput>
                </View>
                <View style={styles.thongTin}>
                    <Text style={styles.input}>Số điện thoại: </Text>
                    <TextInput placeholder="Nhập số điện thoại" keyboardType={"number-pad"} style={styles.textInput}
                        editable={statusEdit}
                        defaultValue={inforHD.sdt}
                        onChangeText={(text) => {

                        }}></TextInput>
                </View>
                <View style={styles.thongTin}>
                    <Text style={styles.input}>Email: </Text>
                    <TextInput placeholder="Nhập email" keyboardType={"email-address"} style={styles.textInput}
                        editable={statusEdit}
                        defaultValue={inforHD.email}
                        onChangeText={(text) => {

                        }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Địa Chỉ: </Text>
                    <TextInput placeholder="Nhập địa chỉ" style={styles.richTextInput}
                        editable={statusEdit}
                        defaultValue={inforHD.diaChi}
                        multiline={true}
                        onChangeText={(text) => {

                        }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Số CMT: </Text>
                    <TextInput placeholder="Nhập số chứng minh thư" keyboardType={"number-pad"} style={styles.textInput}
                        editable={statusEdit}
                        defaultValue={inforHD.thongTinCMT.idCMT}
                        onChangeText={(text) => {

                        }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Nơi Cấp: </Text>
                    <TextInput placeholder="Nhập nơi cấp CMT" style={styles.textInput}
                        editable={statusEdit}
                        defaultValue={inforHD.thongTinCMT.noiCap}
                        onChangeText={(text) => {

                        }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Ngày Sinh: </Text>
                    <DateTimePicker isVisible={isVisibleNgaySinh}

                        headerTextIOS={'Chọn ngày sinh'}
                        mode={'date'}
                        onConfirm={(selectedDate) => {
                            // setThangNgaySinh(selectedDate.getMonth());
                            // setDateNgaySinh(selectedDate);
                            // setIsVisibleNgaySinh(false);
                            // setInforHD({
                            //     ...inforHD,
                            //     thongTinHopDong: {
                            //         ...inforHD.thongTinHopDong,
                            //         ngayVay:selectedDate
                            //     }
                            // });
                        }}
                        onCancel={() => {
                            setIsVisibleNgaySinh(false);
                        }}>

                    </DateTimePicker>
                    <TextInput placeholder="Chọn ngày sinh" defaultValue={resultNgaySinh} editable={statusEdit} style={styles.textInput} onTouchStart={() => {
                        //setIsVisibleNgaySinh(true);
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
                    <DateTimePicker isVisible={isVisibleNgayVay}
                        headerTextIOS={'Chọn ngày vay'}
                        mode={'date'}
                        onConfirm={(selectedDate) => {
                            // setThangNgayVay(selectedDate.getMonth());
                            // setDateNgayVay(selectedDate);
                            // setIsVisibleNgayVay(false);
                            // setInforHD({
                            //     ...inforHD,
                            //     thongTinHopDong: {
                            //         ...inforHD.thongTinHopDong,
                            //         ngayVay:selectedDate
                            //     }
                            // });
                        }}
                        onCancel={() => {
                            setIsVisibleNgayVay(false);
                        }}>

                    </DateTimePicker>
                    {/* inforHD.thongTinHopDong.ngayVay.getDate().toString()+"-"+inforHD.thongTinHopDong.ngayVay.getMonth().toString()+"-"+inforHD.thongTinHopDong.ngayVay.getFullYear().toString() */}
                    <TextInput placeholder="Chọn ngày vay" defaultValue={resultNgayVay} editable={false} style={styles.textInput} onTouchStart={() => {
                        //setIsVisibleNgayVay(true);
                    }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Tổng Tiền Vay: </Text>
                    <TextInput placeholder="Nhập số tiền vay" keyboardType={"number-pad"} style={styles.textInput}
                        editable={statusEdit}
                        defaultValue={inforHD.thongTinHopDong.tongTienVay.toString()}
                        onChangeText={(text) => {

                        }}
                    />
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Kỳ đóng lãi: </Text>
                    <TextInput keyboardType={"number-pad"} placeholder="Nhập số ngày hoặc tháng nộp lãi 1 lần" style={styles.textInput}
                        editable={statusEdit}
                        defaultValue={inforHD.thongTinHopDong.soKyDongLai.toString()}
                        onChangeText={(text) => {

                        }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Cách tính lãi: </Text>
                    <RadioForm radio_props={[
                        { label: 'Ngày', value: 0 },
                        { label: 'Tháng', value: 1 },
                    ]}
                        // animation={true}
                        initial={inforHD.thongTinHopDong.cachTinhLai == 0 ? 0 : 1}

                        formHorizontal={true}
                        onPress={(value) => {
                        }
                        }
                    />
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Lãi/triệu/ngày: </Text>
                    <TextInput placeholder="Nhập tiền lãi /triệu/ngày" keyboardType={"number-pad"} style={styles.textInput}
                        defaultValue={inforHD.thongTinHopDong.cachTinhLai == 0 ? inforHD.thongTinHopDong.giaTriLaiSuat.toString() : '0'}
                        editable={statusEdit}
                        onChangeText={(text) => {

                        }}
                    />
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Lãi %/tháng: </Text>
                    <TextInput placeholder="Nhập % lãi trên 1 tháng" keyboardType={"number-pad"} style={styles.textInput}
                        defaultValue={inforHD.thongTinHopDong.cachTinhLai == 1 ? inforHD.thongTinHopDong.giaTriLaiSuat.toString() : '0'}
                        editable={statusEdit}
                        onChangeText={(text) => {

                        }}
                    />
                </View>



                <View style={styles.thongTin}>
                    <Text style={styles.input}>Số lần trả: </Text>
                    <TextInput keyboardType={"number-pad"} placeholder="Nhập số lần trả lãi" style={styles.textInput}
                        editable={statusEdit}
                        defaultValue={inforHD.thongTinHopDong.soLanTra.toString()}
                        onChangeText={(text) => {

                        }}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Ngày Trả Gốc: </Text>
                    {/* inforHD.thongTinHopDong.ngayTraGoc.getDate().toString()+"-"+inforHD.thongTinHopDong.ngayTraGoc.getMonth().toString()+"-"+inforHD.thongTinHopDong.ngayTraGoc.getFullYear().toString() */}
                    <TextInput placeholder="Chọn ngày trả gốc" defaultValue={resultNgayTraGoc} editable={false} style={styles.textInput}></TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Tín chấp: </Text>
                    <TextInput placeholder="Nhập tài sản thế chấp" style={styles.textInput}
                        editable={statusEdit}
                        defaultValue={inforHD.thongTinHopDong.tinChap}
                        onChangeText={(text) => {

                        }}></TextInput>
                </View>
                <View style={styles.thongTin}>
                    <Text style={styles.input}>Ghi chú: </Text>
                    <TextInput placeholder="Nhập ghi chú nếu có" style={styles.textInput}
                        editable={statusEdit}
                        defaultValue={inforHD.thongTinHopDong.ghiChu}
                        onChangeText={(text) => {

                        }}></TextInput>
                </View>



            </View>

            {
                statusEdit == false && (
                    <View style={{ backgroundColor: "#0033FF", width: width / 2, height: height / 15, marginTop: height / 30, alignSelf: 'center', display: "none" }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => {

                        }}>
                            <Text style={{ marginTop: height / 80, color: "white", fontWeight: 'bold', fontSize: 20 }}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            {
                statusEdit == true && (
                    <View style={{ backgroundColor: "#0033FF", width: width / 2, height: height / 15, marginTop: height / 30, alignSelf: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                            setStatusEdit(false);
                        }}>
                            <Text style={{ marginTop: height / 80, color: "white", fontWeight: 'bold', fontSize: 20 }}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                )
            }



            <View style={styles.controlButtonSide}>
                <TouchableOpacity onPress={() => {
                    setStatusEdit(true);
                }}>
                    <NutSua></NutSua>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setOpenModalDongLai(true);
                    tinhTienLaiDenNgayHomNay(inforHD.thongTinHopDong.ngayVay, inforHD.thongTinHopDong.tongTienVay, inforHD.thongTinHopDong.cachTinhLai, inforHD.thongTinHopDong.giaTriLaiSuat);
                    var moneyDaDong = 0;
                    dataChiTiet.forEach(element => {
                        moneyDaDong = moneyDaDong + element.thongTinDongLai.tienDongLai;
                    });
                    setTienLaiDaDong(moneyDaDong);
                }}>
                    <NutDongLai></NutDongLai>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setOpenModalTatToan(true);
                    tinhTienTatToan(inforHD.thongTinHopDong.tongTienVay, inforHD.thongTinHopDong.soKyDongLai, inforHD.thongTinHopDong.cachTinhLai, inforHD.thongTinHopDong.giaTriLaiSuat, inforHD.thongTinHopDong.soLanTra);


                }}>
                    <NutTatToan></NutTatToan>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {

                    // setNgayDuocCapNhat(inforHD.thongTinHopDong.ngayTraGoc);
                    // setKieuDongLai(inforHD.thongTinHopDong.cachTinhLai);
                    //setGiaHan(0);
                    setOpenModalGiaHanKy(true);

                    //alert(ngayDuocCapNhat);
                }}>
                    <NutGiaHanKy></NutGiaHanKy>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setOpenModalTraBotGoc(true);
                }}>
                    <NutTraBotGoc></NutTraBotGoc>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setOpenModalVayThem(true);
                }}>
                    <NutVayThem></NutVayThem>
                </TouchableOpacity>

                <TouchableOpacity>
                    <NutNhanTin></NutNhanTin>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("Lịch sử hợp đồng", { id: id });
                }}>
                    <NutXemLichSu></NutXemLichSu>
                </TouchableOpacity>

            </View>
        </KeyboardAwareScrollView>

        // <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        //     <Text>id : {JSON.stringify(id)}</Text>
        // </View>
    );

    async function ThemChiTietHopDong_TatToan() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/chitiethopdongs?token=' + token, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    loaiChiTiet: 1,
                    thongTinDongLai: {
                        nguoiThanhToan: "",
                        tienDongLai: 0,
                        ngayDongLai: null,
                        ghiChu: ""
                    },
                    thongTinTatToan: {
                        nguoiThanhToan: nguoiThanhToan.tatToan,
                        tienTatToan: tongTienTatToan,
                        ngayTatToan: new Date(dateNow.getFullYear(), (dateNow.getMonth()), dateNow.getDate() + 1),
                        ghiChu: ghiChu.tatToan
                    },
                    thongTinTraBotGoc: {
                        nguoiThanhToan: "",
                        tienTraBotGoc: 0,
                        ngayTraBotGoc: null,
                        ghiChu: ""
                    },
                    thongTinVayThem: {
                        nguoiThanhToan: "",
                        tienVayThem: 0,
                        ngayVayThem: null,
                        ghiChu: ""
                    },
                    thongTinGiaHanKy: {
                        soLanGiaHan: 0,
                        ngayGiaHan: null,
                        liDoGiaHan: ""

                    },
                    idHopDong: id
                })
            })
            let responseJson = await response.json();
            if (responseJson.status == 'ok') {
                Alert.alert('Tất toán thành công !');
            } else if (responseJson.status == 'fail') {
                Alert.alert(responseJson.message);
                // navigation.goBack();
            }

        } catch (e) {
            await Alert.alert(e.toString());
        }
    }

    async function ThemChiTietHopDong_TraBotGoc() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/chitiethopdongs?token=' + token, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    loaiChiTiet: 2,
                    thongTinDongLai: {
                        nguoiThanhToan: "",
                        tienDongLai: 0,
                        ngayDongLai: null,
                        ghiChu: ""
                    },
                    thongTinTatToan: {
                        nguoiThanhToan: "",
                        tienTatToan: 0,
                        ngayTatToan: null,
                        ghiChu: ""
                    },
                    thongTinTraBotGoc: {
                        nguoiThanhToan: nguoiThanhToan.traBotGoc,
                        tienTraBotGoc: tien.traBotGoc,
                        ngayTraBotGoc: new Date(dateNow.getFullYear(), (dateNow.getMonth()), dateNow.getDate() + 1),
                        ghiChu: ghiChu.traBotGoc
                    },
                    thongTinVayThem: {
                        nguoiThanhToan: "",
                        tienVayThem: 0,
                        ngayVayThem: null,
                        ghiChu: ""
                    },
                    thongTinGiaHanKy: {
                        soLanGiaHan: 0,
                        ngayGiaHan: null,
                        liDoGiaHan: ""

                    },
                    idHopDong: id
                })
            })
            let responseJson = await response.json();
            if (responseJson.status == 'ok') {
                Alert.alert('Trả bớt gốc thành công !');
            } else if (responseJson.status == 'fail') {
                Alert.alert(responseJson.message);
                // navigation.goBack();
            }

        } catch (e) {
            await Alert.alert(e.toString());
        }
    }

    async function ThemChiTietHopDong_VayThem() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/chitiethopdongs?token=' + token, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    loaiChiTiet: 3,
                    thongTinDongLai: {
                        nguoiThanhToan: "",
                        tienDongLai: 0,
                        ngayDongLai: null,
                        ghiChu: ""
                    },
                    thongTinTatToan: {
                        nguoiThanhToan: "",
                        tienTatToan: 0,
                        ngayTatToan: null,
                        ghiChu: ""
                    },
                    thongTinTraBotGoc: {
                        nguoiThanhToan: "",
                        tienTraBotGoc: 0,
                        ngayTraBotGoc: null,
                        ghiChu: ""
                    },
                    thongTinVayThem: {
                        nguoiThanhToan: nguoiThanhToan.vayThem,
                        tienVayThem: tien.vayThem,
                        ngayVayThem: new Date(dateNow.getFullYear(), (dateNow.getMonth()), dateNow.getDate() + 1),
                        ghiChu: ghiChu.vayThem
                    },
                    thongTinGiaHanKy: {
                        soLanGiaHan: 0,
                        ngayGiaHan: null,
                        liDoGiaHan: ""

                    },
                    idHopDong: id
                })
            })
            let responseJson = await response.json();
            if (responseJson.status == 'ok') {
                Alert.alert('Vay Thêm thành công !');
            } else if (responseJson.status == 'fail') {
                Alert.alert(responseJson.message);
                // navigation.goBack();
            }

        } catch (e) {
            await Alert.alert(e.toString());
        }
    }

    async function ThemChiTietHopDong_GiaHanKy() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/chitiethopdongs?token=' + token, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    loaiChiTiet: 4,
                    thongTinDongLai: {
                        nguoiThanhToan: "",
                        tienDongLai: 0,
                        ngayDongLai: null,
                        ghiChu: ""
                    },
                    thongTinTatToan: {
                        nguoiThanhToan: "",
                        tienTatToan: 0,
                        ngayTatToan: null,
                        ghiChu: ""
                    },
                    thongTinTraBotGoc: {
                        nguoiThanhToan: "",
                        tienTraBotGoc: 0,
                        ngayTraBotGoc: null,
                        ghiChu: ""
                    },
                    thongTinVayThem: {
                        nguoiThanhToan: "",
                        tienVayThem: 0,
                        ngayVayThem: null,
                        ghiChu: ""
                    },
                    thongTinGiaHanKy: {
                        soLanGiaHan: soLanGiaHanThem,
                        ngayGiaHan: new Date(dateNow.getFullYear(), (dateNow.getMonth()), dateNow.getDate() + 1),
                        liDoGiaHan: liDo

                    },
                    idHopDong: id
                })
            })
            let responseJson = await response.json();
            if (responseJson.status == 'ok') {
                Alert.alert('Gia hạn kỳ thành công !');
            } else if (responseJson.status == 'fail') {
                Alert.alert(responseJson.message);
                // navigation.goBack();
            }

        } catch (e) {
            await Alert.alert(e.toString());
        }
    }

    async function ThemChiTietHopDong_DongLai() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/chitiethopdongs?token=' + token, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    loaiChiTiet: 0,
                    thongTinDongLai: {
                        nguoiThanhToan: nguoiThanhToan.dongLai,
                        tienDongLai: tien.dongLai,
                        ngayDongLai: new Date(dateNow.getFullYear(), (dateNow.getMonth()), dateNow.getDate() + 1),
                        ghiChu: ghiChu.dongLai
                    },
                    thongTinTatToan: {
                        nguoiThanhToan: "",
                        tienTatToan: 0,
                        ngayTatToan: null,
                        ghiChu: ""
                    },
                    thongTinTraBotGoc: {
                        nguoiThanhToan: "",
                        tienTraBotGoc: 0,
                        ngayTraBotGoc: null,
                        ghiChu: ""
                    },
                    thongTinVayThem: {
                        nguoiThanhToan: "",
                        tienVayThem: 0,
                        ngayVayThem: null,
                        ghiChu: ""
                    },
                    thongTinGiaHanKy: {
                        soLanGiaHan: 0,
                        ngayGiaHan: null,
                        liDoGiaHan: ""

                    },
                    idHopDong: id
                })
            })
            let responseJson = await response.json();
            if (responseJson.status == 'ok') {
                Alert.alert('Đóng lãi thành công !');
            } else if (responseJson.status == 'fail') {
                Alert.alert(responseJson.message);
                // navigation.goBack();
            }

        } catch (e) {
            await Alert.alert(e.toString());
        }
    }

    async function getAllCTHD(id) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/chitiethopdongs/?id=' + id + '&token=' + token);
            let responseJson = response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
        }
    }

    function tinhTienTatToan(tienvay, kydonglai, cachtinhlai, lai, solantra) {
        var tonglai = 0;
        if (cachtinhlai == 0) {
            tonglai = lai * kydonglai * solantra;
            setTongTienTatToan(tienvay + tonglai);
        }
        else {
            tonglai = (tienvay * lai / 100) * kydonglai * solantra;
            setTongTienTatToan(tienvay + tonglai);
        }
    }

    function tinhNgaySauKhiDaGiaHan(kieuTinhLai, ngayTraGoc, soLanGiaHan) {
        var ngayMoment = moment(ngayTraGoc);
        if (kieuTinhLai == 0) {
            ngayMoment = ngayMoment.add(soLanGiaHan, "days");
        }
        else {
            ngayMoment = ngayMoment.add(soLanGiaHan, "months");
        }
        var ngayDate = new Date(ngayMoment);
        setNgayDuocCapNhat(ngayDate);

    }

    function tinhTienVayGocSauKhiDaTraBotGoc(tienVayGoc, tienTraBotGoc) {
        var money = tienVayGoc - tienTraBotGoc;
        setTienSauKhiTraBotGoc(parseInt(money));
    }

    function tinhTienVayGocSauKhiVayThem(tienVayGoc, tienTraBotGoc) {
        var money = tienVayGoc + tienTraBotGoc;
        setTienSauKhiVayThem(parseInt(money));
    }

    function initDataChiTiet() {
        getAllCTHD(id).then((result) => {
            // dispatch({type:'REFRESH',page:0,newData:result});
            setDataChiTiet(result);
        }).catch((err) => {
            console.log(err);
        });
    }

    function tinhTienLaiDenNgayHomNay(dateVay, tienVay, cachTinhLai, laiSuat) {
        var ngay1 = moment(dateVay);
        var ngayngay1 = new Date(ngay1);
        //alert(ngayngay2.getDate());

        var ngay2 = moment(new Date());
        var ngayngay2 = new Date(ngay2);
        //alert(ngayngay3.getDate());

        var lairesult = 0;

        if (cachTinhLai == 0) {
            var ngayresult = moment(ngay2).diff(ngay1, "days");
            lairesult = laiSuat * ngayresult;
        }
        else {
            var thangresult = moment(ngay2).diff(ngay1, "months");
            lairesult = (tienVay * laiSuat / 100) * thangresult;
        }
        setLaiToNow(lairesult);
    }

    function refreshData() {
        setRefreshing(true);
        getInforHopDong(id).then((result) => {
            if (result != data) {
                setInforHD({
                    maHopDong: result.maHopDong,
                    tenKhachHang: result.tenKhachHang,
                    sdt: result.sdt,
                    email: result.email,
                    diaChi: result.diaChi,
                    thongTinCMT: {
                        idCMT: result.thongTinCMT.idCMT,
                        noiCap: result.thongTinCMT.noiCap
                    },
                    ngaySinh: result.ngaySinh,
                    thongTinHopDong: {
                        ngayVay: result.thongTinHopDong.ngayVay,
                        tongTienVay: result.thongTinHopDong.tongTienVay,
                        soKyDongLai: result.thongTinHopDong.soKyDongLai,
                        cachTinhLai: result.thongTinHopDong.cachTinhLai,
                        giaTriLaiSuat: result.thongTinHopDong.giaTriLaiSuat,
                        soLanTra: result.thongTinHopDong.soLanTra,
                        // kieuDongLai: result.thongTinHopDong.kieuDongLai,
                        ngayTraGoc: result.thongTinHopDong.ngayTraGoc,
                        tinChap: result.thongTinHopDong.tinChap,
                        ghiChu: result.thongTinHopDong.ghiChu
                    },
                    trangThaiHopDong: result.trangThaiHopDong
                });
                setRefreshing(false);
            }
        }).catch((err) => {
            setRefreshing(false); 
        });
    }

    //Cập nhật trạng thái hợp đồng = 1 (trangThaiHopDong 0:đủ lãi,1:nợ lãi,2:quá hạn,3:hoàn thành,4:hủy,5:chờ duyệt)
    async function TatToanHopDong(id) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/tattoanhopdongs?token=' + token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // username:this.state.username,
                    // password:this.state.password
                    id: id
                })
            });

            let responseJson = await response.json();
            // Alert.alert(JSON.stringify(responseJson));


            if (responseJson.status == 'ok') {

                ThemChiTietHopDong_TatToan();
                //setXoaState(true);
            } else {
                Alert.alert('Tất toán không thành công !');
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function CapNhatNgayTraGoc(id) {

        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/giahanhopdongs?token=' + token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // username:this.state.username,
                    // password:this.state.password
                    id: id,
                    ngayCapNhat: ngayDuocCapNhat
                })
            });

            let responseJson = await response.json();
            // Alert.alert(JSON.stringify(responseJson));


            if (responseJson.status == 'ok') {
                //setXoaState(true);
                ThemChiTietHopDong_GiaHanKy();
            } else {
                Alert.alert('Không cập nhật !');
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function CapNhatTongTienVay_SauKhiVayThem(id) {

        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/vaythemhopdongs?token=' + token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // username:this.state.username,
                    // password:this.state.password
                    id: id,
                    tongTienVay: tienSauKhiVayThem
                })
            });

            let responseJson = await response.json();
            // Alert.alert(JSON.stringify(responseJson));


            if (responseJson.status == 'ok') {
                //setXoaState(true);
                ThemChiTietHopDong_VayThem();
            } else {
                Alert.alert('Không cập nhật !');
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function CapNhatTongTienVay_SauKhiTraBotGoc(id) {

        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/trabotgochopdongs?token=' + token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // username:this.state.username,
                    // password:this.state.password
                    id: id,
                    tongTienVay: tienSauKhiTraBotGoc
                })
            });

            let responseJson = await response.json();
            // Alert.alert(JSON.stringify(responseJson));


            if (responseJson.status == 'ok') {
                //setXoaState(true);
                ThemChiTietHopDong_TraBotGoc();
            } else {
                Alert.alert('Không cập nhật !');
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function CapNhatTrangThaiHopDong(id) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/donglaihopdongs?token=' + token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // username:this.state.username,
                    // password:this.state.password
                    id: id,
                    statusNoLai: trangThaiNoLai
                })
            });

            let responseJson = await response.json();
            // Alert.alert(JSON.stringify(responseJson));


            if (responseJson.status == 'ok') {
                //setXoaState(true);
            } else {
                Alert.alert('Không cập nhật !');
            }

        } catch (error) {
            console.log(error)
        }
    }


    async function getInforHopDong(id) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/hopdongs?id=' + id + '&token=' + token);
            let responseJson = await response.json();
            return responseJson[0];

        } catch (e) {
            console.log(e);
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
    controlButtonSide: {
        marginTop: height / 30,
        height: height / 3,
        width: width,
        marginBottom: height / 10,
        marginHorizontal: 8,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
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
        height: 80,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF",
        borderRadius: 3
    },
});
