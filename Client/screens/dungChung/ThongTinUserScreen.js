import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView, AsyncStorage, Dimensions} from 'react-native';
import {TieuDeUser, ThongTinUserTheoDong} from "../../component";
import {apiLink} from '../../config/constant';
import {useSelector,useDispatch} from "react-redux";

export default function ThongTinUserScreen() {
    const dispatch = useDispatch();
    const refreshReducers = useSelector(state=>state.refreshReducers);
    const [infor, setInfor] = useState({
        email: '',
        hoTen: '',
        gioiTinh: '',
        ngaySinh: '',
        diaChi: '',
        sdt: '',
        hinhAnh: '',
        vaiTro: '',
    });
    function initData() {
        getInfor().then((infor) => {
            switch (infor.vaiTro) {
                case 0: {
                    setInfor({
                        email: infor.email,
                        hoTen: infor.hoTen,
                        gioiTinh: infor.gioiTinh,
                        ngaySinh: infor.ngaySinh,
                        diaChi: infor.diaChi,
                        sdt: infor.sdt,
                        hinhAnh: infor.hinhAnh,
                        vaiTro: 'Admin'
                    });
                    break;
                }
                case 1: {
                    setInfor({ email: infor.email,
                        hoTen: infor.hoTen,
                        gioiTinh: infor.gioiTinh,
                        ngaySinh: infor.ngaySinh,
                        diaChi: infor.diaChi,
                        sdt: infor.sdt,
                        hinhAnh: infor.hinhAnh,
                        vaiTro: 'Chủ cho vay'
                    })
                    break;
                }
                case 2: {
                    setInfor({
                        email: infor.email,
                        hoTen: infor.hoTen,
                        gioiTinh: infor.gioiTinh,
                        ngaySinh: infor.ngaySinh,
                        diaChi: infor.diaChi,
                        sdt: infor.sdt,
                        hinhAnh: infor.hinhAnh,
                        vaiTro: 'Nhân viên'
                    });
                    break;
                }
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    // useEffect(() => {
    //     let isMounted = true;
    //     if(isMounted){
    //         initData();
    //     }
    //   return()=>{
    //         isMounted = false;
    //   }
    //
    // }, []);

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            initData();
        }
        return()=>{
            isMounted = false;
        }
    }, [refreshReducers]);

    return (
        <View style={styles.container}>
            <TieuDeUser hoTen={infor.hoTen} email={infor.email} hinhAnh={infor.hinhAnh} gioiTinh={infor.gioiTinh} ngaySinh={infor.ngaySinh} sdt={infor.sdt} diaChi={infor.diaChi} nutSua={true}/>
            <View style={styles.thongTin}>
                <ScrollView style={{width: '100%'}}>
                    <ThongTinUserTheoDong type={'bt'} tieuDe={'Họ tên:'} giaTri={infor.hoTen}/>
                    <ThongTinUserTheoDong type={'bt'} tieuDe={'Giới tính:'} giaTri={infor.gioiTinh == true ? 'Nam' : 'Nữ'}/>
                    <ThongTinUserTheoDong type={'bt'} tieuDe={'Ngày sinh:'}
                                          giaTri={new Date(infor.ngaySinh).getDate() + '/' + (new Date(infor.ngaySinh).getMonth()+1) + '/' + new Date(infor.ngaySinh).getFullYear()}
                    />
                    <ThongTinUserTheoDong type={'bt'} tieuDe={'SĐT:'} giaTri={infor.sdt}/>
                    <ThongTinUserTheoDong type={'bt'} tieuDe={'Địa chỉ:'} giaTri={infor.diaChi}/>
                    <ThongTinUserTheoDong type={'bt'} tieuDe={'Quyền:'} giaTri={infor.vaiTro}/>
                </ScrollView>
            </View>
        </View>
    );

}

async function getInfor() {
    try {
        let token = await AsyncStorage.getItem('token');
        let response = await fetch(apiLink + 'users?token=' + token);
        let responseJson = await response.json();
        return responseJson;

    } catch (e) {
        console.log(JSON.stringify(e));
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    thongTin: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: '2%'
    }
});

