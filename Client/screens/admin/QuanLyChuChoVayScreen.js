import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView, AsyncStorage, FlatList, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {apiLink} from '../../config/constant';
import {useSelector,useDispatch} from "react-redux";
import ChuChoVayItem from "../../component/managers/ChuChoVayItem";

export default function QuanLyChuChoVayScreen() {

    // const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    // const [page, setPage] = useState(0);
    const dataStore = useSelector(state=>state.dataChuChoVayReducers);
    const dispatch = useDispatch();
     useEffect(initData, []);

    // useEffect(addMoreData);
    return (
        <View style={styles.container}>
            <View style={styles.thongTin}>
                <FlatList
                    style={{flex:1}}
                    data={dataStore.data}
                    renderItem={({item}) => (
                        <ChuChoVayItem email={item.email} hoTen={item.hoTen} hinhAnh={item.hinhAnh}
                                       trangThaiKhoa={item.trangThaiKhoa}/>
                    )}
                    extraData={dataStore.data}
                    keyExtractor={(item,index) => `${item._id+index}`}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={refreshData}

                    />}
                     onEndReached={addMoreData}
                     EndReachedThreshold={0.5}
                />
                {/*{data.map(item => (*/}
                {/*    <ChuChoVayItem key={item._id} email={item.email} hoTen={item.hoTen}/>*/}
                {/*))}*/}

            </View>

        </View>
    );
    function initData() {
        getDataChuChoVay(0).then((result) => {
                dispatch({type:'REFRESH',page:0,newData:result});

        }).catch((err) => {
        });
    }
    function refreshData() {
        setRefreshing(true);
        getDataChuChoVay(0).then((result) => {
            if(result != dataStore.data){
                dispatch({type:'REFRESH',page:0,newData:result});
                setRefreshing(false);
            }
            setRefreshing(false);
        }).catch((err) => {
            // setData([]);
            // setPage(0);
            setRefreshing(false);
        });
    }
    async function addMoreData() {
        // setRefreshing(true);
        let newPage = await dataStore.page+1;
        await getDataChuChoVay(newPage).then((result) => {
            if (result.length>0){
                dispatch({type:'UPDATE',page:newPage,newData:result});
            }

            // setData(result);
            // setRefreshing(false);
        }).catch((err) => {
            // setData([]);
            // setPage(0);
            // setRefreshing(false);
        });
    }

    // function addMoreData() {
    //     getDataChuChoVay(page).then((result) => {
    //         let dataCu = data;
    //         let dataMoi = dataCu.concat(result);
    //         setData(dataMoi);
    //     }).catch((err) => {
    //         setData([]);
    //     });
    // }
    // function updatePage() {
    //    setPage(page+1);
    // }
    // async function getData() {
    //     let value = await AsyncStorage.getItem('token');
    //     await fetch(apiLink + 'admin/managers/' + (dataStore.page+1) + '?token=' + value).then((responseJson)=>{
    //         dispatch({type:'UPDATE',page:dataStore.page+1,newData:responseJson.json()});
    //     });
    // }
}

async function getDataChuChoVay(page) {
    try {
        let token = await AsyncStorage.getItem('token');
        let response = await fetch(apiLink + 'admin/managers/' + page + '?token=' + token);
        let responseJson = await response.json();
        return responseJson;
    } catch (e) {
        console.log(e);
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    thongTin: {
        flex: 3,
        padding: 5
    }

});

