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

export default function QuanLyChuChoVayScreen({route}) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const refresReducers = useSelector(state=>state.refreshReducers);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [searchText, setSearchText] = useState('');

    useEffect(()=>{
        if(!refresReducers) return;
        initData();
        dispatch({type:'RESET_REFRESH'});
    },[refresReducers]);

    useEffect(() => {
        let timer = setTimeout(()=> {
            if (searchText.length > 0) {
                timKiemDataChuChoVay(searchText).then((result) => {
                    setData(result);
                }).catch((e) => {
                    console.log(JSON.stringify(e));
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
                onChangeText={(search)=>{setSearchText(search)}}
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
                    <TouchableOpacity onPress={()=>{
                        dispatch({type: 'SETTHONGTINCHUCHOVAY', id:item._id, trangThaiKhoa: item.trangThaiKhoa});
                        navigation.navigate('Chi tiết chủ cho vay');
                    }}>
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
                    onRefresh={initData}
                />}
                onEndReached={addMoreData}
                EndReachedThreshold={0.2}
            />
        </View>
    );


    function initData() {
        setRefreshing(true);
        getDataChuChoVay(0).then((result) => {
            // dispatch({type:'REFRESH',page:0,newData:result});
            setData([]);
            setData(result);
            setPage(0);
            setRefreshing(false);
        }).catch((e) => {
            setRefreshing(false);
            console.log(JSON.stringify(e));
        });
    }

   /* function refreshData() {
        setRefreshing(true);
        getDataChuChoVay(0).then((result) => {
            if (result != data) {
                setData(result);
                setPage(0);
                setRefreshing(false);
            }
            setRefreshing(false);
        }).catch((e) => {
            setRefreshing(false);
        });
    }*/

    async function addMoreData() {
        let newPage = page + 1;
        await getDataChuChoVay(newPage).then((result) => {
            if (result.length > 0) {
                setData([
                    ...data, ...result
                ]);
                setPage(page + 1);
            }
        }).catch((e) => {
            setRefreshing(false);
        });
    }

    async function getDataChuChoVay(page) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'admin/managers/' + page + '?token=' + token);
            let responseJson = await response.json();
            return responseJson;
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    }

    async function timKiemDataChuChoVay(ten) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'admin/timmanagers?ten=' + ten + '&token=' + token);
            let responseJson = await response.json();
            return responseJson;
        } catch (e) {
            console.log(JSON.stringify(e));
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

