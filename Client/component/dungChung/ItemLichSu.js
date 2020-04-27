import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { formatCurrency } from '../../utils/hamHoTro';
const heightItem = '100%';
const flexDirection = 'row';
export default function ItemLichSu(props) {
    const [style, setStyle] = useState('');
    useEffect(() => {
        switch (props.type) {
            case 0: {
                setStyle('themPhieuThu');
                break;
            }
            case 1: {
                setStyle('xoaPhieuThu');
                break;
            }
            case 2: {
                setStyle('giaHan');
                break;
            }
            case 3: {
                setStyle('traBotGoc');
                break;
            }
            case 4: {
                setStyle('vayThem');
                break;
            }
        }
    }, []);
    let ngayThucHien = new Date(props.ngayThucHien);
    let ngayVayThem = new Date(props.ngayVayThem);
    let ngayTraBotGoc = new Date(props.ngayTraBotGoc);
    let ngayTraLai = new Date(props.ngayTraLai);
    let ngayDong = props.ngayDong ? new Date(props.ngayDong) : null;
    return (
        <View>
            {
                style === 'themPhieuThu' && (
                    <View style={styles.containerChuaDong}>
                        <View style={styles.leftContent}>
                            <Text style={{ fontWeight: 'bold' }}>Ngày thực hiện:{`${ngayThucHien.getDate()}-${ngayThucHien.getMonth() + 1}-${ngayThucHien.getFullYear()}`}</Text>
                            <Text>Ngày trả lãi:{`${ngayTraLai.getDate()}-${ngayTraLai.getMonth() + 1}-${ngayTraLai.getFullYear()}`}</Text>
                            <Text>Người đóng: {props.nguoiDong}</Text>
                            <Text>Ngày đóng:{`${ngayDong.getDate()}-${ngayDong.getMonth() + 1}-${ngayDong.getFullYear()}`}</Text>
                            {
                                props.phiKhac.length > 0 && (<Text>Phí khác:{props.phiKhac}</Text>)
                            }
                            {
                                props.ghiChu.length > 0 && (<Text>Ghi chú:{props.ghiChu}</Text>)
                            }

                        </View>
                        <View style={styles.rightContent}>
                            <Text>Thêm phiếu thu</Text>
                        </View>
                    </View>
                )
            }
            {
                style === 'xoaPhieuThu' && (
                    <View style={styles.containerChuaDong}>
                        <View style={styles.leftContent}>
                            <Text style={{ fontWeight: 'bold' }}>Ngày thực hiện:{`${ngayThucHien.getDate()}-${ngayThucHien.getMonth() + 1}-${ngayThucHien.getFullYear()}`}</Text>
                            <Text>Ngày trả lãi:{`${ngayTraLai.getDate()}-${ngayTraLai.getMonth() + 1}-${ngayTraLai.getFullYear()}`}</Text>
                            <Text>Người đóng: {props.nguoiDong}</Text>
                            <Text>Ngày đóng:{`${ngayDong.getDate()}-${ngayDong.getMonth() + 1}-${ngayDong.getFullYear()}`}</Text>
                            {
                                props.phiKhac.length > 0 && (<Text>Phí khác:{props.phiKhac}</Text>)
                            }
                            {
                                props.ghiChu.length > 0 && (<Text>Ghi chú:{props.ghiChu}</Text>)
                            }

                        </View>
                        <View style={styles.rightContent}>
                            <Text>Xóa phiếu thu</Text>
                        </View>
                    </View>
                )
            }
            {
                style === 'giaHan' && (
                    <View style={styles.containerChuaDong}>
                        <View style={styles.leftContent}>
                            <Text style={{ fontWeight: 'bold' }}>Ngày thực hiện:{`${ngayThucHien.getDate()}-${ngayThucHien.getMonth() + 1}-${ngayThucHien.getFullYear()}`}</Text>
                            <Text>Số kỳ gia hạn: {props.soKyGiaHan}</Text>
                            {
                                props.lyDo.length > 0 && (<Text>Lý do:{props.lyDo}</Text>)
                            }
                        </View>
                        <View style={styles.rightContent}>
                            <Text>Gia hạn</Text>
                        </View>
                    </View>
                )
            }
            {
                style === 'traBotGoc' && (
                    <View style={styles.containerChuaDong}>
                        <View style={styles.leftContent}>
                            <Text style={{ fontWeight: 'bold' }}>Ngày thực hiện:{`${ngayThucHien.getDate()}-${ngayThucHien.getMonth() + 1}-${ngayThucHien.getFullYear()}`}</Text>
                            <Text>Ngày trả bớt gốc: {`${ngayTraBotGoc.getDate()}-${ngayTraBotGoc.getMonth() + 1}-${ngayTraBotGoc.getFullYear()}`}</Text>
                            <Text>Tiền trả bớt gốc: {formatCurrency(props.tienTraBotGoc)}</Text>
                            {
                                props.ghiChu.length > 0 && (<Text>Ghi chú:{props.ghiChu}</Text>)
                            }
                        </View>
                        <View style={styles.rightContent}>
                            <Text>Trả bớt gốc</Text>
                        </View>
                        
                    </View>
                )
            }
            {
                style === 'vayThem' && (
                    <View style={styles.containerChuaDong}>
                        <View style={styles.leftContent}>
                            <Text style={{ fontWeight: 'bold' }}>Ngày thực hiện:{`${ngayThucHien.getDate()}-${ngayThucHien.getMonth() + 1}-${ngayThucHien.getFullYear()}`}</Text>
                            <Text>Ngày vay thêm: {`${ngayVayThem.getDate()}-${ngayVayThem.getMonth() + 1}-${ngayVayThem.getFullYear()}`}</Text>
                            <Text>Tiền vay thêm: {formatCurrency(props.tienVayThem)}</Text>
                            {
                                props.ghiChu.length > 0 && (<Text>Ghi chú:{props.ghiChu}</Text>)
                            }
                        </View>
                        <View style={styles.rightContent}>
                            <Text>Vay thêm</Text>
                        </View>
                    </View>
                )
            }
        </View>
    );
}


const styles = StyleSheet.create({
    containerChuaDong: {
        padding: 5,
        flexDirection: flexDirection,
        marginBottom: 5,
        backgroundColor: '#ffffff',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 }
    },
    containerDaDong: {
        padding: 5,
        height: heightItem,
        flexDirection: flexDirection,
        marginBottom: 5,
        backgroundColor: '#52c41a',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 }
    },
    containerHoatDong: {
        padding: 5,
        height: heightItem,
        flexDirection: flexDirection,
        marginBottom: 5,
        backgroundColor: '#ff2500',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 }
    },
    containerNgayTraGoc: {
        padding: 5,
        height: heightItem,
        flexDirection: flexDirection,
        marginBottom: 5,
        backgroundColor: '#40a9ff',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 }

    },
    ngayDongLai: {
        flex: 1,
        justifyContent: 'center',
    },
    leftContent: {
        flex: 3,
    },
    rightContent: {
        flex: 1,
        borderLeftWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'

    },
    tienGoc: {
        borderLeftWidth: 1,
        borderColor: 'white',
        flex: 1,
        justifyContent: 'center'
    },
    ngayDong: {
        flex: 1,
        justifyContent: 'center',
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