import React, {useState, useRef} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native';
import {apiLink} from '../../config/constant';
import {useSelector, useDispatch} from 'react-redux';
import switchScreenActions from "../../actions/switchScreenActions";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from "@react-navigation/native";

export default function DangNhapScreen(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [account, setAccount] = useState({username: 'manager1@gmail.com', password: '123456'});
    const [khoaNutLogin, setKhoaNutLogin] = useState(false);
    const ref_input2 = useRef();
    return (
        <ImageBackground source={require('../../assets/logowavesoft.jpg')} style={styles.backgroundstyle}>
            <KeyboardAwareScrollView contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                     enableResetScrollToCoords={false}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Wavesoft FM</Text>
                    <View style={{flexDirection: 'row', paddingBottom: 16}}>
                        {/*<TextInput style={styles.input} placeholder="Username" onChangeText={(text)=> this.setState({username:text})}></TextInput>*/}
                        <TextInput style={styles.input}
                                   placeholder="Username"
                                   onChangeText={(text) => setAccount({
                                       username: text,
                                       password: account.password
                                   })}
                                   keyboardType={'email-address'}
                                   returnKeyType={'next'}
                                   autoFocus={true}
                                   onSubmitEditing={() => ref_input2.current.focus()}
                        ></TextInput>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        {/*<TextInput style={styles.input} secureTextEntry placeholder="Password" onChangeText={(text)=> this.setState({password:text})}></TextInput>*/}
                        <TextInput style={styles.input}
                                   secureTextEntry
                                   placeholder="Password"
                                   keyboardType={'default'}
                                   returnKeyType={'done'}
                                   onChangeText={(text) => setAccount({
                                       username: account.username,
                                       password: text
                                   })}
                                   onSubmitEditing={() => {
                                    XuLyDangNhap();
                                   }}
                                   ref={ref_input2}
                        ></TextInput>

                    </View>
                    <Text>{account.username}</Text>
                    <Text>{account.password}</Text>
                    {/*<Text>{screen}</Text>*/}
                    {/*<TouchableOpacity onPress={async () => {*/}
                    {/*    let b = await AsyncStorage.getItem('token');*/}
                    {/*    await Alert.alert(b);*/}
                    {/*}}>*/}
                    {/*    <Text>Token</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity onPress={async () => {*/}

                    {/*    let b = await AsyncStorage.getItem('role');*/}
                    {/*    await Alert.alert(b);*/}
                    {/*}}>*/}
                    {/*    <Text>Role</Text>*/}
                    {/*</TouchableOpacity>*/}

                    <TouchableOpacity onPress={() => {
                        if (khoaNutLogin == false) {
                            setKhoaNutLogin(true);
                            XuLyDangNhap();
                        }
                    }}>
                        <View style={styles.button}>
                            <Text style={styles.loginName}>Đăng nhập</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 10}} onPress={() => {
                        navigation.navigate('Quên mật khẩu');
                    }}>
                        <Text style={{
                            textDecorationLine: 'underline',
                            color: '#c0c0c0',
                            fontWeight: 'bold',
                            fontSize: 18
                        }}>Quên mật khẩu</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>

        </ImageBackground>
    );

    async function XuLyDangNhap() {
        try {
            let response = await fetch(apiLink + 'auth', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // username:this.state.username,
                    // password:this.state.password
                    username: account.username,
                    password: account.password
                })
            });
            let responseJson = await response.json();
            if (responseJson.status === 'ok') {
                await AsyncStorage.setItem('token', responseJson.token.toString());
                await AsyncStorage.setItem('role', responseJson.role.toString());
                await dispatch(switchScreenActions.admin());

            } else if (responseJson.status === 'fail') {
                Alert.alert(responseJson.message);
                setKhoaNutLogin(false);
            }

        } catch (e) {
            await Alert.alert('Server bị lỗi, ui lòng quay lại sau !');
        }
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        textShadowOffset: {width: 0, height: 0},
        borderRadius: 4,
        alignItems: 'center',
        marginHorizontal: 32,
        backgroundColor: '#0000FF'
    },
    input: {
        borderWidth: 1,
        height: 32,
        width: 200,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF"
    },
    button: {
        borderWidth: 1,
        marginTop: 32,
        borderRadius: 5,
        height: 64,
        width: 200,
        backgroundColor: '#FF0000',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    title: {
        fontWeight: "700",
        fontSize: 25,
        color: "#FFFFFF",
        paddingBottom: 16
    },
    loginName: {
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        color: 'white'
    },
    backgroundstyle: {
        flex: 1
    }
});
