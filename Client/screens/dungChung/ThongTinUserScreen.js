import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView, AsyncStorage, Dimensions} from 'react-native';
import {TieuDeUser, ThongTinUserTheoDong} from "../../component";
import {apiLink} from '../../config/constant';
import {useSelector} from "react-redux";

const {width, height} = Dimensions.get('window');
export default function ThongTinUserScreen() {

    var isMounted = false;
    const trangThaiDialog = useSelector(state=>state.diaglogKhoaUserReducers);
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
    // const [isMounted, setIsMounted ]= useState(true);

    useEffect(() => {
        isMounted = true;
       initData();
    }, []);

    useEffect(() => {
        initData();
    }, [trangThaiDialog]);
    return (
        <View style={styles.container}>
            <TieuDeUser hoTen={infor.hoTen} email={infor.email} hinhAnh={infor.hinhAnh} gioiTinh={infor.gioiTinh} ngaySinh={infor.ngaySinh} sdt={infor.sdt} diaChi={infor.diaChi} nutSua={true}/>
            <View style={styles.thongTin}>
                <ScrollView style={{width: '100%'}}>
                    <ThongTinUserTheoDong tieuDe={'Họ tên:'} giaTri={infor.hoTen}/>
                    <ThongTinUserTheoDong tieuDe={'Giới tính:'} giaTri={infor.gioiTinh == true ? 'Nam' : 'Nữ'}/>
                    <ThongTinUserTheoDong tieuDe={'Ngày sinh:'}
                                          giaTri={new Date(infor.ngaySinh).getDate() + '/' + (new Date(infor.ngaySinh).getMonth()+1) + '/' + new Date(infor.ngaySinh).getFullYear()}
                    />
                    <ThongTinUserTheoDong tieuDe={'SĐT:'} giaTri={infor.sdt}/>
                    <ThongTinUserTheoDong tieuDe={'Địa chỉ:'} giaTri={infor.diaChi}/>
                    <ThongTinUserTheoDong tieuDe={'Quyền:'} giaTri={infor.vaiTro}/>
                </ScrollView>
            </View>
        </View>
    );
    function initData() {
        getInfor().then((infor) => {
            setInfor({
                email: infor.email,
                hoTen: infor.hoTen,
                gioiTinh: infor.gioiTinh,
                ngaySinh: infor.ngaySinh,
                diaChi: infor.diaChi,
                sdt: infor.sdt,
                hinhAnh: infor.hinhAnh
            })
            switch (infor.vaiTro) {
                case 0: {
                    setInfor({
                        ...infor,
                        vaiTro: 'Admin'
                    });
                    break;
                }
                case 1: {
                    setInfor({
                        ...infor,
                        vaiTro: 'Chủ cho vay'
                    })
                    break;
                }
                case 2: {
                    setInfor({
                        ...infor,
                        vaiTro: 'Nhân viên'
                    });
                    break;
                }
            }
        }).catch((err) => {
            console.log(err);
        });
        return () => {
            isMounted = false;
        }
    }
}

async function getInfor() {
    try {
        let token = await AsyncStorage.getItem('token');
        let response = await fetch(apiLink + 'users?token=' + token);
        let responseJson = await response.json();
        return responseJson;

    } catch (e) {
        console.log(e);
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

