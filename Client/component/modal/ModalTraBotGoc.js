import React, {useState} from 'react';
import {Alert, AsyncStorage, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Button from "../../component/controlButton/Button";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import {apiLink} from "../../config/constant";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const { width, height } = Dimensions.get('window');
export default function ModalTraBotGoc() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [khoaNutGiaHan, setKhoaNutGiaHan] = useState(false);
    const hopDongDuocChonReducers = useSelector(state=>state.hopDongDuocChonReducers);
    const [hienThiPickerNgayTra, setHienThiPickerNgayTra] = useState(false);
    const [thongTinTraBotGoc,setThongTinTraBotGoc] = useState({
        ngayTraBotGoc:new  Date(),
        tienTraBotGoc:'',
        ghiChu:''
    });
    return (
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
            <KeyboardAwareScrollView style={styles.wraperContentHopDong}>
                <Text style={{ alignSelf: 'center', fontSize: 26, fontWeight: '900', color: 'red' }}>Trả bớt gốc</Text>
                <View style={{ flexDirection: 'column', marginTop: 20 }}>
                    <Text style={styles.input}>Ngày trả:</Text>
                    <DateTimePickerModal isVisible={hienThiPickerNgayTra}
                                         headerTextIOS={'Chọn ngày trả bớt gốc'}
                                         confirmTextIOS={'Xác nhận'}
                                         mode={'date'}
                                         date={new Date(thongTinTraBotGoc.ngayTraBotGoc)}
                                         onConfirm={(selectedDate) => {
                                             setHienThiPickerNgayTra(false);
                                             setThongTinTraBotGoc({
                                                 ...thongTinTraBotGoc,
                                                 ngayTraBotGoc: new Date(selectedDate)
                                             })

                                         }}
                                         onCancel={() => {
                                             setHienThiPickerNgayTra(false);
                                         }}>

                    </DateTimePickerModal>
                    <TouchableOpacity onPress={() => setHienThiPickerNgayTra(true)}>
                        <Text
                            style={styles.datePickerInput}>{` ${thongTinTraBotGoc.ngayTraBotGoc.getDate()}-${(thongTinTraBotGoc.ngayTraBotGoc.getMonth() + 1)}-${thongTinTraBotGoc.ngayTraBotGoc.getFullYear()}`}</Text>
                    </TouchableOpacity>
                    <Text style={styles.input}>Tiền trả bớt gốc:</Text>
                    <TextInput  style={styles.textInput}
                                onChangeText={(text)=>{setThongTinTraBotGoc({...thongTinTraBotGoc,lyDo:text})}}/>
                    <Text style={styles.input}>Ghi chú:</Text>
                    <TextInput  style={styles.richTextInput}  multiline={true}
                                onChangeText={(text)=>{setThongTinTraBotGoc({...thongTinTraBotGoc,lyDo:text})}}/>
                    <View style={{alignItems:'center',justifyContent:'center', marginTop:'10%',flexDirection:'row'}}>
                        <TouchableOpacity style={styles.sizeButton}
                                          onPress={() => {dispatch({type:'CLOSE_MODAL_TRABOTGOC'})}}
                        >
                            <Button name={'Hủy'} color={'#1890ff'}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sizeButton}
                                          onPress={() => {
                                              // console.log(thongTinGiaHan.soLanThem);
                                              if (khoaNutGiaHan === false) {
                                                  setKhoaNutGiaHan(true);
                                                  GiaHanHopDong().then(() => {
                                                      dispatch({type: 'CLOSE_MODAL_TRABOTGOC'});
                                                  })
                                              }
                                          }}
                        >
                            <Button name={'Xác nhận'} color={'green'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );

    async function GiaHanHopDong() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/giahanhopdongs?token=' + token, {
                method: 'PUT',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: hopDongDuocChonReducers,
                    soLanThem: thongTinTraBotGoc.soLanThem,
                    lyDo: thongTinTraBotGoc.lyDo
                })
            });
            let responseJson = await response.json();
            if (responseJson.status === 'ok') {
                Alert.alert(responseJson.message);
                navigation.navigate('Đóng lãi');
            } else if (responseJson.status === 'fail') {
                Alert.alert(responseJson.message);
                setKhoaNutGiaHan(false);
            }
        } catch (e) {
            Alert.alert(JSON.stringify(e));
        }
    }
}
const styles = StyleSheet.create({
    wraperContentHopDong:{
        backgroundColor: "#FFFFFF",
        marginHorizontal: width / 12,
        paddingVertical: height / 25,
        paddingHorizontal: width / 30,
        marginVertical: height / 10,
        borderRadius: 10,
        flex: 1
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
    richTextInput: {
        borderWidth: 1,
        height: 80,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF",
        borderRadius: 3
    },
    sizeButton:{
        width:width*0.3,
        height:height/10,
        marginHorizontal:15
    },
    datePickerInput: {
        borderWidth: 1,
        height: 32,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF",
        borderRadius: 3,
        paddingTop: 7,
    }
});
