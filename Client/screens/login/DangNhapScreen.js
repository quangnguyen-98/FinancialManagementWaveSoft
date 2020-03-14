import React from 'react';
import {StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert,ScrollView} from 'react-native';
import axios from 'axios';
export default class DangNhapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'admin1@gmail.com',
            password: 'admin'
        }
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/logowavesoft.jpg')} style={styles.backgroundstyle}>
                <View style={{alignItems:'center'}}>
                    <ScrollView>
                        <View style={styles.container}>
                            <Text style={styles.title}>Wavesoft FM</Text>
                            <View style={{flexDirection: 'row', paddingBottom: 16}}>
                                <TextInput style={styles.input} placeholder="Username" onChangeText={(text)=> this.setState({username:text})}></TextInput>
                            </View>

                            <View style={{flexDirection: 'row'}}>
                                <TextInput style={styles.input} secureTextEntry placeholder="Password" onChangeText={(text)=> this.setState({password:text})}></TextInput>

                            </View>
                            <Text>{this.state.username}</Text>
                            <Text>{this.state.password}</Text>
                            <TouchableOpacity onPress={async ()=>{
                                try{
                                    let response = await fetch('http://172.16.1.98:3000/api/v1/auth',{
                                        method:'POST',
                                        headers:{
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                        },
                                        body:JSON.stringify({
                                            username:this.state.username,
                                            password:this.state.password
                                        })
                                    })
                                    let responseJson = await response.json();
                                    if(responseJson.status == 'ok'){
                                        this.props.action('admin');
                                    }else if(responseJson.status == 'fail'){
                                        Alert.alert(responseJson.message);
                                    }

                                }catch (e) {
                                    await Alert.alert(e.toString());
                                }
                            }}>
                                <View style={styles.button} >
                                    <Text style={styles.loginName}>Đăng nhập</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </View>


            </ImageBackground>
        );
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
        flex: 1,
        justifyContent: 'center',
    }
});
