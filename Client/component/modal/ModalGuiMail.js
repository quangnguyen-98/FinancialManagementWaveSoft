import React, {useState} from 'react';
import {Alert, AsyncStorage, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Button from "../../component/controlButton/Button";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import {apiLink} from "../../config/constant";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const { width, height } = Dimensions.get('window');
export default function ModalGuiMail(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [khoaNutGuiMail, setKhoaNutGuiMail] = useState(false);
    const hopDongDuocChonReducers = useSelector(state=>state.hopDongDuocChonReducers);
    const [thongTinGuiMail,setThongTinGuiMail] = useState({
        email:'',
        tieuDe:'',
        noiDung:''
    });
    return (
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
            <KeyboardAwareScrollView style={styles.wraperContentHopDong}>
                <Text style={{ alignSelf: 'center', fontSize: 26, fontWeight: '900', color: 'red' }}>Gửi mail</Text>
                <View style={{ flexDirection: 'column', marginTop: 20 }}>
                    <Text style={styles.input}>Email khách:</Text>
                    <TextInput  style={styles.textInput} defaultValue={props.email}
                                onChangeText={(text)=>{setThongTinGuiMail({...thongTinGuiMail,email:text})}}/>
                    <Text style={styles.input}>Tiêu đề:</Text>
                    <TextInput  style={styles.textInput}
                                onChangeText={(text)=>{setThongTinGuiMail({...thongTinGuiMail,tieuDe:text})}}/>
                    <Text style={styles.input}>Nội dung:</Text>
                    <TextInput  style={styles.richTextInput}  multiline={true}
                                onChangeText={(text)=>{setThongTinGuiMail({...thongTinGuiMail,noiDung:text})}}/>
                    <View style={{alignItems:'center',justifyContent:'center', marginTop:'10%',flexDirection:'row'}}>
                        <TouchableOpacity style={styles.sizeButton}
                                          onPress={() => {dispatch({type:'CLOSE_MODAL_GUIMAIL'})}}
                        >
                            <Button name={'Hủy'} color={'#1890ff'}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sizeButton}
                                          onPress={() => {
                                              // console.log(thongTinGiaHan.soLanThem);
                                              if (khoaNutGuiMail === false) {
                                                  setKhoaNutGuiMail(true);
                                                  GuiMailKhachHang().then((message)=>{
                                                      setKhoaNutGuiMail(false);
                                                      Alert.alert(message);
                                                  });
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

    async function GuiMailKhachHang() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'users/guimailkh?token=' + token, {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email:thongTinGuiMail.email,
                    tieuDe: thongTinGuiMail.tieuDe,
                    noiDung: thongTinGuiMail.noiDung
                })
            });
            let responseJson = await response.json();
            if (responseJson.status === 'ok') {
               return responseJson.message;
                setKhoaNutGuiMail(false);
            } else if (responseJson.status === 'fail') {
                return responseJson.message;
                setKhoaNutGuiMail(false);
                Alert.alert(responseJson.message);
            }
        } catch (e) {
            setKhoaNutGuiMail(false);
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
        marginVertical: height / 7,
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
