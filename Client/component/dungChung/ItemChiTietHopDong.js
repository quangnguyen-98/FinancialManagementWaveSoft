import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
export default function ItemChiTietHopDong(props) {
    const [trangThaiCTHD, setTrangThaiCTHD] = useState('');

    useEffect(() => {
        switch (props.loai) {
            case 0: {
                setTrangThaiCTHD('Đóng Lãi');
                break;
            }
            case 1: {
                setTrangThaiCTHD('Tất Toán');
                break;
            }
            case 2: {
                setTrangThaiCTHD('Trả Bớt Gốc');
                break;
            }
            case 3: {
                setTrangThaiCTHD('Vay Thêm');
                break;
            }
            case 4: {
                setTrangThaiCTHD('Gia Hạn Kỳ');
                break;
            }
        }

    }, []);

    return (
        <View>
            {
                trangThaiCTHD == "Đóng Lãi" && (
                    <View style={styles.container}>
                        <View style={styles.line}>
                            <Text>Thực Hiện: </Text>
                            <Text style={styles.input}>Đóng Lãi</Text>
                        </View>
                        <View style={styles.line}>
                            <Text>Người Thanh Toán: </Text>
                            <Text style={styles.input}>{props.ttDongLai.thongTinDongLai.nguoiThanhToan}</Text>
                        </View>
                        <View style={styles.line}>
                            <Text>Tiền Đóng Lãi: </Text>
                            <Text style={styles.input}>{props.ttDongLai.thongTinDongLai.tienDongLai}</Text>
                        </View>
                        <View style={styles.line}>
                            <Text>Ngày Đóng Lãi: </Text>
                            <Text style={styles.input}>{props.ttDongLai.thongTinDongLai.ngayDongLai}</Text>
                        </View>
                        <View style={styles.line}>
                            <Text>Ghi Chú: </Text>
                            <Text style={styles.input}>{props.ttDongLai.thongTinDongLai.ghiChu}</Text>
                        </View>
                    </View>
                )
            }
        </View>


    );
}


const styles = StyleSheet.create({
    container: {
        padding: 5,
        height: height / 7,
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: '#C0C0C0',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 }
    },
    line: {
        flex: 1,
        flexDirection: 'row'
    },
    input: {
        fontWeight: 'bold'
    }

});