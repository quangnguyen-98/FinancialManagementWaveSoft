import React, {useState} from 'react';
import {Text, View, StyleSheet,  ScrollView, AsyncStorage,Dimensions} from 'react-native';
import {TieuDeUser,ItemThongTinUser} from "../component/users";
import {apiLink} from '../config/constant';
const {width,height} = Dimensions.get('window');
export default class ThongTinUserScreen extends React.Component {
   constructor(props){
       super(props);
       this.state={
           email:'',
           hoTen:'',
           gioiTinh:'',
           ngaySinh:'',
           diaChi:'',
           sdt:'',
           hinhAnh:'',
           vaiTro:'',
       }
   }
    render(){
        return (
            <View style={styles.container}>
                <TieuDeUser hoTen={this.state.hoTen} email={this.state.email} hinhAnh={this.state.hinhAnh}/>
                <View style={styles.thongTin}>
                    <ScrollView style={{width:'100%'}}>
                        <ItemThongTinUser tieuDe={'Họ tên:'} giaTri={this.state.hoTen}/>
                        <ItemThongTinUser tieuDe={'Giới tính:'} giaTri={this.state.gioiTinh == true ? 'Nam' :'Nữ'}/>
                        <ItemThongTinUser tieuDe={'Ngày sinh:'} giaTri={this.state.ngaySinh.ngay+'/'+this.state.ngaySinh.thang+'/'+this.state.ngaySinh.nam}/>
                        <ItemThongTinUser tieuDe={'Địa chỉ:'} giaTri={this.state.diaChi}/>
                        <ItemThongTinUser tieuDe={'SĐT:'} giaTri={this.state.sdt}/>
                        <ItemThongTinUser tieuDe={'Quyền:'} giaTri={this.state.vaiTro}/>
                    </ScrollView>
                </View>
            </View>
        );
    }
    componentDidMount() {
        getInfor().then((infor)=>{
            let vaiTro;
            if(infor.vaiTro == 0){
                vaiTro = 'Admin'
            }
            if(infor.vaiTro == 1){
                vaiTro = 'Chủ cho vay'
            }
            if(infor.vaiTro == 2){
                vaiTro = 'Nhân viên'
            }
            this.setState({
                email:infor.email,
                hoTen:infor.hoTen,
                gioiTinh:infor.gioiTinh,
                ngaySinh:infor.ngaySinh,
                diaChi:infor.diaChi,
                sdt:infor.sdt,
                hinhAnh:infor.hinhAnh,
                vaiTro:vaiTro,
            });
        });

    }

}
async function getInfor() {
    try{
        let token = await AsyncStorage.getItem('token');
        let response = await fetch(apiLink+'users?token='+token);
        let responseJson = await response.json();
        return responseJson[0];

    }
    catch (e) {
        console.log(e);
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    thongTin:{
        flex:3,
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop: 5,
        marginHorizontal:'2%'
    }
});

