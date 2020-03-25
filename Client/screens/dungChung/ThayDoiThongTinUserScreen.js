import React, {useState, useEffect} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Alert,
    TextInput,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector, useDispatch} from "react-redux";
import {apiLink} from "../../config/constant";

const {width, height} = Dimensions.get('window');
const toDay = new Date();
import {useNavigation} from "@react-navigation/native";
import RadioForm from "react-native-simple-radio-button";
import DatePicker from "react-native-datepicker";

export default function ThayDoiThongTinUserScreen({route}) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const thongTinUser = route.params.thongTinUser;
    const [khoaNutThem,setKhoaNutThem ]= useState(false);
    const [trangThaiGioiTinh, setTrangThaiGioiTinh] = useState(thongTinUser.gioiTinh?0:1)
    const [infor, setInfor] = useState({
        hoTen: '',
        gioiTinh: '',
        ngaySinh: '',
        sdt: '',
        diaChi: '',
    });

    useEffect(() => {
        setInfor({
            hoTen: thongTinUser.hoTen,
            gioiTinh: thongTinUser.gioiTinh,
            ngaySinh: new Date(thongTinUser.ngaySinh),
            sdt: thongTinUser.sdt,
            diaChi: thongTinUser.diaChi,
        })
        setTrangThaiGioiTinh(infor.gioiTinh ? 0 : 1);
        dispatch({type:'OPEN_DIALOG'});
    }, [])

    return (
        <KeyboardAwareScrollView
            style={styles.container}
        >
            <Text style={styles.text}>Họ tên</Text>
            <TextInput style={styles.input}
                       value={infor.hoTen}
                       placeholder="Họ tên"
                       onChangeText={(text) => setInfor({
                           ...infor,
                           hoTen: text

                       })}
            ></TextInput>
            <Text style={styles.text}>Giới tính</Text>
            <RadioForm
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#2196f3'}
                // animation={true}
                radio_props={[
                    {label: 'Nam', value: 0},
                    {label: 'Nữ', value: 1}
                ]}
                initial={trangThaiGioiTinh}
                onPress={(value) => setInfor({
                    ...infor,
                    gioiTinh: value == 0 ? true : false

                })}
            />
            <Text style={styles.text}>Ngày sinh</Text>

            <DatePicker
                style={{width: '100%'}}
                date={infor.ngaySinh}
                mode="date"
                placeholder="Chọn ngày"
                format="YYYY-MM-DD"
                confirmBtnText="Xác nhận"
                cancelBtnText="Trở lại"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                }}
                onDateChange={async (date) => {
                    setInfor({
                        ...infor,
                        ngaySinh: new Date(date)

                    })
                }}
            />

            <Text style={styles.text}>Số điện thoại</Text>
            <TextInput style={styles.input}
                       value={infor.sdt}
                       placeholder="Số điện thoại"
                       onChangeText={(text) => setInfor({
                           ...infor,
                           sdt: text

                       })}
            ></TextInput>
            <Text style={styles.text}>Địa chỉ</Text>
            <TextInput style={styles.richInput}
                       value={infor.diaChi}
                       multiline={true}
                       placeholder="Địa chỉ"
                       onChangeText={(text) => setInfor({
                           ...infor,
                           diaChi: text
                       })}
            ></TextInput>


            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {
              if(khoaNutThem == false){
                  setKhoaNutThem(true);
                  DoiMatKhau();
              }

            }}>
                <View style={styles.buttonXacNhan}>
                    <Text style={styles.textXacNhan}>Cập nhật</Text>
                </View>

            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );

    async function DoiMatKhau() {
        try {
            let token = await AsyncStorage.getItem('token');
            // let userName = await AsyncStorage.getItem('userName');
            let response = await fetch(apiLink + 'users?token=' + token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // username: userName,
                    hoTen: infor.hoTen,
                    gioiTinh: infor.gioiTinh,
                    ngaySinh: infor.ngaySinh,
                    diaChi: infor.diaChi,
                    sdt: infor.sdt,
                })
            })
            let responseJson = await response.json();
            if (responseJson.status == 'ok') {
                Alert.alert(responseJson.message);
                navigation.goBack();
                dispatch({type:'CLOSE_DIALOG'});
                // dispatch({type: 'LOGIN'});
            } else if (responseJson.status == 'fail') {
                Alert.alert(responseJson.message);
                // navigation.goBack();
            }

        } catch (e) {
            await Alert.alert(e.toString());
        }
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: height / 20,
        paddingHorizontal: height / 30
    },
    inputTieuDe: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#356bed'
    },
    input: {
        borderWidth: 1,
        height: 32,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF"
    },
    richInput: {
        borderWidth: 1,
        height: 100,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF"
    },
    text: {
        fontSize: 20
    },
    buttonXacNhan: {
        padding: 10,
        borderRadius: 5,
        fontWeight: 'bold',
        marginTop: '5%',
        marginBottom: '20%',
        backgroundColor: 'green'
    },
    textXacNhan: {
        color: '#ffffff',
        fontSize: 30,
    }

});


