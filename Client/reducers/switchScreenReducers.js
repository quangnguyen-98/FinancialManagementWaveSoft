import {AsyncStorage } from 'react-native';
// Lưu tên các màn hình phục vụ cho việc login logout
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
    let b = await AsyncStorage.setItem('role','none');
    return a;
}

export default switchScreenReducers;