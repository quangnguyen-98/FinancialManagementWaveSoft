import React, {useState, useEffect} from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    Animated,
    Alert,
    Dimensions
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {apiLink} from '../../config/constant';
import {useSelector, useDispatch} from "react-redux";
import {SearchBar} from 'react-native-elements';
import {ItemHopDong} from "../../component/";
import Swipeable from "react-native-gesture-handler/Swipeable";
const {width,height} = Dimensions.get('window');
export default function QuanLyHopDongScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const trangThaiDialog = useSelector(state => state.diaglogKhoaUserReducers);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [searchText, setSearchText] = useState('');
    // const [refresh,setRefresh] = useState(route.params?.refresh);
    const RightActions = ({ progress, dragX, onPress }) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.rightActions}>
                    <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>Xóa</Animated.Text>
                </View>
            </TouchableOpacity>

        )
    }

    const onSwipeFromLeft = () => {
        Alert.alert("Hello Huy");
    }

    const onRightPress = () => {
        Alert.alert("Hello Quang");
    }


    useEffect(() => {
        initData();
    }, []);

    useEffect(() => {
        initData();
    }, [trangThaiDialog]);

    useEffect(() => {
        if (searchText.length > 0) {
            timKiemDataHopDong(searchText).then((result) => {
                setData(result);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            initData();
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
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => {
                        // dispatch({type: 'SETTHONGTINCHUCHOVAY', id: item._id, trangThaiKhoa: item.trangThaiKhoa});
                        // navigation.navigate('Chi tiết chủ cho vay');
                    }}>
                        <Swipeable
                            onSwipeableLeftOpen={onSwipeFromLeft}
                            renderRightActions={(progress, dragX) => <RightActions progress={progress} dragX={dragX}
                                                                                   onPress={onRightPress}></RightActions>}
                        >
                            <ItemHopDong id={item._id}
                                         hinhAnh={item.hinhAnh}
                                         maHopDong={item.maHopDong}
                                         tenKhachHang={item.tenKhachHang}
                                         ngayVay={item.thongTinHopDong.ngayVay}
                                         trangThaiHopDong={item.trangThaiHopDong}
                            />
                        </Swipeable>
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
            let response = await fetch(apiLink + 'managers/hopdongs/' + page + '?token=' + token);
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
            let response = await fetch(apiLink + 'admin/timmanagers?ten=' + ten + '&token=' + token);
            let responseJson = await response.json();
            return responseJson;
        } catch (e) {
            console.log(e);
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
        marginRight:4,
        borderRadius:3
    },

});

