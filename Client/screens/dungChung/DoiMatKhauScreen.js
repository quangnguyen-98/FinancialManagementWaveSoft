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
import {useSelector,useDispatch} from "react-redux";
import {apiLink} from "../../config/constant";
const {width, height} = Dimensions.get('window');


export default function DoiMatKhauScreen() {
    const dispatch = useDispatch();
    const [stateMatKhau, setStateMatKhau] = useState({
        passwordCu:'',
        password: '',
        password2: ''
    });
    return (
        <KeyboardAwareScrollView
            style={styles.container}   enableResetScrollToCoords={false}

        >
            <Text style={styles.text}>Mật khẩu cũ</Text>
            <TextInput style={styles.input}
                       placeholder="Mật khẩu cũ"
                       onChangeText={(text) => setStateMatKhau({
                           ...stateMatKhau,
                           passwordCu: text

                       })}
                       secureTextEntry
            ></TextInput>
            <Text style={styles.text}>Mật khẩu mới</Text>
            <TextInput style={styles.input}
                       placeholder="Mật khẩu mới"
                       onChangeText={(text) => setStateMatKhau({
                           ...stateMatKhau,
                           password: text

                       })}
                       secureTextEntry
            ></TextInput>
            <Text style={styles.text}>Nhập lại mật khẩu</Text>
            <TextInput style={styles.input}
                       placeholder="Nhập lại mật khẩu"
                       onChangeText={(text) => setStateMatKhau({
                           ...stateMatKhau,
                           password2: text
                       })}
                       secureTextEntry

            ></TextInput>


            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {
                if(stateMatKhau.password.length==0 || stateMatKhau.passwordCu.length==0 || stateMatKhau.password2.length==0){
                    Alert.alert('Vui lòng nhập đủ thông tin !');
                }else {
                    if (stateMatKhau.password == stateMatKhau.password2) {
                        DoiMatKhau();
                    } else {
                        Alert.alert('Mật khẩu không khớp với nhập lại mật khẩu !');
                    }
                }

            }}>
                <View style={styles.buttonXacNhan}>
                    <Text style={styles.textXacNhan}>Xác nhận</Text>
                </View>

            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );
    async function DoiMatKhau() {
        try {
            let token = await AsyncStorage.getItem('token');
            let userName = await AsyncStorage.getItem('userName');
            let response = await fetch(apiLink + 'users/doimk?token=' + token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userName,
                    passwordcu: stateMatKhau.passwordCu,
                    password: stateMatKhau.password
                })
            })
            let responseJson = await response.json();
            if (responseJson.status == 'ok') {
                Alert.alert(responseJson.message);
                dispatch({type:'LOGIN'});
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
        paddingTop: height/7,
        paddingHorizontal:height/25
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


