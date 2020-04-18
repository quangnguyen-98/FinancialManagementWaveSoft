import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    AsyncStorage,
    ScrollView
} from 'react-native';
import { apiLink } from "../../config/constant";
import { ThongTinUserTheoDong, TieuDeUser } from "../../component";
import { useSelector, useDispatch } from "react-redux";

export default function ChiTietNhanVienScreen({ navigation }) {
    const nhanVienDuocChonReducers = useSelector(state => state.nhanVienDuocChonReducers);
    const trangThaiDialog = useSelector(state => state.diaglogKhoaUserReducers);
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
                    id: nhanVienDuocChonReducers.id
                })
            });
            let responseJson = await response.json();

            if (responseJson.status == 'ok') {
                Alert.alert('Khóa thành công !');
            } else {
                Alert.alert('Lỗi');
            }

        } catch (e) {
            console.log(JSON.stringify(e));
        }
    }

    async function moKhoaTaiKhoan(id) {
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

            if (responseJson.status == 'ok') {
                Alert.alert('Mở khóa thành công !');

            } else {
                Alert.alert('Lỗi');
            }
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    }

    useEffect(() => {
        dispatch({ type: 'CLOSE_DIALOG' });
        getInforNhanVien(nhanVienDuocChonReducers.id).then((result) => {
            setInfor({
                email: result.email,
                hoTen: result.hoTen,
                gioiTinh: result.gioiTinh,
                ngaySinh: result.ngaySinh,
                diaChi: result.diaChi,
                sdt: result.sdt,
                hinhAnh: result.hinhAnh,
                vaiTro: 'Nhân viên',
                trangThaiKhoa: result.trangThaiKhoa,
            });

        }).catch((err) => {
            console.log(err);
        });
    }, []);
    useEffect(()=>{
        if(trangThaiDialog === false)return;
        Alert.alert(`${infor.trangThaiKhoa?'Mở khóa':'Khóa'} tài khoản !`,  `Bạn có muốn ${infor.trangThaiKhoa?'Mở khóa':'Khóa'} tài khoản này không ?`,
            [
                {
                    text: 'Đồng ý', onPress: () => {
                        if(infor.trangThaiKhoa === true){
                            moKhoaTaiKhoan(nhanVienDuocChonReducers.id).then(()=>{
                                dispatch({type:'REFRESH'});
                            });
                        }else if(infor.trangThaiKhoa === false){
                            khoaTaiKhoan(nhanVienDuocChonReducers.id).then(()=>{
                                dispatch({type:'REFRESH'});
                            });
                        }
                        dispatch({type:'CLOSE_DIALOG'});
                        navigation.navigate('Quản lý nhân viên');
                    }
                },
                {text: 'Hủy', onPress: () => dispatch({type:'CLOSE_DIALOG'}), style: 'cancel'}
            ],
            {cancelable: false});
    },[trangThaiDialog]);
    return (

        <View style={styles.container}>
            <TieuDeUser hoTen={infor.hoTen} email={infor.email} hinhAnh={infor.hinhAnh} nutSua={false} />
            <View style={styles.thongTin}>
                <ScrollView style={{ width: '100%' }}>
                    <ThongTinUserTheoDong type={'bt'} tieuDe={'Họ tên:'} giaTri={infor.hoTen} />
                    <ThongTinUserTheoDong type={'bt'} tieuDe={'Giới tính:'} giaTri={infor.gioiTinh == true ? 'Nam' : 'Nữ'} />
                    <ThongTinUserTheoDong type={'bt'} tieuDe={'Ngày sinh:'}
                                          giaTri={new Date(infor.ngaySinh).getDate() + '/' + (new Date(infor.ngaySinh).getMonth() + 1) + '/' + new Date(infor.ngaySinh).getFullYear()}
                    />
                    <ThongTinUserTheoDong type={'bt'} tieuDe={'Địa chỉ:'} giaTri={infor.diaChi} />
                    <ThongTinUserTheoDong type={'sdt'} tieuDe={'SĐT:'} giaTri={infor.sdt} />
                    <ThongTinUserTheoDong type={'bt'} tieuDe={'Quyền:'} giaTri={infor.vaiTro} />
                </ScrollView>
            </View>
        </View>
    );
}

async function getInforNhanVien(id) {
    try {
        let token = await AsyncStorage.getItem('token');
        let response = await fetch(apiLink + 'managers/users?id=' + id + '&token=' + token);
        let responseJson = await response.json();
        return responseJson[0];

    } catch (e) {
        console.log(JSON.stringify(e));
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

