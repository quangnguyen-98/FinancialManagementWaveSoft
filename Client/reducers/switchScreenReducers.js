import {AsyncStorage } from 'react-native';

const switchScreenReducers =(state='login',action)=>{
    switch (action.type) {
        case 'LOGIN':{
            resetToken().then((data)=>{
                return'login';
            });
            return 'login'
        }
        case 'ADMIN':
            return 'admin';
        case 'MANAGERS':
            return 'managers';
        case 'USERS':
            return 'users';
        default:
            return state
    }
}

async function resetToken(){
    let a = await AsyncStorage.setItem('token','none');
    return a;
}

export default switchScreenReducers;