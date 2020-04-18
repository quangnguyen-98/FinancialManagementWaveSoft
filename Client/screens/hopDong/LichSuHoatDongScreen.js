import React, {Fragment, useEffect, useState} from 'react';
import {
    AsyncStorage,
    Dimensions,
    FlatList,
    Modal,
    RefreshControl,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {apiLink} from '../../config/constant';
import {useDispatch, useSelector} from "react-redux";
import {ItemLichSu} from "../../component";
import ModalThongTinNguoiThucHien from "../../component/modal/ModalThongTinNguoiThucHien";

const {width, height} = Dimensions.get('window');
export default function LichSuHoatDongScreen(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const hopDongDuocChonReducers = useSelector(state => state.hopDongDuocChonReducers);
    const switchScreenReducers = useSelector(state => state.switchScreenReducers);
    const openModalReducers = useSelector(state => state.openModalReducers);
    const refreshReducers = useSelector(state => state.refreshReducers);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [nguoiThucHien, setNguoiThucHien] = useState({
        hoTen: '',
        email: '',
        sdt: ''
    });

    useEffect(() => {
        setData([]);
        // if(!refreshReducers) return;
        initData();
        dispatch({type: 'RESET_REFRESH'});
    }, [refreshReducers]);

    return (
        <View style={styles.thongTin}>

            <FlatList
                style={{flex: 3}}
                data={data}
                renderItem={({item, index}) =>
                    <Fragment>
                        {
                        item.type === 0 && (     //Đóng lãi
                            <TouchableOpacity key={item._id}
                                onPress={() => {
                                    getNguoiThucHien(item.idNguoiThucHien).then(() => {
                                        dispatch({type: 'OPEN_MODAL_TT_NGUOITHUCHIEN'})
                                    });
                                }}>
                                <ItemLichSu
                                    ngayThucHien={item.ngayThucHien}
                                    ngayTraLai={item.ngayTraLai}
                                    nguoiDong={item.nguoiDong}
                                    ngayDong={item.ngayDong}
                                    phiKhac={item.phiKhac}
                                    ghiChu={item.ghiChu}
                                    type={item.type}
                                />
                            </TouchableOpacity>
                        )}
                        {item.type === 1 && (    //Xóa phiếu thu
                            <TouchableOpacity key={item._id}
                                onPress={() => {
                                    getNguoiThucHien(item.idNguoiThucHien).then(() => {
                                        dispatch({type: 'OPEN_MODAL_TT_NGUOITHUCHIEN'})
                                    })
                                }}>
                                <ItemLichSu
                                    ngayThucHien={item.ngayThucHien}
                                    ngayTraLai={item.ngayTraLai}
                                    nguoiDong={item.nguoiDong}
                                    ngayDong={item.ngayDong}
                                    phiKhac={item.phiKhac}
                                    ghiChu={item.ghiChu}
                                    type={item.type}
                                />
                            </TouchableOpacity>
                        )
                        }
                        {item.type === 2 && (     //Gia hạn
                            <TouchableOpacity key={item._id}
                                              onPress={() => {
                                                  getNguoiThucHien(item.idNguoiThucHien).then(() => {
                                                      dispatch({type: 'OPEN_MODAL_TT_NGUOITHUCHIEN'})
                                                  })
                                              }}>
                                <ItemLichSu
                                    ngayThucHien={item.ngayThucHien}
                                    soKyGiaHan={item.soKyGiaHan}
                                    lyDo={item.lyDo}
                                    type={item.type}
                                />
                            </TouchableOpacity>
                        )
                        }
                        {item.type === 4 && (     //Vay thêm
                            <TouchableOpacity key={item._id}
                                              onPress={() => {
                                                  getNguoiThucHien(item.idNguoiThucHien).then(() => {
                                                      dispatch({type: 'OPEN_MODAL_TT_NGUOITHUCHIEN'})
                                                  })
                                              }}>
                                <ItemLichSu
                                    ngayThucHien={item.ngayThucHien}
                                    ngayVayThem={item.ngayVayThem}
                                    tienVayThem={item.tienVayThem}
                                    ghiChu={item.ghiChu}
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
                onEndReached={addMoreData}
                EndReachedThreshold={0.2}
            />
            <Modal visible={openModalReducers.modalTTNguoiThucHien} transparent={true}>
                <ModalThongTinNguoiThucHien hoTen={nguoiThucHien.hoTen} email={nguoiThucHien.email}
                                            sdt={nguoiThucHien.sdt}/>
            </Modal>
        </View>
    );

    function initData() {
        setRefreshing(true);
        getAllLichSu(hopDongDuocChonReducers, 0).then((result) => {
            setData(result);
            setPage(0);
            setRefreshing(false);

        }).catch((err) => {
            setRefreshing(false);
            console.log(err);
        });
    }

    async function addMoreData() {
        let newPage = page + 1;
        await getAllLichSu(hopDongDuocChonReducers, newPage).then((result) => {
            if (result.length > 0) {
                setData([
                    ...data, ...result
                ]);
                setPage(page + 1);
            }
        }).catch((err) => {
            setRefreshing(false);
        });
    }


    async function getAllLichSu(id, page) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + switchScreenReducers +'/lichsus/' + page + '?idHopDong=' + id + '&token=' + token);
            let responseJson = response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
        }
    }

    async function getNguoiThucHien(id) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + switchScreenReducers +'/nguoitaohopdongs?id=' + id + '&token=' + token);
            let responseJson = await response.json();
            setNguoiThucHien({
                hoTen: responseJson.hoTen,
                email: responseJson.email,
                sdt: responseJson.sdt
            })
        } catch (e) {
            console.log(JSON.stringify(e));
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
    leftMenu: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightMenu: {
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

