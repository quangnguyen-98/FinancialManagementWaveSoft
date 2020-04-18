import React, {useState, useEffect, Fragment} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    AsyncStorage,
    Alert,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {apiLink} from "../../config/constant";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Button} from '../../component';
import {formatCurrency, resetMoney} from "../../utils/hamHoTro";
import DateTimePicker from "react-native-modal-datetime-picker";
import {useDispatch, useSelector} from "react-redux";
const {width, height} = Dimensions.get('window');
export default function TatToanScreen({navigation, route}) {
    const dispatch = useDispatch();
    const hopDongDuocChonReducers = useSelector(state => state.hopDongDuocChonReducers);
    const switchScreenReducers = useSelector(state => state.switchScreenReducers);
    const tenKHDuocChonReducers = useSelector(state => state.tenKHDuocChonReducers);
    const [khoaNutTatToan, setKhoaNutTatToan] = useState(false);
    const [lock,setLock] = useState(false);
    const [isVisibleNgayVay, setIsVisibleNgayVay] = useState(false);
    const [tienTatToanKoFormat, setTienTatToanKoFormat] = useState(0);

    const [dataTatToan, setDataTatToan] = useState({
        nguoiDong: tenKHDuocChonReducers,
        ngayTatToan: new Date(),
        tienTatToan:'',
        phiKhac: '',
        ghiChu: ''
    });

    useEffect(() => {
       tinhTienTatToan().then((res)=>{
         //  Alert.alert('fdfds');
       });
    }, [dataTatToan.ngayTatToan]);


    return (
        <View style={styles.thongTin}>
            <KeyboardAwareScrollView style={styles.container}   enableResetScrollToCoords={false}>
                <Fragment>
                    <Text style={styles.text}>Người đóng</Text>
                    <TextInput style={styles.input}
                               value={dataTatToan.nguoiDong}
                               onChangeText={(text) => setDataTatToan({...dataTatToan, nguoiDong: text})}/>
                    <Text style={styles.text}>Ngày đóng</Text>
                    <DateTimePicker isVisible={isVisibleNgayVay}
                                    headerTextIOS={'Chọn ngày đóng lãi'}
                                    confirmTextIOS={'Xác nhận'}
                                    mode={'date'}
                                    date={dataTatToan.ngayTatToan}
                                    onConfirm={(selectedDate) => {
                                        setIsVisibleNgayVay(false);
                                        setDataTatToan({
                                            ...dataTatToan,
                                            ngayTatToan:selectedDate
                                        })
                                    }}
                                    onCancel={() => {
                                        setIsVisibleNgayVay(false);
                                    }}>
                    </DateTimePicker>
                    <TouchableOpacity onPress={()=>setIsVisibleNgayVay(true)}>
                        <Text style={styles.textNgay}>{` ${dataTatToan.ngayTatToan.getDate()}-${(dataTatToan.ngayTatToan.getMonth() + 1)}-${dataTatToan.ngayTatToan.getFullYear()}`}</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>Tiền tất toán</Text>
                    <TextInput style={styles.input} placeholder="Tiền tất toán" editable={false} value={dataTatToan.tienTatToan.toString()}
                               onChangeText={(text) => setDataTatToan({...dataTatToan, tienTatToan: text})}/>
                    <Text style={styles.text}>Phí khác</Text>
                    <TextInput style={styles.input} placeholder="Phí khác" keyboardType={"number-pad"}
                               onChangeText={(text) => setDataTatToan({...dataTatToan, phiKhac: text})}/>
                    <Text style={styles.text}>Ghi chú</Text>
                    <TextInput style={styles.richTextInput} placeholder="Ghi chú" multiline={true}
                               onChangeText={(text) => setDataTatToan({...dataTatToan, ghiChu: text})}/>

                    <TouchableOpacity style={styles.sizeButton} onPress={() => {
                       // Alert.alert('sdfsd')
                        if (dataTatToan.nguoiDong.length == 0) {
                            Alert.alert('Vui lòng nhập tên người đóng !');
                        } else {
                           // Alert.alert(JSON.stringify(dataTatToan.tienTatToan))
                            if(lock){
                                if (!khoaNutTatToan){
                                    setKhoaNutTatToan(true);
                                    tatToan().then((res)=>{
                                        if (res.status === 'ok'){
                                            Alert.alert(res.message, null,
                                                [
                                                    {
                                                        text: 'Ok', onPress: () => {
                                                            navigation.navigate('Quản lý hợp đồng');
                                                            dispatch({type:'REFRESH'})
                                                        }
                                                    }
                                                ]
                                            );
                                        }else if (res.status === 'fail') {
                                            Alert.alert(res.message);
                                        }
                                    }).then(()=>{
                                        setKhoaNutTatToan(false);
                                    })
                                }
                            }else {
                                Alert.alert('Vui lòng chọn ngày tất toán hợp lệ !');
                            }

                        }
                    }}>
                        <Button name={'Xác nhận'} color={'green'}/>
                    </TouchableOpacity>
                </Fragment>
            </KeyboardAwareScrollView>
        </View>
    )

    async function tatToan() {
        console.log(dataTatToan)
        console.log(tienTatToanKoFormat)
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + switchScreenReducers +'/tattoanhopdongs?token=' + token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: hopDongDuocChonReducers,
                    ngayTatToan: dataTatToan.ngayTatToan,
                    tienTatToan:resetMoney(dataTatToan.tienTatToan)
                })
            })
            let responseJson = await response.json();
            return  responseJson;
        } catch (e) {
            await Alert.alert(e.toString());
        }
    }
    async function tinhTienTatToan() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + switchScreenReducers +'/tinhtientattoan?token=' + token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: hopDongDuocChonReducers,
                    ngayTatToan:dataTatToan.ngayTatToan
                })
            })
            let responseJson = await response.json();
            if (responseJson.status === 'ok') {
                setLock(true);
                setDataTatToan({
                    ...dataTatToan,
                    tienTatToan: formatCurrency(responseJson.message)
                });
                setTienTatToanKoFormat(parseInt(responseJson.message));
            } else if (responseJson.status === 'fail') {
                setLock(false);
                setDataTatToan({
                    ...dataTatToan,
                    tienTatToan: 'Ngày tất toán không hợp lệ'
                });
                console.log(responseJson.message)
            }
        } catch (e) {
            await Alert.alert(e.toString());
        }
    }
}

const styles = StyleSheet.create({
    thongTin: {
        flex: 1,
        paddingHorizontal: 5
    },
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: height / 25
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
        backgroundColor: "#FFFFFF"
    },
    text: {
        fontSize: 20
    },
    containerThongTinTongLai: {
        padding: 5,
        height: height / 9,
        flexDirection: 'column',
        marginBottom: 5,
        backgroundColor: '#5cdbd3',

    },
    menuTT: {
        flex: 1,
        justifyContent: 'center',
    },
    textThongTin: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    textNgay:{
        borderWidth: 1,
        height: 32,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF",
        borderRadius: 3,
        paddingTop:7,
    },
    sizeButton:{
        marginTop: 20,
        alignItems: 'center',
        height:height*0.1
    },
    richTextInput: {
        borderWidth: 1,
        height: 80,
        paddingLeft: 5,
        fontWeight: "700",
        backgroundColor: "#FFFFFF",
        borderRadius: 3
    },
});