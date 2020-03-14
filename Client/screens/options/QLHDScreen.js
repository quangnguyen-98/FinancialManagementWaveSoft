
import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image, TouchableOpacity, Alert, Animated } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function QLHDScreen() {
    const [hd, setHd] = useState([
        { id: 'HD001', name: 'Huy', ngayvay: '10/02/2020', trangthai: 'Đủ lãi', img: '../../assets/react.png' },
        { id: 'HD002', name: 'Quang', ngayvay: '10/02/2020', trangthai: 'Đủ lãi', img: '../../assets/react.png' },
        { id: 'HD003', name: 'Khang', ngayvay: '10/02/2020', trangthai: 'Nợ lãi', img: '../../assets/react.png' },
        { id: 'HD004', name: 'Thịnh', ngayvay: '10/02/2020', trangthai: 'Nợ lãi', img: '../../assets/react.png' },
        { id: 'HD005', name: 'Nhi', ngayvay: '10/02/2020', trangthai: 'Nợ lãi', img: '../../assets/react.png' },
        { id: 'HD006', name: 'Tài', ngayvay: '10/02/2020', trangthai: 'Nợ lãi', img: '../../assets/react.png' },
        { id: 'HD007', name: 'Anh', ngayvay: '10/02/2020', trangthai: 'Nợ lãi', img: '../../assets/react.png' },
        { id: 'HD008', name: 'Em', ngayvay: '10/02/2020', trangthai: 'Nợ lãi', img: '../../assets/react.png' },
    ]);

    // const swipeSettings={
    //     autoClose:true,
    //     onClose:(secId,rowId,direction)=>{

    //     },
    //     onOpen:(secId,rowId,direction)=>{

    //     },
    //     right:[
    //         {
    //             onPress:()=>{

    //             },
    //             text:'Delete',type:'delete'
    //         }
    //     ]
    // }

    const LeftActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        return (
            <View style={styles.leftActions}>
                <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>Sửa</Animated.Text>
            </View>
        )
    }

    const RightActions = ({progress, dragX,onPress}) => {
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
                        <Swipeable
                            renderLeftActions={LeftActions}
                            onSwipeableLeftOpen={onSwipeFromLeft}
                            renderRightActions={(progress,dragX)=><RightActions progress={progress} dragX={dragX} onPress={onRightPress}></RightActions>}>
                            <View style={{
                                backgroundColor: item.trangthai == 'Nợ lãi' ? '#FF0000' : '#00FF00', flex: 1, marginBottom: 2, height: 128, justifyContent: 'center', flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/react.png')} style={styles.IMGKhachHang}>

                                </Image>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={styles.textShow}>Mã Hợp Đồng: {item.id}</Text>
                                    <Text style={styles.textShow}>Tên Người Vay: {item.name}</Text>
                                    <Text style={styles.textShow}>Ngày Vay: {item.ngayvay}</Text>
                                    <Text style={styles.textShowTrangThai}>{item.trangthai}</Text>
                                </View>

                            </View>
                        </Swipeable>
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
        fontSize: 18,
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
        width: 128,
        height: 128,
        marginHorizontal: 8,
    },
    leftActions: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#00CC00',
        marginBottom: 2,
        flex:1
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
        height:128
    },

});