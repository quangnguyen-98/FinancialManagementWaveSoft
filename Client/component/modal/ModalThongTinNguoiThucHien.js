import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Button from "../../component/controlButton/Button";
import {useDispatch} from "react-redux";
import call from 'react-native-phone-call';
const {width, height} = Dimensions.get('window');
export default function ModalThongTinNguoiThucHien(props) {
    const dispatch = useDispatch();
    const args = {
        number: props.sdt,
        prompt: true
    }
    return (
        <View style={{backgroundColor: "#000000aa", flex: 1}}>
            <View style={styles.wraperContentHopDong}>
                <Text style={{alignSelf: 'center', fontSize: 26, fontWeight: '900', color: 'red'}}>Người thực hiện</Text>
                <View style={{flexDirection: 'column', marginTop: 20}}>
                    <Text style={styles.input}>Họ tên:</Text>
                    <Text style={{fontSize: 16, fontWeight: "bold"}} selectable>{props.hoTen}</Text>
                    <Text style={styles.input}>Email:</Text>
                    <Text style={{fontSize: 16, fontWeight: "bold", marginTop: 8}} selectable>{props.email}</Text>
                    <Text style={styles.input}>Số điện thoại: </Text>
                    <Text style={{fontSize: 16, fontWeight: "bold", marginTop: 8}} selectable onPress={()=>{call(args).catch(console.error)}}>{props.sdt}</Text>
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity
                            style={{marginTop: '10%', height: height*0.1, width: width * 0.6}}
                            onPress={() => {dispatch({type: 'CLOSE_MODAL_NGUOITAO_HD'})}}
                        >
                            <Button name={'Đóng'} color={'#1890ff'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    wraperContentHopDong:{
        backgroundColor: "#FFFFFF",
        marginHorizontal: width / 12,
        paddingVertical: height / 25,
        paddingHorizontal: width / 30,
        marginVertical: height / 5,
        borderRadius: 10,
        flex: 1
    },
    input: {
        fontSize: 16,
        paddingTop: 8
    }
});
