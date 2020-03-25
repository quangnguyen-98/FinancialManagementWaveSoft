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
import {useNavigation} from "@react-navigation/native";
import {apiLink} from "../../config/constant";
const {width, height} = Dimensions.get('window');
const toDay = new Date();

export default function QuenMatKhauScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [khoaNutXacNhan,setKhoaNutXacNhan ]= useState(false);
    return (
        <KeyboardAwareScrollView
            style={styles.container}

        >
            <Text style={styles.text}>Vui lòng nhập email của bạn</Text>
            <TextInput style={styles.input}
                       placeholder="Nhập email"
                       onChangeText={(text) => setEmail(text)}

            ></TextInput>

            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {
                if(email ==''){
                    Alert.alert('Vui lòng nhập email !');
                }else {
                    if(khoaNutXacNhan == false){
                        setKhoaNutXacNhan(true);
                        QuenMatKhau();
                    }
                }

            }}>
                <View style={styles.buttonXacNhan}>
                    <Text style={styles.textXacNhan}>Xác nhận</Text>
                </View>

            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );
    async function QuenMatKhau() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'users/quenmk', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                })
            })
            let responseJson = await response.json();
            if (responseJson.status == 'ok') {
                Alert.alert(responseJson.message);
                navigation.goBack();
                // dispatch({type:'LOGIN'});
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


