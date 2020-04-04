import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList, AsyncStorage } from 'react-native';
import { apiLink } from "../../config/constant";

const { width, height } = Dimensions.get('window');

export default function LichSuHopDong({ navigation, route }) {

    useEffect(() => {
        initDataChiTiet();
    }, []);

    const [dataChiTiet, setDataChiTiet] = useState(null);
    const { id } = route.params;
    return (
        <View style={styles.thongTin}>
            <FlatList
                style={{ flex: 3 }}
                data={dataChiTiet}
                renderItem={({ item, index }) => (

                    <View>
                        {
                            item.loaiChiTiet == 0 && (
                                <View style={styles.container}>
                                    <View style={styles.line}>
                                        <Text>Thực Hiện: </Text>
                                        <Text style={styles.input}>Đóng Lãi</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Người Thanh Toán: </Text>
                                        <Text style={styles.input}>{item.thongTinDongLai.nguoiThanhToan}</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Tiền Đóng Lãi: </Text>
                                        <Text style={styles.input}>{item.thongTinDongLai.tienDongLai}</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Ngày Đóng Lãi: </Text>
                                        <Text style={styles.input}>{item.thongTinDongLai.ngayDongLai}</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Ghi Chú: </Text>
                                        <Text style={styles.input}>{item.thongTinDongLai.ghiChu}</Text>
                                    </View>
                                </View>
                            )
                        }
                        {
                            item.loaiChiTiet == 1 && (
                                <View style={styles.container}>
                                    <View style={styles.line}>
                                        <Text>Thực Hiện: </Text>
                                        <Text style={styles.input}>Tất Toán</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Người Thanh Toán: </Text>
                                        <Text style={styles.input}>{item.thongTinTatToan.nguoiThanhToan}</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Tiền Tất Toán: </Text>
                                        <Text style={styles.input}>{item.thongTinTatToan.tienTatToan}</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Ngày Tất Toán: </Text>
                                        <Text style={styles.input}>{item.thongTinTatToan.ngayTatToan}</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Ghi Chú: </Text>
                                        <Text style={styles.input}>{item.thongTinTatToan.ghiChu}</Text>
                                    </View>
                                </View>
                            )
                        }
                        {
                            item.loaiChiTiet == 2 && (
                                <View style={styles.container}>
                                    <View style={styles.line}>
                                        <Text>Thực Hiện: </Text>
                                        <Text style={styles.input}>Trả Bớt Gốc</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Người Thanh Toán: </Text>
                                        <Text style={styles.input}>{item.thongTinTraBotGoc.nguoiThanhToan}</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Tiền Trả Bớt Gốc: </Text>
                                        <Text style={styles.input}>{item.thongTinTraBotGoc.tienTraBotGoc}</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Ngày Trả Bớt Gốc: </Text>
                                        <Text style={styles.input}>{item.thongTinTraBotGoc.ngayTraBotGoc}</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Ghi Chú: </Text>
                                        <Text style={styles.input}>{item.thongTinTraBotGoc.ghiChu}</Text>
                                    </View>
                                </View>
                            )
                        }
                        {
                            item.loaiChiTiet == 3 && (
                                <View style={styles.container}>
                                    <View style={styles.line}>
                                        <Text>Thực Hiện: </Text>
                                        <Text style={styles.input}>Vay Thêm</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Người Vay: </Text>
                                        <Text style={styles.input}>{item.thongTinVayThem.nguoiThanhToan}</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Tiền Vay Thêm: </Text>
                                        <Text style={styles.input}>{item.thongTinVayThem.tienVayThem}</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Ngày Vay Thêm: </Text>
                                        <Text style={styles.input}>{item.thongTinVayThem.ngayVayThem}</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Ghi Chú: </Text>
                                        <Text style={styles.input}>{item.thongTinVayThem.ghiChu}</Text>
                                    </View>
                                </View>
                            )
                        }
                        {
                            item.loaiChiTiet == 4 && (
                                <View style={styles.container}>
                                    <View style={styles.line}>
                                        <Text>Thực Hiện: </Text>
                                        <Text style={styles.input}>Gia Hạn Kỳ</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Số Lần Gia Hạn: </Text>
                                        <Text style={styles.input}>{item.thongTinGiaHanKy.soLanGiaHan}</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Ngày Gia Hạn: </Text>
                                        <Text style={styles.input}>{item.thongTinGiaHanKy.ngayGiaHan}</Text>
                                    </View>
                                    <View style={styles.line}>
                                        <Text>Lí Do: </Text>
                                        <Text style={styles.input}>{item.thongTinGiaHanKy.liDoGiaHan}</Text>
                                    </View>
                                </View>
                            )
                        }
                    </View>
                    // <View>
                    //     <Text>{item.thongTinTatToan.nguoiThanhToan}</Text>
                    // </View>
                )}
                extraData={dataChiTiet}
                keyExtractor={(item) => `${item._id}`}
            />
            {/* <Text>{JSON.stringify(dataChiTiet)}</Text> */}
        </View>
    )

    function initDataChiTiet() {
        getAllCTHD(id).then((result) => {
            // dispatch({type:'REFRESH',page:0,newData:result});
            setDataChiTiet(result);
        }).catch((err) => {
            console.log(err);
        });
    }

    async function getAllCTHD(id) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(apiLink + 'managers/chitiethopdongs/?id=' + id + '&token=' + token);
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
        paddingHorizontal: 5,
    },
    container: {
        padding: 5,
        height: height / 7,
        flexDirection: 'column',
        marginBottom: 5,
        backgroundColor: '#C0C0C0',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 },
        flex:1
    },
    line: {
        flex: 1,
        flexDirection: 'row'
    },
    input: {
        fontWeight: 'bold'
    }
});