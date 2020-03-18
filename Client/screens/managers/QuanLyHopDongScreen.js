
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image, TouchableOpacity, Alert, Animated, AsyncStorage, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { apiLink } from '../../config/constant';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function QLHDScreen() {
    const [hd, setHd] = useState([
        // { id: 'HD001', name: 'Huy', ngayvay: '10/02/2020', trangthai: 'Đủ lãi'},
        // { id: 'HD002', name: 'Quang', ngayvay: '10/02/2020', trangthai: 'Đủ lãi'},
        // { id: 'HD003', name: 'Khang', ngayvay: '10/02/2020', trangthai: 'Nợ lãi'},
        // { id: 'HD004', name: 'Thịnh', ngayvay: '10/02/2020', trangthai: 'Nợ lãi'},
        // { id: 'HD005', name: 'Nhi', ngayvay: '10/02/2020', trangthai: 'Nợ lãi'},
        // { id: 'HD006', name: 'Tài', ngayvay: '10/02/2020', trangthai: 'Nợ lãi'},
        // { id: 'HD007', name: 'Anh', ngayvay: '10/02/2020', trangthai: 'Nợ lãi'},
        // { id: 'HD008', name: 'Em', ngayvay: '10/02/2020', trangthai: 'Nợ lãi'},
    ]);

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

    useEffect(() => {
        getAllHD(0).then((listHD) => {
            setHd(listHD)
        }).catch((e) => {

        })
    }, []); // DidMount




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

    return (
        <View style={styles.container}>
            <FlatList data={hd}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity>
                            <Swipeable
                                onSwipeableLeftOpen={onSwipeFromLeft}
                                renderRightActions={(progress, dragX) => <RightActions progress={progress} dragX={dragX} onPress={onRightPress}></RightActions>}>
                                <View style={{
                                    backgroundColor: item.trangThaiHopDong == 0 ? '#FF9900' : '#008000', flex: 1, marginBottom: 2, height: windowHeight / 9, justifyContent: 'center', flexDirection: 'row',
                                    alignItems: 'center',
                                    borderRadius:4,
                                    marginHorizontal:4
                                }}>
                                    <Image source={require('../../assets/react.png')} style={styles.IMGKhachHang}>

                                    </Image>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <Text style={styles.textShow}>Mã Hợp Đồng: {item.maHopDong}</Text>
                                        <Text style={styles.textShow}>Tên Người Vay: {item.tenKhachHang}</Text>
                                        <Text style={styles.textShow}>Ngày Vay: {item.thongTinHopDong.ngayVay.ngay}/{item.thongTinHopDong.ngayVay.thang + 1}/{item.thongTinHopDong.ngayVay.nam}</Text>
                                        <Text style={styles.textShowTrangThai}>{item.trangThaiHopDong == 0 ? 'Nợ Lãi' : 'Đủ Lãi'}</Text>
                                    </View>

                                </View>
                            </Swipeable>
                        </TouchableOpacity>
                    );
                }}>

            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    textShow: {
        fontSize: 16,
        paddingLeft: 8,
        color: '#FFFFFF',
    },
    textShowTrangThai: {
        fontSize: 24,
        paddingLeft: 8,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    IMGKhachHang: {
        width: windowWidth / 4.5,
        height: windowHeight / 10,
        marginHorizontal: 8,
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
        height: windowHeight / 9,
        marginRight:4
    },

});