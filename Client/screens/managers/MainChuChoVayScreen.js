import React,{useState} from 'react';
import {Text,View,StyleSheet,TextInput, Button,Image,TouchableOpacity, Alert} from 'react-native';
import QLHDComponent from '../../component/QLHDComponent';
import DangXuatComponent from '../../component/DangXuatComponent';
import DongLaiComponent from '../../component/DongLaiComponent';
import GiaHanComponent from '../../component/GiaHanComponent';
import NhanTinComponent from '../../component/NhanTinComponent';
import TatToanComponent from '../../component/TatToanComponent';
import TraBotVayThemComponent from '../../component/TraBotVayThemComponent';





export default function MainScreen(navigation){
    // const [name,setName]=useState('Huy');

    // _onPress1 = ()=>{
    //     setName('Quang');
    // }

    // _onPress2 = ()=>{
    //     setName('Huy');
    // }

        return(
            <View style={styles.container}>
               {/* <Text>My name is {name}</Text>
               <Button title='Change name 1' onPress={this._onPress1}></Button>
               <Button title='Change name 2' onPress={this._onPress2}></Button> */}

               <View style={styles.head}>
                    <View style={styles.mainhead}>
                            <Image style={styles.KH_image} source={require('../../assets/react.png')}></Image>
                        <View style={styles.KH_info}>
                            <Text style={styles.text1}>Huỳnh Phúc Huy</Text>
                            <Text style={styles.text2}>Mã KH: KH001</Text>
                        </View>
                    </View>
               </View>
               <View style={styles.main}>
                    {/* -Quản lý hợp đồng
                    -Đóng lãi
                    -Tất toán
                    -Trả bớt gốc, vay thêm
                    -Gia hạn kỳ
                    -Nhắn tin, email
                    -Đăng xuất */}
                    <View style={styles.chucnangALL}>
                        {/* <View style={styles.item}>
                            <TouchableOpacity style={styles.item2} onPress={_onPress}>
                            <Image style={styles.icon} source={require('../assets/contract.png')}></Image>
                            <Text style={styles.text3}>Quản lý hợp đồng</Text>
                            </TouchableOpacity>                            
                        </View> */}
                        <QLHDComponent></QLHDComponent>

                        <DongLaiComponent></DongLaiComponent>                          

                        <TatToanComponent></TatToanComponent>                       

                        <TraBotVayThemComponent></TraBotVayThemComponent>                           

                        <GiaHanComponent></GiaHanComponent>                         

                        <NhanTinComponent></NhanTinComponent>                   

                        <DangXuatComponent></DangXuatComponent>

                      

                    </View>
                   
               </View>
            </View>
        );
}


const styles = StyleSheet.create({
    input:{
        height:40,
        borderColor:'gray',
        borderWidth:1,
        width:300
    },
    container:{
        flex:1
    },
    head:{
        flex:1,
        backgroundColor:"#0000FF",
        justifyContent:'center',
        alignItems:'stretch',

    },
    main:{
        flex:3,
    },
    mainhead:{
        height:128,
        marginHorizontal:16,
        flexDirection:'row'
    },
    KH_image:{
        width:128,
        height:128,
        borderColor:"#FFFFFF",
        borderWidth:1
    },
    text1:{
        color:"#FFFFFF",
        fontSize:24,
        fontWeight:'bold'
    },
    text2:{
        color:"#FFFFFF",
        fontSize:16,
        paddingTop:5
    },
    KH_info:{
        justifyContent:'center',
        alignItems:'stretch',
        marginLeft:16
    },
    chucnangALL:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    item:{
        width: '50%',
        height:112,
        justifyContent:'center',
        alignItems:'center',
        marginTop:16
    },
    icon:{
        width:64,
        height:64,
    },
    text3:{
        paddingTop:10,
        fontWeight:'bold'
    },
    item2:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    }
});

