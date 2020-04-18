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
import {formatCurrency} from "../../utils/hamHoTro";
import DateTimePicker from "react-native-modal-datetime-picker";
import {useDispatch, useSelector} from "react-redux";
const {width, height} = Dimensions.get('window');
export default function ChiTietLichSuScreen({navigation, route}) {
    const dispatch = useDispatch();
    const tenKHDuocChonReducers = useSelector(state => state.tenKHDuocChonReducers);
    const hopDongDuocChonReducers = useSelector(state => state.hopDongDuocChonReducers);
    const [isVisibleNgayVay, setIsVisibleNgayVay] = useState(false);
    const [dataCTHD, setDataCTHD] = useState({});
    const [dataPhieuThu, setDataPhieuThu] = useState({
        nguoiDong: '',
        ngayDong: new Date(),
        phiKhac: '',
        ghiChu: ''
    });

    // useEffect(() => {
    //     initData();
    //     setDataPhieuThu({
    //         ...dataPhieuThu,
    //         nguoiDong:tenKHDuocChonReducers
    //     })
    // }, []);

    return (
        <View style={styles.thongTin}>
            <View style={styles.containerThongTinTongLai}>
                <View style={styles.menuTT}>
                    <Text style={styles.textThongTin}>dfgdg</Text>
                </View>
                <View style={styles.menuTT}>
                    <Text style={styles.textThongTin}>fdgdf</Text>
                </View>
            </View>
            <KeyboardAwareScrollView style={styles.container}   enableResetScrollToCoords={false}>
                {
                    dataCTHD.type === 0 &&(
                        <Fragment>
                            <Text style={styles.text}>Người đóng</Text>
                            <TextInput style={styles.input} placeholder="Người đóng"
                                       onChangeText={(text) => setDataPhieuThu({...dataPhieuThu, nguoiDong: text})}/>
                            <Text style={styles.text}>Ngày đóng</Text>
                            <DateTimePicker isVisible={isVisibleNgayVay}
                                            headerTextIOS={'Chọn ngày đóng lãi'}
                                            confirmTextIOS={'Xác nhận'}
                                            mode={'date'}
                                            date={dataPhieuThu.ngayDong}
                                            onConfirm={(selectedDate) => {
                                                setIsVisibleNgayVay(false);
                                                setDataPhieuThu({
                                                    ...dataPhieuThu,
                                                    ngayDong:selectedDate
                                                })
                                            }}
                                            onCancel={() => {
                                                setIsVisibleNgayVay(false);
                                            }}>
                            </DateTimePicker>
                            <TouchableOpacity onPress={()=>setIsVisibleNgayVay(true)}>
                                <Text style={styles.textNgay}>{` ${dataPhieuThu.ngayDong.getDate()}-${(dataPhieuThu.ngayDong.getMonth() + 1)}-${dataPhieuThu.ngayDong.getFullYear()}`}</Text>
                            </TouchableOpacity>
                            <Text style={styles.text}>Phí khác</Text>
                            <TextInput style={styles.input} placeholder="Phí khác"
                                       onChangeText={(text) => setDataPhieuThu({...dataPhieuThu, phiKhac: text})}/>
                            <Text style={styles.text}>Ghi Chú</Text>
                            <TextInput style={styles.input} placeholder="Ghi chú"
                                       onChangeText={(text) => setDataPhieuThu({...dataPhieuThu, ghiChu: text})}/>

                            <TouchableOpacity style={styles.sizeButton} onPress={() => {
                                if (dataPhieuThu.nguoiDong.length == 0) {
                                    Alert.alert('Vui lòng nhập tên người đóng !');
                                } else {
                                    dongLai().then(()=>{
                                        dispatch({type:'REFRESH'});
                                        navigation.goBack();
                                    });
                                }
                            }}>
                                <Button name={'Xác nhận'} color={'green'}/>
                            </TouchableOpacity>
                        </Fragment>
                    )
                }
                {
                    dataCTHD.type === 1 &&(
                        <Fragment>
                            <Text style={styles.text}>Người đóng</Text>
                            <TextInput style={styles.input}editable={false} value={dataCTHD.phieuThu.nguoiDong}/>
                            <Text style={styles.text}>Ngày đóng</Text>
                            <Text style={styles.textNgay}>{` ${dataPhieuThu.ngayDong.getDate()}-${(dataPhieuThu.ngayDong.getMonth() + 1)}-${dataPhieuThu.ngayDong.getFullYear()}`}</Text>
                            <Text style={styles.text}>Phí khác</Text>
                            <TextInput style={styles.input}   editable={false} value={dataCTHD.phieuThu.phiKhac}/>
                            <Text style={styles.text}>Ghi Chú</Text>
                            <TextInput style={styles.input} editable={false} value={dataCTHD.phieuThu.ghiChu}/>
                            <TouchableOpacity style={styles.sizeButton} onPress={() => {
                                if (dataPhieuThu.nguoiDong.length == 0) {
                                    Alert.alert('Vui lòng nhập tên người đóng !');
                                } else {
                                    xoaPhieuThu().then(()=>{
                                        dispatch({type:'REFRESH'});
                                        navigation.goBack();
                                    })
                                }
                            }}>
                                <Button name={'Xóa phiếu thu'} color={'#f5222d'}/>
                            </TouchableOpacity>
                        </Fragment>
                    )
                }
            </KeyboardAwareScrollView>
        </View>
    )

    function initData() {
        getCTHD('idPT').then((result) => {
            setDataCTHD(result);
        }).catch((e) => {
            console.log(JSON.stringify(e));
        });
    }

    async function getCTHD(id) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/chitiethopdongs/' + id + '?token=' + token);
            let responseJson = response.json();
            return responseJson;
        } catch (e) {
            console.log(e);
        }
    }

    async function dongLai() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/donglai?token=' + token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: idPT,
                    dataPhieuThu: dataPhieuThu,
                    idHopDong:hopDongDuocChonReducers
                })
            })
            let responseJson = await response.json();
            if (responseJson.status === 'ok') {
                Alert.alert(responseJson.message);
            } else if (responseJson.status === 'fail') {
                Alert.alert(responseJson.message);
            }
        } catch (e) {
            await Alert.alert(e.toString());
        }
    }
    async function xoaPhieuThu() {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/xoaphieuthu?token=' + token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: idPT,
                })
            })
            let responseJson = await response.json();
            if (responseJson.status === 'ok') {
                Alert.alert(responseJson.message);
            } else if (responseJson.status === 'fail') {
                Alert.alert(responseJson.message);
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
    }
});