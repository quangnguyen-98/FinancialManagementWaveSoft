import React, {useState, useEffect, Fragment} from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Text,
    RefreshControl
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {apiLink} from '../../config/constant';
import {useSelector, useDispatch} from "react-redux";
import {ItemDongLai, Button} from "../../component";
import {formatCurrency} from "../../utils/hamHoTro";

const {width, height} = Dimensions.get('window');
export default function DongLaiScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const hopDongDuocChonReducers = useSelector(state => state.hopDongDuocChonReducers);
    const loaiHDDangChonReducers = useSelector(state => state. loaiHDDangChonReducers);
    const switchScreenReducers = useSelector(state => state.switchScreenReducers);
    const refreshReducers = useSelector(state => state.refreshReducers);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [tongTienGoc, setTongTienGoc] = useState('');
    const [tongTienLai, setTongTienLai] = useState('');
    const [tienLaiConThieu, setTienLaiConThieu] = useState('');

    useEffect(() => {
        setData([]);
        // if(!refreshReducers) return;
        initData();
        dispatch({type: 'RESET_REFRESH'});

    }, [refreshReducers]);

    useEffect(() => {
        if (data.length < 1) return;
        let countTongTienLai = 0;
        let countTienLaiConThieu = 0;
        data.forEach((item) => {
            if (item.type === 0 || item.type === 1) {
                if(item.type===0){countTienLaiConThieu+=item.tienLai}
                countTongTienLai = countTongTienLai + item.tienLai
            }
            if (item.type === 3) {
                setTongTienGoc(formatCurrency(item.tienGoc.toString()));
            }
        });
        setTongTienLai(formatCurrency(countTongTienLai.toString()));
        setTienLaiConThieu(formatCurrency(countTienLaiConThieu.toString()));
    }, [data])

    return (
        <View style={styles.thongTin}>
            <View style={styles.containerThongTinTongLai}>
                <View style={styles.menuTT}>
                    <Text style={styles.textThongTin}>Tổng tiền gốc: {tongTienGoc}</Text>
                </View>
                <View style={styles.menuTT}>
                    <Text style={styles.textThongTin}>Tổng tiền lãi: {tongTienLai}</Text>
                </View>
                <View style={styles.menuTT}>
                    <Text style={styles.textThongTin}>Tiền lãi còn thiếu: {tienLaiConThieu}</Text>
                </View>

            </View>
            <View style={styles.containerThongTin}>
                <View style={styles.menu}>
                    <Text style={{fontSize: 18, fontWeight: 'bold',}}>Ngày trả lãi: </Text>
                </View>
                <View style={styles.menu}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Tiền lãi: </Text>
                </View>
                <View style={styles.menu}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Tiền gốc: </Text>
                </View>


            </View>

            <FlatList
                style={{flex: 3}}
                data={data}
                renderItem={({item, index}) =>
                    <Fragment>
                        {
                            item.type !== 3 && (
                                <TouchableOpacity
                                    onPress={() => {
                                        if(loaiHDDangChonReducers==='dangvay'){
                                            navigation.navigate('Phiếu Thu', {
                                                idPT: item._id,
                                                ngayTraLai: item.ngayTraLai,
                                                tienLai: item.tienLai,
                                                tienGoc: item.tienGoc,
                                                type: item.type
                                            });
                                        }
                                    }}>
                                    <ItemDongLai
                                        ngayTraLai={item.ngayTraLai}
                                        tienLai={item.tienLai}
                                        tienGoc={item.tienGoc}
                                        type={item.type}
                                    />
                                </TouchableOpacity>
                            )}
                        {item.type === 3 && (
                            <TouchableOpacity
                                onPress={() => {
                                    if(loaiHDDangChonReducers==='dangvay') {
                                        navigation.navigate('Tất toán', {
                                            idPT: item._id,
                                            ngayTraLai: item.ngayTraLai,
                                            tienLai: item.tienLai,
                                            tienGoc: item.tienGoc,
                                            type: item.type
                                        });
                                    }
                                }}>
                                <ItemDongLai
                                    ngayTraLai={item.ngayTraLai}
                                    tienLai={item.tienLai}
                                    tienGoc={item.tienGoc}
                                    type={item.type}
                                />
                            </TouchableOpacity>
                        )
                        }
                    </Fragment>
                }
                extraData={data}
                keyExtractor={(item) => `${item._id}`}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={initData}
                />}
            />
        </View>
    );

    function initData() {
        setRefreshing(true);
        getAllCTHD(hopDongDuocChonReducers).then((result) => {
            setRefreshing(false);
            setData(result);
        }).catch((err) => {
            setRefreshing(false);
            console.log(err);
        });
    }


    async function getAllCTHD(id) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + switchScreenReducers+'/chitiethopdongs?id=' + id + '&token=' + token);
            let responseJson = response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
        }
    }

}

const styles = StyleSheet.create({
    thongTin: {
        flex: 1,
        paddingHorizontal: 5
    },
    containerThongTinTongLai: {
        padding: 5,
        height: height / 9,
        flexDirection: 'column',
        marginBottom: 5,
        backgroundColor: '#5cdbd3',

    },
    containerThongTin: {
        padding: 5,
        height: height / 16,
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: 'white',
    },
    menuTT: {
        flex: 1,
        justifyContent: 'center',
    },
    menu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textThongTin: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
});

