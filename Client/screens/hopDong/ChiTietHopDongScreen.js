import React, {Fragment, useEffect, useState} from 'react';
import {
    Alert,
    AsyncStorage,
    Dimensions,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Modal
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {apiLink} from "../../config/constant";
import {useDispatch, useSelector} from 'react-redux';
import {Button,ModalNguoiTaoHopDong,ModalXoaHopDong,ModalGuiMail,ModalNhanTin,ModalVayThem,ModalTraBotGoc,ModalGiaHanKy} from "../../component";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {formatCurrency} from '../../utils/hamHoTro';

const {width, height} = Dimensions.get('window');

export default function ChiTietHopDongScreen({route, navigation}) {
    const dispatch = useDispatch();
    const [idHopDong, setIdHopDong] = useState(route.params.id);
    const switchScreenReducers = useSelector(state => state.switchScreenReducers);
    const loaiHDDangChonReducers = useSelector(state => state.loaiHDDangChonReducers);
    const refreshReducers = useSelector(state => state.refreshReducers);
    const [refreshing, setRefreshing] = useState(false);
    const openModalReducers = useSelector(state => state.openModalReducers);
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
            kieuDongLai: '',
            ngayTraGoc: new Date(),
            tinChap: '',
            ghiChu: ''
        },
        trangThaiHopDong: '',
        ngayTatToan:new Date(),
        tienTatToan:''
    });
    const [nguoiTaoHopDong, setNguoiTaoHopDong] = useState({
        hoTen: '',
        email: '',
        sdt: ''
    });
    const [statusEdit, setStatusEdit] = useState(false);
    const [hienThiPickerNgaySinh, setHienThiPickerNgaySinh] = useState(false);

    useEffect(() => {
        initData();
    }, [refreshReducers]);

    useEffect(() => {
        if (inforHD.maHopDong.length < 1) return;
        getNguoiTaoHopDong(inforHD.idNguoiTaoHopDong).catch((e) => {
            console.log(e)
        });
        dispatch({type: 'SET_THONGTIN_KH', ten: inforHD.tenKhachHang});
    }, [inforHD]);

    function initData() {
        setRefreshing(true);
        getInforHopDong(idHopDong).then((result) => {
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
                ngaySinh: new Date(result.ngaySinh),
                thongTinHopDong: {
                    ngayVay: new Date(result.thongTinHopDong.ngayVay),
                    tongTienVay: result.thongTinHopDong.tongTienVay,
                    soKyDongLai: result.thongTinHopDong.soKyDongLai,
                    cachTinhLai: result.thongTinHopDong.cachTinhLai,
                    giaTriLaiSuat: result.thongTinHopDong.giaTriLaiSuat,
                    soLanTra: result.thongTinHopDong.soLanTra,
                    kieuDongLai: result.thongTinHopDong.kieuDongLai,
                    ngayTraGoc: new Date(result.thongTinHopDong.ngayTraGoc),
                    tinChap: result.thongTinHopDong.tinChap,
                    ghiChu: result.thongTinHopDong.ghiChu
                },
                trangThaiHopDong: result.trangThaiHopDong,
                idNguoiTaoHopDong: result.idNguoiTaoHopDong,
                ngayTatToan:new Date(result.ngayTatToan),
                tienTatToan:result.tienTatToan

            });
            setRefreshing(false);
        }).catch((e) => {
            console.log(JSON.stringify(e));
        });
    }

    async function SuaHopDong() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + switchScreenReducers + '/hopdongs?token=' + token, {
                method: 'PUT',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    maHopDong: idHopDong,
                    tenKhachHang: inforHD.tenKhachHang,
                    sdt: inforHD.sdt,
                    email: inforHD.email,
                    diaChi: inforHD.diaChi,
                    thongTinCMT: inforHD.thongTinCMT,
                    ngaySinh: new Date(inforHD.ngaySinh),
                    tinChap: inforHD.thongTinHopDong.tinChap,
                    ghiChu: inforHD.thongTinHopDong.ghiChu
                })
            });
            let responseJson = await response.json();
            if (responseJson.status === 'ok') {
                Alert.alert(responseJson.message);
            } else if (responseJson.status === 'fail') {

                Alert.alert(responseJson.message);
                // navigation.goBack();
            }

        } catch (e) {
            await Alert.alert(e.toString());
        }
    }

    async function DuyetHopDong() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + switchScreenReducers + '/duyethopdongs?token=' + token, {
                method: 'PUT',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    idHopDong: idHopDong
                })
            });
            let responseJson = await response.json();
            if (responseJson.status === 'ok') {
                Alert.alert(responseJson.message);
            } else if (responseJson.status === 'fail') {

                Alert.alert(responseJson.message);
                // navigation.goBack();
            }

        } catch (e) {
            await Alert.alert(e.toString());
        }
    }


    async function getInforHopDong(id) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + switchScreenReducers + '/hopdongs?id=' + id + '&token=' + token);
            let responseJson = await response.json();
            return responseJson[0];

        } catch (e) {
            console.log(JSON.stringify(e));
        }
    }

    async function getNguoiTaoHopDong(id) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + switchScreenReducers + '/nguoitaohopdongs?id=' + id + '&token=' + token);
            let responseJson = await response.json();
            setNguoiTaoHopDong({
                hoTen: responseJson.hoTen,
                email: responseJson.email,
                sdt: responseJson.sdt
            })
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    }

    return (
        <KeyboardAwareScrollView style={{flex: 1, flexDirection: 'column', paddingTop: height / 15}}
                                 enableResetScrollToCoords={false}
                                 refreshControl={<RefreshControl refreshing={refreshing} onRefresh={initData}/>}
        >
            <View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{fontSize: 24, fontWeight: 'bold', marginLeft: 8}}>Thông Tin Khách Hàng</Text>
                    {
                        loaiHDDangChonReducers === 'dangvay' &&(
                            <TouchableOpacity onPress={() => {
                                if (statusEdit) {
                                    SuaHopDong().then(() => {
                                        dispatch({type: 'REFRESH'});
                                        setStatusEdit(!statusEdit);
                                    });
                                }
                                dispatch({type: 'REFRESH'});
                                setStatusEdit(!statusEdit);
                            }}>
                                <Text style={{
                                    fontSize: 24, fontWeight: 'bold', marginHorizontal: 2, color: '#1890ff'
                                }}> {statusEdit ? 'Lưu' : 'Sửa'}</Text>
                            </TouchableOpacity>
                        )
                    }

                    <TouchableOpacity onPress={() => {
                        setStatusEdit(!statusEdit)
                    }} style={{display: !statusEdit ? 'none' : 'block'}}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: statusEdit ? '#f5222d' : 'black'
                        }}> Hủy</Text>
                    </TouchableOpacity>
                </View>
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
                               value={inforHD.tenKhachHang.toString()}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       tenKhachHang: text
                                   })
                               }}>
                    </TextInput>
                </View>
                <View style={styles.thongTin}>
                    <Text style={styles.input}>Số điện thoại: </Text>
                    <TextInput placeholder="Nhập số điện thoại" keyboardType={"number-pad"} style={styles.textInput}
                               editable={statusEdit}
                               value={inforHD.sdt}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       sdt: text
                                   })
                               }}>
                    </TextInput>
                </View>
                <View style={styles.thongTin}>
                    <Text style={styles.input}>Email: </Text>
                    <TextInput placeholder="Nhập email" keyboardType={"email-address"} style={styles.textInput}
                               editable={statusEdit}
                               value={inforHD.email}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       email: text
                                   })
                               }}>
                    </TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Địa Chỉ: </Text>
                    <TextInput placeholder="Nhập địa chỉ" style={styles.richTextInput}
                               editable={statusEdit}
                               value={inforHD.diaChi}
                               multiline={true}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       diaChi: text
                                   })
                               }}>
                    </TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Số CMT: </Text>
                    <TextInput placeholder="Nhập số chứng minh thư" keyboardType={"number-pad"} style={styles.textInput}
                               editable={statusEdit}
                               defaultValue={inforHD.thongTinCMT.idCMT}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       thongTinCMT: {
                                           ...inforHD.thongTinCMT,
                                           idCMT: text
                                       }
                                   })
                               }}>
                    </TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Nơi Cấp: </Text>
                    <TextInput placeholder="Nhập nơi cấp CMT" style={styles.textInput}
                               editable={statusEdit}
                               defaultValue={inforHD.thongTinCMT.noiCap}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       thongTinCMT: {
                                           ...inforHD.thongTinCMT,
                                           noiCap: text
                                       }
                                   })
                               }}>

                    </TextInput>
                </View>
                <DateTimePickerModal isVisible={hienThiPickerNgaySinh}
                                     headerTextIOS={'Chọn ngày sinh'}
                                     confirmTextIOS={'Xác nhận'}
                                     mode={'date'}
                                     date={new Date(inforHD.ngaySinh)}
                                     onConfirm={(selectedDate) => {
                                         setHienThiPickerNgaySinh(false);
                                         setInforHD({
                                             ...inforHD,
                                             ngaySinh: new Date(selectedDate)
                                         })

                                     }}
                                     onCancel={() => {
                                         setHienThiPickerNgaySinh(false);
                                     }}>

                </DateTimePickerModal>
                <View style={styles.thongTin}>
                    <Text style={styles.input}>Ngày Sinh: </Text>
                    <TouchableOpacity onPress={() => {
                        statusEdit ? setHienThiPickerNgaySinh(true) : null
                    }}>
                        <Text
                            style={styles.text}>{` ${inforHD.ngaySinh.getDate()}-${(inforHD.ngaySinh.getMonth() + 1)}-${inforHD.ngaySinh.getFullYear()}`}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.thongTin}>
                    <Text style={styles.input}>Tín chấp: </Text>
                    <TextInput placeholder="Nhập tài sản thế chấp" style={styles.textInput}
                               editable={statusEdit}
                               defaultValue={inforHD.thongTinHopDong.tinChap}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       thongTinHopDong: {
                                           ...inforHD.thongTinHopDong,
                                           tinChap: text
                                       }
                                   })
                               }}>
                    </TextInput>
                </View>
                <View style={styles.thongTin}>
                    <Text style={styles.input}>Ghi chú: </Text>
                    <TextInput placeholder="Nhập ghi chú nếu có" style={styles.textInput}
                               editable={statusEdit}
                               defaultValue={inforHD.thongTinHopDong.ghiChu}
                               onChangeText={(text) => {
                                   setInforHD({
                                       ...inforHD,
                                       thongTinHopDong: {
                                           ...inforHD.thongTinHopDong,
                                           ghiChu: text
                                       }
                                   })
                               }}>
                    </TextInput>
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
                    <Text style={styles.input}>Người tạo hợp đồng: </Text>
                    <Text style={styles.text} onPress={() => {
                        dispatch({type: 'OPEN_MODAL_NGUOITAO_HD'})
                    }}>{nguoiTaoHopDong.hoTen}</Text>
                </View>
                <View style={styles.thongTin}>
                    <Text style={styles.input}>Ngày Vay: </Text>
                    <Text
                        style={styles.text}>{` ${inforHD.thongTinHopDong.ngayVay.getDate()}-${(inforHD.thongTinHopDong.ngayVay.getMonth() + 1)}-${inforHD.thongTinHopDong.ngayVay.getFullYear()}`}</Text>
                </View>
                <View style={styles.thongTin}>
                    <Text style={styles.input}>Tổng Tiền Vay: </Text>
                    <TextInput style={styles.textInput} editable={false}
                               value={formatCurrency(inforHD.thongTinHopDong.tongTienVay).toString()}/>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Số kỳ đóng lãi: </Text>
                    <TextInput style={styles.textInput} editable={false}
                               value={inforHD.thongTinHopDong.soKyDongLai.toString()}></TextInput>
                </View>

                <View style={styles.thongTinRow}>
                    <Text style={styles.input}>
                        Cách tính lãi: {parseInt(inforHD.thongTinHopDong.cachTinhLai) === 0 ?
                        <Text style={styles.blue}>Ngày</Text> : <Text style={styles.blue}>Tháng</Text>}
                    </Text>
                    <View style={styles.thongTin}>
                        <Text style={styles.input}>
                            Kiểu đóng lãi: {parseInt(inforHD.thongTinHopDong.kieuDongLai) === 0 ?
                            <Text style={styles.blue}>Sau</Text> : <Text style={styles.blue}>Trước</Text>}
                        </Text>
                    </View>
                </View>

                <View style={styles.thongTin}>
                    <Text
                        style={styles.input}>{inforHD.thongTinHopDong.cachTinhLai == 0 ? 'Lãi/triệu/ngày:' : 'Lãi %/tháng'} </Text>
                    <TextInput style={styles.textInput}
                               value={formatCurrency(inforHD.thongTinHopDong.giaTriLaiSuat).toString()}
                               editable={false}/>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Số lần trả: </Text>
                    <TextInput style={styles.textInput} defaultValue={inforHD.thongTinHopDong.soLanTra.toString()}
                               editable={false}>
                    </TextInput>
                </View>

                <View style={styles.thongTin}>
                    <Text style={styles.input}>Ngày Trả Gốc: </Text>
                    <Text
                        style={styles.text}>{` ${inforHD.thongTinHopDong.ngayTraGoc.getDate()}-${(inforHD.thongTinHopDong.ngayTraGoc.getMonth() + 1)}-${inforHD.thongTinHopDong.ngayTraGoc.getFullYear()}`}</Text>
                </View>
                {
                    loaiHDDangChonReducers === 'dadong' && (
                        <Fragment>
                            <View style={styles.thongTin}>
                                <Text style={styles.input}>Ngày tất toán: </Text>
                                <Text
                                    style={styles.text}>{` ${inforHD.ngayTatToan.getDate()}-${(inforHD.ngayTatToan.getMonth() + 1)}-${inforHD.ngayTatToan.getFullYear()}`}</Text>
                            </View>
                            <View style={styles.thongTin}>
                                <Text style={styles.input}>Tiền tất toán: </Text>
                                <Text
                                    style={styles.text}>{formatCurrency(inforHD.tienTatToan)}</Text>
                            </View>
                        </Fragment>
                    )
                }

            </View>

            {/*//Các nút controll*/}
            {
                loaiHDDangChonReducers === 'dangvay' && (
                    <View style={{marginTop: 50, marginBottom: 100}}>
                        <View style={styles.wrapItem}>
                            <View style={styles.itemLeft}>
                                <TouchableOpacity style={styles.sizeButton} onPress={() => {
                                    navigation.navigate('Tất toán')
                                }}>
                                    <Button name={'Tất toán'} color={'#389e0d'}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.itemRight}>
                                <TouchableOpacity style={styles.sizeButton} onPress={() => {
                                    dispatch({type: 'OPEN_MODAL_GIAHANKY'})
                                }}>
                                    <Button name={'Gia hạn kỳ'} color={'#52c41a'}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.wrapItem}>
                            <View style={styles.itemLeft}>
                                <TouchableOpacity style={styles.sizeButton} onPress={() => {
                                    dispatch({type: 'OPEN_MODAL_TRABOTGOC'})
                                }}>
                                    <Button name={'Trả bớt gốc'} color={'#fa541c'}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.itemRight}>
                                <TouchableOpacity style={styles.sizeButton} onPress={() => {
                                    dispatch({type: 'OPEN_MODAL_VAYTHEM'})
                                }}>
                                    <Button name={'Vay thêm'} color={'#ff7a45'}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.wrapItem}>
                            <View style={styles.itemLeft}>
                                <TouchableOpacity style={styles.sizeButton} onPress={() => {
                                    dispatch({type: 'OPEN_MODAL_NHANTIN'})
                                }}>
                                    <Button name={'Nhắn tin'} color={'#08979c'}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.itemRight}>
                                <TouchableOpacity style={styles.sizeButton} onPress={() => {
                                    dispatch({type: 'OPEN_MODAL_GUIMAIL'})
                                }}>
                                    <Button name={'Gửi email'} color={'#36cfc9'}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.wrapItem}>
                            <View style={styles.itemLeft}>
                                <TouchableOpacity style={styles.sizeButton} onPress={() => {
                                    dispatch({type: 'OPEN_MODAL_XOAHOPDONG'})
                                }}>
                                    <Button name={'Xóa hợp đồng'} color={'#cf1322'}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.itemRight}>
                                <TouchableOpacity style={styles.sizeButton} onPress={() => {
                                    navigation.navigate('Lịch sử hoạt động');
                                }}>
                                    <Button name={'Lịch sử hoạt động'} color={'#ff4d4f'}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            }
            {
                loaiHDDangChonReducers === 'dangvay' && (
                    <Fragment>
                    {/* Modal Thông tin người tạo HĐ */}
                <Modal visible={openModalReducers.modalNguoiTaoHD} transparent={true}>
                <ModalNguoiTaoHopDong hoTen={nguoiTaoHopDong.hoTen} />
                </Modal>
            {/* Modal gia hạn kỳ */}
                <Modal visible={openModalReducers.modalGiaHanKy} transparent={true}>
                <ModalGiaHanKy hoTen={nguoiTaoHopDong.hoTen} />
                </Modal>
            {/* Modal trả bớt gốc */}
                <Modal visible={openModalReducers.modalTraBotGoc} transparent={true}>
                <ModalTraBotGoc hoTen={nguoiTaoHopDong.hoTen}/>
                </Modal>
            {/* Modal vay thêm */}
                <Modal visible={openModalReducers.modalVayThem} transparent={true}>
                <ModalVayThem hoTen={nguoiTaoHopDong.hoTen} />
                </Modal>
            {/* Modal nhắn tin */}
                <Modal visible={openModalReducers.modalNhanTin} transparent={true}>
                <ModalNhanTin hoTen={nguoiTaoHopDong.hoTen} sdt={inforHD.sdt}/>
                </Modal>
            {/* Modal gửi mail */}
                <Modal visible={openModalReducers.modalGuiMail} transparent={true}>
                <ModalGuiMail hoTen={nguoiTaoHopDong.hoTen} email={inforHD.email} />
                </Modal>
            {/* Modal xóa hợp đồng */}
                <Modal visible={openModalReducers.modalXoaHopDong} transparent={true}>
                <ModalXoaHopDong hoTen={nguoiTaoHopDong.hoTen} />
                </Modal>
                    </Fragment>
                )
            }

            {
                loaiHDDangChonReducers === 'choduyet' && (
                    <Fragment>
                        {
                            switchScreenReducers === 'managers' && (
                                <View style={{marginTop: 50, marginBottom: 100}}>
                                    <View style={styles.wrapItem}>
                                        <View style={styles.itemLeft}>
                                            <TouchableOpacity style={styles.sizeButton} onPress={() => {
                                                DuyetHopDong().then(() => {
                                                    dispatch({type: 'REFRESH'});
                                                    navigation.navigate('Hợp đồng đang vay')
                                                });
                                            }}>
                                                <Button name={'Duyệt hợp đồng'} color={'#389e0d'}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                    </Fragment>
                )
            }
            {
                loaiHDDangChonReducers === 'choduyet' && (
                    <Fragment>
                        {
                            switchScreenReducers === 'users' && (
                                <View style={{marginTop: 50, marginBottom: 100}}>
                                </View>
                            )
                        }
                    </Fragment>
                )
            }
            {
                loaiHDDangChonReducers === 'dadong' && (
                    <View style={{marginTop: 50, marginBottom: 100}}></View>
                )
            }
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
    thongTinRow: {
        flexDirection: 'row',
        marginHorizontal: 8,
        justifyContent: 'center'
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
    text: {
        borderWidth: 1,
        height: 32,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF",
        borderRadius: 3,
        paddingTop: 7,
    },
    richTextInput: {
        borderWidth: 1,
        height: 80,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF",
        borderRadius: 3
    },
    wrapItem: {
        height: height / 10,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 16
    },
    itemLeft: {
        flex: 1,
        alignItems: 'center'

    },
    itemRight: {
        flex: 1,
        alignItems: 'center'
    },
    blue: {
        color: '#0050b3',
        fontWeight: 'bold'
    },
    sizeButton: {
        width: width / 2.2,
        height: height / 10
    }
});
