import React, {useState, useEffect} from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    Alert,
    Dimensions
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {apiLink} from '../../config/constant';
import {useSelector, useDispatch} from "react-redux";
import {SearchBar} from 'react-native-elements';
import {ItemHopDong} from "../../component";
import switchScreenReducers from "../../reducers/switchScreenReducers";
import loaiHDDangChonReducers from "../../reducers/loaiHDDangChonReducers";

const {width, height} = Dimensions.get('window');
export default function HopDongChoDuyet() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const refreshReducers = useSelector(state => state.refreshReducers);
    const loaiHDDangChonReducers = useSelector(state => state.loaiHDDangChonReducers);
    const switchScreenReducers = useSelector(state => state.switchScreenReducers);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [searchText, setSearchText] = useState('');

    function _onLongPress(id) {
        Alert.alert("Thông báo xóa", "Bạn có muốn xóa hợp đồng này ?",
            [
                {
                    text: 'Yes', onPress: () => {
                        xoaHopDong(id);
                    }
                },
                {text: 'No', onPress: () => console.log("No"), style: 'cancel'}
            ],
            {cancelable: false});
    }

    useEffect(() => {
        initData();
    }, [refreshReducers]);

    useEffect(() => {
        let timer = setTimeout(()=>{
            if (searchText.length > 0) {
                timKiemDataHopDong(searchText).then((result) => {
                    setData(result);
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                initData();
            }

        },700);
        return () => {
            clearTimeout(timer);
        }
    }, [searchText]);

    return (

        <View style={styles.thongTin}>
            <SearchBar
                placeholder="Tìm kiếm..."
                onChangeText={timKiem}
                value={searchText}
                lightTheme={true}

                inputContainerStyle={{
                    backgroundColor: '#ffffff'
                }}
            />
            <FlatList
                style={{flex: 3}}
                data={data}
                renderItem={({item, index}) => (
                    <TouchableOpacity
                        onLongPress={() => {
                            _onLongPress(item._id);
                        }}
                        onPress={() => {
                            dispatch({type:'SETTHONGTINHOPDONG',id:item._id})
                            dispatch({type:'SET_LOAIHD_DANGCHON',loaiHD:'choduyet'});
                            navigation.navigate('Chi tiết hợp đồng', {id: item._id});
                           // refreshData();
                        }}>
                        <ItemHopDong id={item._id}
                                     hinhAnh={item.hinhAnh}
                                     maHopDong={item.maHopDong}
                                     tenKhachHang={item.tenKhachHang}
                                     ngayVay={item.thongTinHopDong.ngayVay}
                                     trangThaiHopDong={item.trangThaiHopDong}
                            //trangThaiThayDoitrangThaiHopDong={status}
                        />
                    </TouchableOpacity>
                )}
                extraData={data}
                keyExtractor={(item) => `${item._id}`}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={refreshData}
                />}
                onEndReached={addMoreData}
                EndReachedThreshold={0.2}
            />
        </View>
    );

    async function timKiem(search) {
        setSearchText(search);
    }

    function initData() {
        getAllHD(0).then((result) => {
            // dispatch({type:'REFRESH',page:0,newData:result});
            setData(result);
            setPage(0);
        }).catch((err) => {
            console.log(err);
        });
    }

    function refreshData() {
        setRefreshing(true);
        getAllHD(0).then((result) => {
            if (result != data) {
                setData(result);
                setPage(0);
                setRefreshing(false);
            }
            setRefreshing(false);
        }).catch((err) => {
            setRefreshing(false);
        });
    }

    async function addMoreData() {
        let newPage = page + 1;
        await getAllHD(newPage).then((result) => {
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

    async function getAllHD(page) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + switchScreenReducers+'/hopdongs/choduyet/' + page + '?usertype='+switchScreenReducers+'&token=' + token);
            let responseJson = response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
        }
    }

    async function timKiemDataHopDong(ten) {
        //Chưa sửa
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + switchScreenReducers +'/timhopdongs/choduyet?ten=' + ten + '&usertype='+switchScreenReducers+'&token=' + token);
            let responseJson = await response.json();
            return responseJson;
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    }

    async function xoaHopDong(idHopDong) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + switchScreenReducers + '/deletehopdongs?token=' + token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // username:this.state.username,
                    // password:this.state.password
                    id: idHopDong
                })
            });

            let responseJson = await response.json();
            // Alert.alert(JSON.stringify(responseJson));


            if (responseJson.status == 'ok') {
                Alert.alert('Xóa thành công');
                refreshData();
                //setXoaState(true);
            } else {
                Alert.alert('Xóa không thành công !');
            }

        } catch (error) {
            console.log(error)
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    thongTin: {
        flex: 1,
        paddingHorizontal: 5
    },
    leftActions: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#00CC00',
        marginBottom: 2,
        flex: 1
    },
    actionText: {
        fontWeight: '600',
        color: '#FFFFFF',
        padding: 20,
        fontSize: 24

    },
    rightActions: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#FF00FF',
        marginBottom: 2,
        height: height / 7,
        marginRight: 4,
        borderRadius: 3
    },

});

