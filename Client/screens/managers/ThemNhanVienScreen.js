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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from "react-native-datepicker";
import {apiLink} from "../../config/constant";
import {useSelector,useDispatch} from "react-redux";
const {width, height} = Dimensions.get('window');

export default function ThemNhanVienScreen({navigation}) {
    const trangThaiDialog = useSelector(state => state.diaglogKhoaUserReducers);
    const dispatch = useDispatch();
    const [khoaNutThem,setKhoaNutThem ]= useState(false);
    const [infor, setInfor] = useState({
        email: '',
        sdt: '',
        hoTen: '',
        gioiTinh: true,
        ngaySinh: new Date(),
        diaChi: '',
        password: '',
        password2: ''
    });
    useEffect(()=>{
        dispatch({type:'OPEN_DIALOG'});
    },[]);
    return (
        <KeyboardAwareScrollView
            style={styles.container}
        >
            <Text style={styles.inputTieuDe}>Thông tin tài khoản</Text>

            <Text style={styles.text}>Email</Text>
            <TextInput style={styles.input}
                       placeholder="Email"
                       onChangeText={(text) => setInfor({
                           ...infor,
                           email: text
                       })}
                       keyboardType={'email-address'}

            ></TextInput>
            <Text style={styles.text}>Số điện thoại</Text>
            <TextInput style={styles.input}
                       placeholder="Số điện thoại"
                       onChangeText={(text) => setInfor({
                           ...infor,
                           sdt: text
                       })}
                       keyboardType={'numeric'}
            ></TextInput>
            <Text style={styles.text}>Mật khẩu</Text>
            <TextInput style={styles.input}
                       placeholder="Mật khẩu"
                       onChangeText={(text) => setInfor({
                           ...infor,
                           password: text

                       })}
                       secureTextEntry
            ></TextInput>
            <Text style={styles.text}>Nhập lại mật khẩu</Text>
            <TextInput style={styles.input}
                       placeholder="Nhập lại mật khẩu"
                       onChangeText={(text) => setInfor({
                           ...infor,
                           password2: text
                       })}
                       secureTextEntry

            ></TextInput>
            <View style={{width: '100%', borderWidth: 1, borderColor: 'gray', marginVertical: 10}}/>

            <Text style={styles.inputTieuDe}>Thông tin cá nhân</Text>
            <Text style={styles.text}>Họ tên</Text>
            <TextInput style={styles.input}
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
                animation={true}
                radio_props={[
                    {label: 'Đực ', value: 0},
                    {label: 'Cái', value: 1}
                ]}
                initial={0}
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
                onDateChange={(date) => {

                    setInfor({
                        ...infor,
                        ngaySinh: date

                    })
                }}
            />

            <Text style={styles.text}>Địa chỉ</Text>
            <TextInput style={styles.richInput}
                       multiline={true}
                       placeholder="Địa chỉ"
                       onChangeText={(text) => setInfor({
                           ...infor,
                           diaChi: text
                       })}
            ></TextInput>

            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={styles.buttonXacNhan} onPress={() => {
                    // Alert.alert(JSON.stringify(infor));
                    if (infor.password == infor.password2) {
                                if(khoaNutThem == false){
                                    setKhoaNutThem(true);
                                    ThemChuChoVay();
                                }

                    } else {
                        Alert.alert('Mật khẩu không khớp với nhập lại mật khẩu !');
                    }
                }}>
                    <Text style={styles.textXacNhan}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
    async function ThemChuChoVay() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/users?token=' + token, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: infor.email,
                    sdt: infor.sdt,
                    hoTen: infor.hoTen,
                    gioiTinh: infor.gioiTinh,
                    ngaySinh: new Date(infor.ngaySinh),
                    diaChi: infor.diaChi,
                    hinhAnh: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/768px-User_font_awesome.svg.png',
                    password: infor.password
                })
            })
            let responseJson = await response.json();
            if (responseJson.status == 'ok') {
                Alert.alert('Thêm thành công !');
                navigation.navigate('Quản lý nhân viên');
                dispatch({type:'CLOSE_DIALOG'});

            } else if (responseJson.status == 'fail') {
                Alert.alert(responseJson.message);
                // navigation.goBack();
            }

        } catch (e) {
           console.log(e);
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
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
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height / 40,
        borderRadius: 5,
        height: height / 10,
        width: width / 2,
        marginBottom: height / 10,
        backgroundColor: 'green'
    },
    textXacNhan: {
        color: '#ffffff',
        fontSize: 30,
    }

});


