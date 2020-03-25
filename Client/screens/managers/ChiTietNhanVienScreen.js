import React, {useState, useEffect} from 'react';
import {
    View,
    StyleSheet,
    Alert,
    AsyncStorage,
    ScrollView
} from 'react-native';
import {apiLink} from "../../config/constant";
import {ThongTinUserTheoDong, TieuDeUser} from "../../component";
import {useSelector, useDispatch} from "react-redux";
import Dialog from "react-native-dialog";
import {useNavigation} from "@react-navigation/native";

export default function ChiTietNhanVienScreen({navigation, route}) {
    const nhanVienDuocChonReducers = useSelector(state => state.nhanVienDuocChonReducers);
    const dialogKhoaUser = useSelector(state => state.diaglogKhoaUserReducers);
    const dispatch = useDispatch();
    const [infor, setInfor] = useState({
        email: '',
        hoTen: '',
        gioiTinh: '',
        ngaySinh: '',
        diaChi: '',
        sdt: '',
        hinhAnh: '',
        vaiTro: '',
        trangThaiKhoa: false,
    });
    useEffect(() => {
        dispatch({type: 'CLOSE_DIALOG'});
        getInforNhanVien(nhanVienDuocChonReducers.id).then((result) => {
            setInfor({
                email: result.email,
                hoTen: result.hoTen,
                gioiTinh: result.gioiTinh,
                ngaySinh: result.ngaySinh,
                diaChi: result.diaChi,
                sdt: result.sdt,
                hinhAnh: result.hinhAnh,
                vaiTro: 'Chủ cho vay',
                trangThaiKhoa: result.trangThaiKhoa,
            });

        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (

        <View style={styles.container}>
            <TieuDeUser hoTen={infor.hoTen} email={infor.email} hinhAnh={infor.hinhAnh} nutSua={false}/>
            <View style={styles.thongTin}>
                <ScrollView style={{width: '100%'}}>
                    <ThongTinUserTheoDong tieuDe={'Họ tên:'} giaTri={infor.hoTen}/>
                    <ThongTinUserTheoDong tieuDe={'Giới tính:'} giaTri={infor.gioiTinh == true ? 'Nam' : 'Nữ'}/>
                    <ThongTinUserTheoDong tieuDe={'Ngày sinh:'}
                                          giaTri={new Date(infor.ngaySinh).getDate() + '/' + (new Date(infor.ngaySinh).getMonth()+1) + '/' + new Date(infor.ngaySinh).getFullYear()}
                    />
                    <ThongTinUserTheoDong tieuDe={'Địa chỉ:'} giaTri={infor.diaChi}/>
                    <ThongTinUserTheoDong tieuDe={'SĐT:'} giaTri={infor.sdt}/>
                    <ThongTinUserTheoDong tieuDe={'Quyền:'} giaTri={infor.vaiTro}/>
                </ScrollView>
            </View>
            <View>
                <Dialog.Container visible={dialogKhoaUser}>
                    <Dialog.Title>{infor.trangThaiKhoa == true ? 'Mở khóa' : 'Khóa'} tài khoản !</Dialog.Title>
                    <Dialog.Description>
                        Bạn có muốn {infor.trangThaiKhoa == true ? 'Mở khóa' : 'Khóa'} tài khoản này không ?
                    </Dialog.Description>
                    <Dialog.Button
                        label={infor.trangThaiKhoa ? 'Mở khóa' : 'Khóa'}
                        onPress={() => {
                            if (infor.trangThaiKhoa == true) {
                                moKhoaTaiKhoanNhanVien(nhanVienDuocChonReducers.id);
                            } else if (infor.trangThaiKhoa == false) {
                                khoaTaiKhoan(nhanVienDuocChonReducers.id);
                            }
                        }}
                    />
                    <Dialog.Button
                        label="Hủy"
                        onPress={() => {
                            dispatch({type: 'CLOSE_DIALOG'});
                        }}
                    />

                </Dialog.Container>


            </View>
        </View>

    );

    async function khoaTaiKhoan(id) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/lockusers?token=' + token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // username:this.state.username,
                    // password:this.state.password
                    id: nhanVienDuocChonReducers.id
                })
            });
            let responseJson = await response.json();

            navigation.navigate('Quản lý nhân viên', {
                refresh: true
            });
            if (responseJson.status == 'ok') {
                Alert.alert('Khóa thành công !');
                dispatch({type: 'CLOSE_DIALOG'});
            } else {
                Alert.alert('Lỗi');
                dispatch({type: 'CLOSE_DIALOG'});
            }

        } catch (e) {
            console.log(e);
        }
    }

    async function moKhoaTaiKhoanNhanVien(id) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/unlockusers?token=' + token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // username:this.state.username,
                    // password:this.state.password
                    id: nhanVienDuocChonReducers.id
                })
            });
            let responseJson = await response.json();
            // Alert.alert(JSON.stringify(responseJson));

            navigation.navigate('Quản lý nhân viên', {
                refresh: true
            });
            if (responseJson.status == 'ok') {
                Alert.alert('Mỏ khóa thành công !');
                dispatch({type: 'CLOSE_DIALOG'});
            } else {
                Alert.alert('Lỗi');
                dispatch({type: 'CLOSE_DIALOG'});
            }
        } catch (e) {
            console.log(e);
        }

    }

}



async function getInforNhanVien(id) {
    try {
        let token = await AsyncStorage.getItem('token');
        let response = await fetch(apiLink + 'managers/users?id=' + id + '&token=' + token);
        let responseJson = await response.json();
        return responseJson[0];

    } catch (e) {
        console.log(e);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    thongTin: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: '2%'
    }

});

