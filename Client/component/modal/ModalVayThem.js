import React, {useState} from 'react';
import {Alert, AsyncStorage, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Button from "../../component/controlButton/Button";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import {apiLink} from "../../config/constant";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {formatCurrency, resetMoney} from "../../utils/hamHoTro";
const { width, height } = Dimensions.get('window');
export default function ModalVayThem() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [khoaNutVayThem, setKhoaNutVayThem] = useState(false);
    const hopDongDuocChonReducers = useSelector(state=>state.hopDongDuocChonReducers);
    const [hienThiPickerNgayVay, setHienThiPickerNgayVay] = useState(false);
    const [tienHienThi,setTienHienThi] =useState(0);
    const [thongTinVayThem,setThongTinVayThem] = useState({
        ngayVayThem:new Date(),
        tienVayThem:0,
        ghiChu:''
    });
    return (
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
            <KeyboardAwareScrollView style={styles.wraperContentHopDong}>
                <Text style={{ alignSelf: 'center', fontSize: 26, fontWeight: '900', color: 'red' }}>Vay thêm</Text>
                <View style={{ flexDirection: 'column', marginTop: 20 }}>
                    <Text style={styles.input}>Ngày vay thêm:</Text>
                    <DateTimePickerModal isVisible={hienThiPickerNgayVay}
                                         headerTextIOS={'Chọn ngày vay thêm'}
                                         confirmTextIOS={'Xác nhận'}
                                         mode={'date'}
                                         date={new Date(thongTinVayThem.ngayVayThem)}
                                         onConfirm={(selectedDate) => {
                                             setHienThiPickerNgayVay(false);
                                             setThongTinVayThem({
                                                 ...thongTinVayThem,
                                                 ngayVayThem: new Date(selectedDate)
                                             })

                                         }}
                                         onCancel={() => {
                                             setHienThiPickerNgayVay(false);
                                         }}>

                    </DateTimePickerModal>
                    <TouchableOpacity onPress={() => setHienThiPickerNgayVay(true)}>
                        <Text
                            style={styles.datePickerInput}>{` ${thongTinVayThem.ngayVayThem.getDate()}-${(thongTinVayThem.ngayVayThem.getMonth() + 1)}-${thongTinVayThem.ngayVayThem.getFullYear()}`}</Text>
                    </TouchableOpacity>
                    <Text style={styles.input}>Tiền vay thêm:</Text>
                    <TextInput  style={styles.textInput} keyboardType={"number-pad"} maxLength={15} value={tienHienThi.toString()}
                                onChangeText={(text)=>{
                                    text = resetMoney(text);
                                    setThongTinVayThem({...thongTinVayThem,tienVayThem:text})
                                    setTienHienThi(formatCurrency(text))
                                }}/>
                    <Text style={styles.input}>Ghi chú:</Text>
                    <TextInput  style={styles.richTextInput}  multiline={true}
                                onChangeText={(text)=>{setThongTinVayThem({...thongTinVayThem,ghiChu:text})}}/>
                    <View style={{alignItems:'center',justifyContent:'center', marginTop:'10%',flexDirection:'row'}}>
                        <TouchableOpacity style={styles.sizeButton}
                                          onPress={() => {dispatch({type:'CLOSE_MODAL_VAYTHEM'})}}
                        >
                            <Button name={'Hủy'} color={'#1890ff'}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sizeButton}
                                          onPress={() => {
                                              // console.log(thongTinGiaHan.soLanThem);
                                              if (khoaNutVayThem === false) {
                                                  setKhoaNutVayThem(true);
                                                  VayThemHopDong().then((res) => {
                                                      if (res.status === 'ok'){
                                                          Alert.alert('Vay thêm thành công !', null,
                                                              [
                                                                  {
                                                                      text: 'Ok', onPress: () => {
                                                                           navigation.navigate('Đóng lãi');
                                                                           dispatch({type:'CLOSE_MODAL_VAYTHEM'})
                                                                      }
                                                                  }
                                                              ]
                                                          );
                                                      }else if (res.status === 'fail') {
                                                          Alert.alert(res.message);
                                                      }
                                                  }).then(()=>{
                                                      setKhoaNutVayThem(false);
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

    async function VayThemHopDong() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/vaythemhopdongs?token=' + token, {
                method: 'PUT',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: hopDongDuocChonReducers,
                    thongTinVayThem: thongTinVayThem,
                })
            });
            let responseJson = await response.json();
            return responseJson;
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
