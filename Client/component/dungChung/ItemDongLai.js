import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import {formatCurrency} from '../../utils/hamHoTro';
const date = new Date();
const {width, height} = Dimensions.get('window');
export default function ItemDongLai(props) {
    const [style, setStyle] = useState('');
    useEffect(() => {
        switch (props.type) {
            case 0: {
                setStyle('chuaDong');
                break;
            }
            case 1: {
                setStyle('daDong');
                break;
            }
            case 2: {
                setStyle('hoatDong');
                break;
            }
            case 3: {
                setStyle('ngayTraGoc');
                break;
            }
        }
    }, []);
    let ngayTraLai = new Date(props.ngayTraLai);
    return (
        <View>
            {
                style === 'chuaDong' && (
                    <View style={styles.containerChuaDong}>
                        <View style={styles.tienLai}>
                            <Text>{`${ngayTraLai.getDate()}-${ngayTraLai.getMonth()+1}-${ngayTraLai.getFullYear()}`}</Text>
                        </View>
                        <View style={styles.tienLai}>
                            <Text>{formatCurrency(props.tienLai)}</Text>
                        </View>
                        <View style={styles.tienLai}>
                            <Text>{formatCurrency(props.tienGoc)}</Text>
                        </View>
                    </View>
                )
            }
            {
                style === 'daDong' && (
                    <View style={styles.containerDaDong}>
                        <View style={styles.tienLai}>
                            <Text>{`${ngayTraLai.getDate()}-${ngayTraLai.getMonth()+1}-${ngayTraLai.getFullYear()}`}</Text>
                        </View>
                        <View style={styles.tienLai}>
                            <Text>{formatCurrency(props.tienLai)}</Text>
                        </View>
                        <View style={styles.tienLai}>
                            <Text>{formatCurrency(props.tienGoc)}</Text>
                        </View>
                    </View>
                )
            }
            {
                style === 'ngayTraGoc' && (
                    <View style={styles.containerNgayTraGoc}>
                        <View style={styles.tienLai}>
                            <Text>{`${ngayTraLai.getDate()}-${ngayTraLai.getMonth()+1}-${ngayTraLai.getFullYear()}`}</Text>
                        </View>
                        <View style={styles.tienLai}>
                            <Text>{formatCurrency(props.tienLai)}</Text>
                        </View>
                        <View style={styles.tienLai}>
                            <Text>{formatCurrency(props.tienGoc)}</Text>
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
        height: height / 13,
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: '#ffffff',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {width: 0, height: 0}
    },
    containerDaDong: {
        padding: 5,
        height: height / 13,
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: '#52c41a',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {width: 0, height: 0}
    },
    containerHoatDong: {
        padding: 5,
        height: height / 7,
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: '#ff2500',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {width: 0, height: 0}
    },
    containerNgayTraGoc: {
        padding: 5,
        height: height / 13,
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: '#40a9ff',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {width: 0, height: 0}

    },
    ngayDongLai: {
        flex: 1,
        justifyContent: 'center',
    },
    tienLai: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'

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