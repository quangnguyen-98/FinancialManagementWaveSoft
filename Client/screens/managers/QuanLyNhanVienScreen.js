import React, {useState, useEffect} from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage,
    FlatList,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {apiLink} from '../../config/constant';
import {useSelector, useDispatch} from "react-redux";
import {SearchBar} from 'react-native-elements';
import {ItemThongTinUser} from "../../component/";

export default function QuanLyNhanVienScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const trangThaiDialog = useSelector(state=>state.diaglogKhoaUserReducers);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [searchText, setSearchText] = useState('');

    useEffect(initData, []);

    useEffect(() => {
        initData();
    }, [trangThaiDialog]);

    useEffect( () => {
        if(searchText.length>0){
            timKiemDataNhanVien(searchText).then((result) => {
                setData(result);
            }).catch((err) => {
                console.log(err);
            })
        }else {
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
                    <TouchableOpacity
                        onPress={()=>{
                            dispatch({type: 'SETTHONGTINNHANVIEN', id:item._id, trangThaiKhoa: item.trangThaiKhoa});
                            navigation.navigate('Chi tiết nhân viên');
                        }}
                    >
                        <ItemThongTinUser id={item._id}
                                          email={item.email}
                                          hoTen={item.hoTen}
                                          hinhAnh={item.hinhAnh}
                                          trangThaiKhoa={item.trangThaiKhoa}
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
        getDataNhanVien(0).then((result) => {
            // dispatch({type:'REFRESH',page:0,newData:result});
            setData(result);
            setPage(0);
        }).catch((err) => {
            console.log(err);
        });
    }

    function refreshData() {
        setRefreshing(true);
        getDataNhanVien(0).then((result) => {
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
        await getDataNhanVien(newPage).then((result) => {
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

    async function getDataNhanVien(page) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/users/' + page + '?token=' + token);
            let responseJson = await response.json();
            return responseJson;
        } catch (e) {
            console.log(e);
        }
    }

    async function timKiemDataNhanVien(ten) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/timusers?ten=' + ten + '&token=' + token);
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
    }

});

