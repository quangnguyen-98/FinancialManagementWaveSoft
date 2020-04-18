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
import RadioForm from 'react-native-simple-radio-button';
import {apiLink} from "../../config/constant";
import {useSelector,useDispatch} from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function ThemChuChoVayScreen({navigation}) {
    const dispatch = useDispatch();
    const [khoaNutThem,setKhoaNutThem ]= useState(false);
    const [hienThiPickerNgaySinh, setHienThiPickerNgaySinh] = useState(false);
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
            style={styles.container}   enableResetScrollToCoords={false}
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
                radio_props={[
                    {label: 'Nam', value: 0},
                    {label: 'Nữ', value: 1}
                ]}
                initial={0}
                onPress={(value) => setInfor({
                    ...infor,
                    gioiTinh: value == 0 ? true : false

                })}
            />
            <Text style={styles.text}>Ngày sinh</Text>

            <DateTimePickerModal isVisible={hienThiPickerNgaySinh}
                                 headerTextIOS={'Chọn ngày sinh'}
                                 confirmTextIOS={'Xác nhận'}
                                 mode={'date'}
                                 date={new Date(infor.ngaySinh)}
                                 onConfirm={(selectedDate) => {
                                     setHienThiPickerNgaySinh(false);
                                     setInfor({
                                         ...infor,
                                         ngaySinh: new Date(selectedDate)
                                     })

                                 }}
                                 onCancel={() => {
                                     setHienThiPickerNgaySinh(false);
                                 }}>

            </DateTimePickerModal>
            <TouchableOpacity
                onPress={()=> setHienThiPickerNgaySinh(true)}
            >
                <TextInput placeholder="Chọn ngày vay"
                           value={` ${infor.ngaySinh.getDate()}-${(infor.ngaySinh.getMonth() + 1)}-${infor.ngaySinh.getFullYear()}`}
                           editable={false} style={styles.textInput}
                           onTouchStart={() => {
                               setHienThiPickerNgaySinh(true);
                           }}></TextInput>
            </TouchableOpacity>

            <Text style={styles.text}>Địa chỉ</Text>
            <TextInput style={styles.richInput}
                       multiline={true}
                       placeholder="Địa chỉ"
                       onChangeText={(text) => setInfor({
                           ...infor,
                           diaChi: text
                       })}
            ></TextInput>

            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {
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
                <View style={styles.buttonXacNhan}>
                    <Text style={styles.textXacNhan}>Xác nhận</Text>
                </View>

            </TouchableOpacity>
        </KeyboardAwareScrollView>


    );
    async function ThemChuChoVay() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'admin/managers?token=' + token, {
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
                // navigation.navigate('Quản lý chủ cho vay');
                navigation.navigate('Quản lý chủ cho vay');
                dispatch({type:'CLOSE_DIALOG'});

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
        backgroundColor: "#FFFFFF",
        borderRadius: 3
    },
    richInput: {
        borderWidth: 1,
        height: 100,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF",
        borderRadius: 3
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
    },
    textInput: {
        borderWidth: 1,
        height: 32,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF",
        borderRadius: 3
    },

});


