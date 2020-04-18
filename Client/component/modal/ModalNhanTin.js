import React, {useState} from 'react';
import {Alert, AsyncStorage, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Button from "../../component/controlButton/Button";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import {apiLink} from "../../config/constant";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const { width, height } = Dimensions.get('window');
export default function ModalNhanTin(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [khoaNutGiaHan, setKhoaNutGiaHan] = useState(false);
    const hopDongDuocChonReducers = useSelector(state=>state.hopDongDuocChonReducers);
    const [thongTinGiaHan,setThongTinGiaHan] = useState({
        soLanThem:'',
        lyDo:''
    });
    return (
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
            <KeyboardAwareScrollView style={styles.wraperContentHopDong}>
                <Text style={{ alignSelf: 'center', fontSize: 26, fontWeight: '900', color: 'red' }}>Nhắn tin</Text>
                <View style={{ flexDirection: 'column', marginTop: 20 }}>
                    <Text style={styles.input}>Số điện thoại nhận tin:</Text>
                    <TextInput  style={styles.textInput} keyboardType={"number-pad"} defaultValue={props.sdt}
                                onChangeText={(text)=>{setThongTinGiaHan({...thongTinGiaHan,soLanThem:text})}}/>
                    <Text style={styles.input}>Nội dung:</Text>
                    <TextInput  style={styles.richTextInput}  multiline={true}
                                onChangeText={(text)=>{setThongTinGiaHan({...thongTinGiaHan,lyDo:text})}}/>
                    <View style={{alignItems:'center',justifyContent:'center', marginTop:'10%',flexDirection:'row'}}>
                        <TouchableOpacity style={styles.sizeButton}
                                          onPress={() => {dispatch({type:'CLOSE_MODAL_NHANTIN'})}}
                        >
                            <Button name={'Hủy'} color={'#1890ff'}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sizeButton}
                                          onPress={() => {
                                              // console.log(thongTinGiaHan.soLanThem);
                                              if (khoaNutGiaHan === false) {
                                                  setKhoaNutGiaHan(true);
                                                  GiaHanHopDong().then(() => {
                                                      dispatch({type: 'CLOSE_MODAL_NHANTIN'});
                                                      navigation.navigate('Đóng lãi');
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
                    soLanThem: thongTinGiaHan.soLanThem,
                    lyDo: thongTinGiaHan.lyDo
                })
            });
            let responseJson = await response.json();
            if (responseJson.status === 'ok') {
                Alert.alert(responseJson.message);
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
        marginVertical: height / 5,
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
    }
});
