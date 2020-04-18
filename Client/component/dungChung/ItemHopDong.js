import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
const date = new Date()
const { width, height } = Dimensions.get('window');
export default function ItemHopDong(props) {
    const [trangThaiHD, setTrangThaiHD] = useState('');
    const [style, setStyle] = useState('');

    useEffect(() => {
        switch (props.trangThaiHopDong) {
            case 0: {
                setTrangThaiHD('Đủ lãi');
                setStyle('duLai');
                break;
            }
            case 1: {
                setTrangThaiHD('Nợ lãi');
                setStyle('noLai');
                break;
            }
            case 2: {
                setTrangThaiHD('Quá hạn');
                setStyle('quaHan');
                break;
            }
            case 3: {
                setTrangThaiHD('Đã đóng');
                setStyle('hoanThanh');
                break;
            }
            case 4: {
                setTrangThaiHD('Chờ duyệt');
                setStyle('choDuyet');
                break;
            }
        }

    },[]);

    return (
        <View>
            {
                style == 'duLai' && (
                    <View style={styles.containerDuLai}>
                        <Image style={styles.hinhAnh} source={{ uri: props.hinhAnh }} />
                        <View style={styles.thongTin}>
                            <View style={styles.ten}>
                                <Text style={styles.textMaHopDong}>{props.maHopDong}</Text>
                            </View>
                            <View style={styles.dongItem}>
                                <Text style={styles.textThongTin}>{props.tenKhachHang}</Text>
                            </View>
                            <View style={styles.dongItem}>
                                <Text style={styles.textThongTin}>Ngày vay: {new Date(props.ngayVay).getDate() + "/" + (new Date(props.ngayVay).getMonth() + 1) + "/" + new Date(props.ngayVay).getFullYear()}</Text>
                            </View>

                        </View>
                        <View style={styles.trangThai}>
                            <View style={styles.dongItem}>
                                <Text style={styles.textTrangThai}>{trangThaiHD}</Text>
                            </View>
                        </View>
                    </View>

                )
            }
            {
                style == 'noLai' && (
                    <View style={styles.containerNoLai}>
                        <Image style={styles.hinhAnh} source={{ uri: props.hinhAnh }} />
                        <View style={styles.thongTin}>
                            <View style={styles.ten}>
                                <Text style={styles.textMaHopDong}>{props.maHopDong}</Text>
                            </View>
                            <View style={styles.dongItem}>
                                <Text style={styles.textThongTin}>{props.tenKhachHang}</Text>
                            </View>
                            <View style={styles.dongItem}>
                                <Text style={styles.textThongTin}>Ngày vay: {new Date(props.ngayVay).getDate() + "/" + (new Date(props.ngayVay).getMonth() + 1) + "/" + new Date(props.ngayVay).getFullYear()}</Text>
                            </View>

                        </View>
                        <View style={styles.trangThai}>
                            <View style={styles.dongItem}>
                                <Text style={styles.textTrangThai}>{trangThaiHD}</Text>
                            </View>
                        </View>
                    </View>
                )
            }
            {
                style == 'quaHan' && (
                    <View style={styles.containerQuaHan}>
                        <Image style={styles.hinhAnh} source={{ uri: props.hinhAnh }} />
                        <View style={styles.thongTin}>
                            <View style={styles.ten}>
                                <Text style={styles.textMaHopDong}>{props.maHopDong}</Text>
                            </View>
                            <View style={styles.dongItem}>
                                <Text style={styles.textThongTin}>{props.tenKhachHang}</Text>
                            </View>
                            <View style={styles.dongItem}>
                                <Text style={styles.textThongTin}>Ngày vay: {new Date(props.ngayVay).getDate() + "/" + (new Date(props.ngayVay).getMonth() + 1) + "/" + new Date(props.ngayVay).getFullYear()}</Text>
                            </View>

                        </View>
                        <View style={styles.trangThai}>
                            <View style={styles.dongItem}>
                                <Text style={styles.textTrangThai}>{trangThaiHD}</Text>
                            </View>
                        </View>
                    </View>
                )
            }
            {
                style == 'hoanThanh' && (
                    <View style={styles.containerHoanThanh}>
                        <Image style={styles.hinhAnh} source={{ uri: props.hinhAnh }} />
                        <View style={styles.thongTin}>
                            <View style={styles.ten}>
                                <Text style={styles.textMaHopDong}>{props.maHopDong}</Text>
                            </View>
                            <View style={styles.dongItem}>
                                <Text style={styles.textThongTin}>{props.tenKhachHang}</Text>
                            </View>
                            <View style={styles.dongItem}>
                                <Text style={styles.textThongTin}>Ngày vay: {new Date(props.ngayVay).getDate() + "/" + (new Date(props.ngayVay).getMonth() + 1) + "/" + new Date(props.ngayVay).getFullYear()}</Text>
                            </View>

                        </View>
                        <View style={styles.trangThai}>
                            <View style={styles.dongItem}>
                                <Text style={styles.textTrangThai}>{trangThaiHD}</Text>
                            </View>
                        </View>
                    </View>
                )
            }
            {
                style == 'choDuyet' && (
                    <View style={styles.containerChoDuyet}>
                        <Image style={styles.hinhAnh} source={{ uri: props.hinhAnh }} />
                        <View style={styles.thongTin}>
                            <View style={styles.ten}>
                                <Text style={styles.textMaHopDong}>{props.maHopDong}</Text>
                            </View>
                            <View style={styles.dongItem}>
                                <Text style={styles.textThongTin}>{props.tenKhachHang}</Text>
                            </View>
                            <View style={styles.dongItem}>
                                <Text style={styles.textThongTin}>Ngày vay: {new Date(props.ngayVay).getDate() + "/" + (new Date(props.ngayVay).getMonth() + 1) + "/" + new Date(props.ngayVay).getFullYear()}</Text>
                            </View>
                        </View>
                        <View style={styles.trangThai}>
                            <View style={styles.dongItem}>
                                <Text style={styles.textTrangThai}>{trangThaiHD}</Text>
                            </View>
                        </View>
                    </View>
                )
            }
        </View>
    );
}


const styles = StyleSheet.create({
    containerBinhThuong: {
        padding:5,
        height: height/7,
        flexDirection: 'row',
        marginBottom:5,
        backgroundColor:'#ffffff',
        borderRadius:3,
        shadowColor:'#000000',
        shadowOpacity:0.3,
        shadowRadius:5,
        shadowOffset:{width:0,height:0}
    },
    containerDuLai: {
        padding: 5,
        height: height / 7,
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: '#52c41a',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 }
    },
    containerNoLai: {
        padding: 5,
        height: height / 7,
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: '#faad14',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 }
    },
    containerQuaHan: {
        padding: 5,
        height: height / 7,
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: '#ff2500',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 }
    },
    containerHoanThanh: {
        padding: 5,
        height: height / 7,
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: '#1890ff',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 }
    },
    containerChoDuyet: {
        padding: 5,
        height: height / 7,
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: '#13c2c2',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 }
    },
    hinhAnh: {
        flex: 1.2
    },
    thongTin: {
        flex: 3.5,
        justifyContent: 'center',

    },
    trangThai: {
        borderLeftWidth: 1,
        borderColor: 'white',
        flex: 1,
        justifyContent: 'center'
    },
    ten: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dongItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textMaHopDong: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#ecdfef'
    },
    textThongTin: {
        fontSize: 20,
        color: '#ecdfef'
    },
    textTrangThai: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ecdfef'
    }

});