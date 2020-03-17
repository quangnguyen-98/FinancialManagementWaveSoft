import React,{useState, useEffect} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Alert,
    TextInput,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from "react-native-datepicker";
import {useSelector, useDispatch} from "react-redux";
import {apiLink} from "../../config/constant";
import switchScreenActions from "../../actions/switchScreenActions";


const {width, height} = Dimensions.get('window');
const toDay = new Date();
function ThemChuChoVayScreen({navigation}) {

    const [infor, setInfor] = useState({
        email: '',
        sdt: '',
        hoTen: '',
        gioiTinh: true,
        ngaySinh: {
            ngay:toDay.getDate(),
            thang:toDay.getMonth(),
            nam:toDay.getFullYear()
        },
        diaChi: '',
        password:'',
        password2:''
    });
    return (

    <KeyboardAwareScrollView
    style={styles.container}
    >
        <Text style={styles.inputTieuDe}>Thông tin tài khoản</Text>

        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.input}
                   placeholder="Email"
                   onChangeText={(text) => setInfor({
                       email: text,
                       sdt: infor.sdt,
                       hoTen: infor.hoTen,
                       gioiTinh: infor.gioiTinh,
                       ngaySinh: infor.ngaySinh,
                       diaChi: infor.diaChi,
                       password:infor.password,
                       password2:infor.password2
                   })}
                   keyboardType={'email-address'}

        ></TextInput>
        <Text style={styles.text}>Số điện thoại</Text>
        <TextInput style={styles.input}
                   placeholder="Số điện thoại"
                   onChangeText={(text) => setInfor({
                       email: infor.email,
                       sdt: text,
                       hoTen: infor.hoTen,
                       gioiTinh: infor.gioiTinh,
                       ngaySinh: infor.ngaySinh,
                       diaChi: infor.diaChi,
                       password:infor.password,
                       password2:infor.password2
                   })}
                   keyboardType={'numeric'}
        ></TextInput>
        <Text style={styles.text}>Mật khẩu</Text>
        <TextInput style={styles.input}
                   placeholder="Mật khẩu"
                   onChangeText={(text) => setInfor({
                       email: infor.email,
                       sdt: infor.sdt,
                       hoTen: infor.hoTen,
                       gioiTinh: infor.gioiTinh,
                       ngaySinh: infor.ngaySinh,
                       diaChi: infor.diaChi,
                       password:text,
                       password2:infor.password2
                   })}
                   secureTextEntry
        ></TextInput>
        <Text style={styles.text}>Nhập lại mật khẩu</Text>
        <TextInput style={styles.input}
                   placeholder="Nhập lại mật khẩu"
                   onChangeText={(text) => setInfor({
                       email: infor.email,
                       sdt: infor.sdt,
                       hoTen: infor.hoTen,
                       gioiTinh: infor.gioiTinh,
                       ngaySinh: infor.ngaySinh,
                       diaChi: infor.diaChi,
                       password:infor.password,
                       password2:text
                   })}
                   secureTextEntry

        ></TextInput>
        <View style={{width:'100%',borderWidth:1,borderColor:'gray',marginVertical:10}}/>

        <Text style={styles.inputTieuDe}>Thông tin cá nhân</Text>
        <Text style={styles.text}>Họ tên</Text>
        <TextInput style={styles.input}
                   placeholder="Họ tên"
                   onChangeText={(text) => setInfor({
                       email: infor.email,
                       sdt: infor.sdt,
                       hoTen: text,
                       gioiTinh: infor.gioiTinh,
                       ngaySinh: infor.ngaySinh,
                       diaChi: infor.diaChi,
                       password:infor.password,
                       password2:infor.password2
                   })}
        ></TextInput>
        <Text style={styles.text}>Giới tính</Text>
        <RadioForm
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#2196f3'}
            animation={true}
            radio_props={[
                {label: 'Đực ', value: 0 },
                {label: 'Cái', value: 1 }
            ]}
            initial={0}
            onPress={(value) => setInfor({
                email: infor.email,
                sdt: infor.sdt,
                hoTen: infor.hoTen,
                gioiTinh: value==0?true:false,
                ngaySinh: infor.ngaySinh,
                diaChi: infor.diaChi,
                password:infor.password,
                password2:infor.password2
            })}
        />
        <Text style={styles.text}>Ngày sinh</Text>
        <DatePicker
            style={{width: '100%'}}
            date={infor.ngaySinh.nam+'/'+(infor.ngaySinh.thang+1)+'/'+infor.ngaySinh.ngay}
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
                let objDate = await new Date(date);
                let ngaySinh ={
                    ngay:objDate.getDate(),
                    thang:objDate.getMonth(),
                    nam:objDate.getFullYear()
                }
                setInfor({
                    email: infor.email,
                    sdt: infor.sdt,
                    hoTen: infor.hoTen,
                    gioiTinh: infor.gioiTinh,
                    ngaySinh: ngaySinh,
                    diaChi: infor.diaChi,
                    password:infor.password,
                    password2:infor.password2
                })
            }}
        />
        <Text style={styles.text}>Địa chỉ</Text>
        <TextInput style={styles.richInput}
                   multiline={true}
                   placeholder="Địa chỉ"
                   onChangeText={(text) => setInfor({
                       email: infor.email,
                       sdt: infor.sdt,
                       hoTen: infor.hoTen,
                       gioiTinh: infor.gioiTinh,
                       ngaySinh: infor.ngaySinh,
                       diaChi: text,
                       password:infor.password,
                       password2:infor.password2
                   })}
        ></TextInput>

        <TouchableOpacity style={{alignItems:'center'}} onPress={()=>{
            if (infor.password == infor.password2){
                ThemChuChoVay();
            }
            else {
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
            let response = await fetch(apiLink + 'admin/managers?token='+token, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: infor.email,
                    sdt: infor.sdt,
                    hoTen: infor.hoTen,
                    gioiTinh: true,
                    ngay:4,
                    thang:5,
                    nam:2017,
                    ngaySinh: infor.ngaySinh,
                    diaChi: infor.diaChi,
                    hinhAnh:'https://i.pinimg.com/236x/19/4d/64/194d64c0df7b4753c5e190edf5fd4be6.jpg',
                    password:'quangdeptrai'
                })
            })
            let responseJson = await response.json();
            if (responseJson.status == 'ok') {
                Alert.alert('Thêm thành công !');
                navigation.goBack();
            } else if (responseJson.status == 'fail') {
                Alert.alert(responseJson.message);
                // navigation.goBack();
            }

        } catch (e) {
            await Alert.alert(e.toString());
        }
    }

}

export default ThemChuChoVayScreen;
{/*<Text>Màn hình thêm chủ cho vay</Text>*/
}
{/*<Button onPress={async () =>{*/
}
{/*    await Alert.alert('Thêm thành công');*/
}
{/*    await navigation.goBack();*/
}
{/*}}*/
}
{/*title="Thêm"/>*/
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10
    },
    inputTieuDe:{
      fontSize:20,
      fontWeight:'bold',
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
    text:{
        fontSize:20
    },
    buttonXacNhan:{
        padding:10,
        borderRadius:5,
        fontWeight:'bold',
        marginTop:'5%',
        marginBottom:'20%',
        backgroundColor:'green'
    },
    textXacNhan:{
        color:'#ffffff',
        fontSize: 30,
    }

});


