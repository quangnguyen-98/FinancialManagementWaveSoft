import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard,
    ScrollView,
    AsyncStorage
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {apiLink} from '../config/constant';
import {useSelector, useDispatch} from 'react-redux';
import switchScreenActions from "../actions/switchScreenActions";

function DangNhapScreen(props) {
    const screen = useSelector(state => state.switchScreenReducers);
    const dispatch = useDispatch();
    const [acount, setAccount] = useState({username: 'manager1@gmail.com', password: 'manager'});

    return (
        <ImageBackground source={require('../assets/logowavesoft.jpg')} style={styles.backgroundstyle}>

            <View style={{alignItems: 'center'}}>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.title}>Wavesoft FM</Text>
                        <View style={{flexDirection: 'row', paddingBottom: 16}}>
                            {/*<TextInput style={styles.input} placeholder="Username" onChangeText={(text)=> this.setState({username:text})}></TextInput>*/}
                            <TextInput style={styles.input}
                                       placeholder="Username"
                                       onChangeText={(text) => setAccount({
                                            username: text,
                                            password: acount.password
                                       })}
                                       keyboardType={'email-address'}
                                       returnKeyType={'next'}
                                       autoFocus={true}
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
                                           username: acount.username,
                                           password: text
                                       })}
                            ></TextInput>

                        </View>
                        {/*<Text>{this.state.username}</Text>*/}
                        {/*<Text>{this.state.password}</Text>*/}
                        <Text>{acount.username}</Text>
                        <Text>{acount.password}</Text>
                        <Text>{screen}</Text>
                        <TouchableOpacity onPress={async () => {
                            // setToken().then(async (data)=>{
                            //
                            // })
                            let b = await AsyncStorage.getItem('token');
                            await Alert.alert(b);
                        }}>
                            <Text>Token</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async () => {
                            // setToken().then(async (data)=>{
                            //
                            // })
                            let b = await AsyncStorage.getItem('role');
                            await Alert.alert(b);
                        }}>
                            <Text>Role</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={async ()=>{
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
                                        username: acount.username,
                                        password: acount.password
                                    })
                                })
                                let responseJson = await response.json();
                                if (responseJson.status == 'ok') {
                                    await AsyncStorage.setItem('token', responseJson.token.toString());
                                    await AsyncStorage.setItem('role', responseJson.role.toString());
                                    // let a=  await AsyncStorage.getItem('token');
                                    // Alert.alert(a);
                                    /*await this.props.action('admin');*/
                                    // await props.onChange('admin');
                                    // await dispatch({ type: 'ADMIN' })
                                    await dispatch(switchScreenActions.admin());


                                } else if (responseJson.status == 'fail') {
                                    Alert.alert(responseJson.message);
                                }

                            } catch (e) {
                                await Alert.alert(e.toString());
                            }
                        }}>
                            <View style={styles.button}>
                                <Text style={styles.loginName}>Đăng nhập</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );

}

export default DangNhapScreen;

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
        flex: 1,
        justifyContent: 'center',
    }
});
