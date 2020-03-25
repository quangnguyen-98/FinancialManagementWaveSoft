import React, {useState, useEffect} from 'react';
import { View, StyleSheet,  Alert, AsyncStorage, ScrollView} from 'react-native';
import {apiLink} from "../../config/constant";
import {ThongTinUserTheoDong,TieuDeUser} from"../../component";
import {useSelector, useDispatch} from "react-redux";
import Dialog from "react-native-dialog";
import {useNavigation} from "@react-navigation/native";
export default function ChiTietChuChoVayScreen() {
    const navigation = useNavigation();
    const chuChoVayDuocChonReducers = useSelector(state=>state.chuChoVayDuocChonReducers);
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
    useEffect(() => {
        dispatch({type: 'CLOSE_DIALOG'});
        getInfor(chuChoVayDuocChonReducers.id).then((result) => {
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
                <Dialog.Container visible={trangThaiDialog}>
                    <Dialog.Title>{infor.trangThaiKhoa?'Mở khóa':'Khóa'} tài khoản !</Dialog.Title>
                    <Dialog.Description>
                        Bạn có muốn {infor.trangThaiKhoa?'Mở khóa':'Khóa'} tài khoản này không ?
                    </Dialog.Description>
                    <Dialog.Button
                        label={infor.trangThaiKhoa?'Mở khóa':'Khóa'}
                        onPress={() => {
                            if(infor.trangThaiKhoa==true){
                                moKhoaTaiKhoan(chuChoVayDuocChonReducers.id);
                            }else if(infor.trangThaiKhoa==false){
                                khoaTaiKhoan(chuChoVayDuocChonReducers.id);
                            }
                        }}
                    />
                    <Dialog.Button
                        label="Hủy"
                        onPress={() => {
                            dispatch({type:'CLOSE_DIALOG'});
                        }}
                    />

                </Dialog.Container>
            </View>
        </View>

    );

    async function khoaTaiKhoan(id) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'admin/lockmanagers?token='+token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // username:this.state.username,
                    // password:this.state.password
                    id: chuChoVayDuocChonReducers.id
                })
            });
            let responseJson = await response.json();

            navigation.navigate('Quản lý chủ cho vay', {
                refresh:true
            });
            if(responseJson.status=='ok'){
                Alert.alert('Khóa thành công !');
                 dispatch({type:'CLOSE_DIALOG'});
            }else {
                Alert.alert('Lỗi');
                dispatch({type:'CLOSE_DIALOG'});
            }

        } catch (e) {
            console.log(e);
        }
    }
    async function moKhoaTaiKhoan(id) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'admin/unlockmanagers?token='+token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // username:this.state.username,
                    // password:this.state.password
                    id: chuChoVayDuocChonReducers.id
                })
            });
            let responseJson = await response.json();
            // Alert.alert(JSON.stringify(responseJson));

            navigation.navigate('Quản lý chủ cho vay', {
                refresh:true
            });
            if(responseJson.status=='ok'){
                Alert.alert('Mỏ khóa thành công !');
                 dispatch({type:'CLOSE_DIALOG'});
            }else {
                Alert.alert('Lỗi');
                dispatch({type:'CLOSE_DIALOG'});
            }
        } catch (e) {
            console.log(e);
        }

    }

}


async function getInfor(id) {
    try {
        let token = await AsyncStorage.getItem('token');
        let response = await fetch(apiLink + 'admin/managers?id=' + id + '&token=' + token);
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

