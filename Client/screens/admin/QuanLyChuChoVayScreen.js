import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView, AsyncStorage} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {apiLink} from '../../config/constant';
import ChuChoVayItem from "../../component/managers/ChuChoVayItem";

export default class QuanLyChuChoVayScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page:0
         }
        // setInterval(async ()=>{
        //     let arr = await this.state.data;
        //     await arr.push({  email:'sad',
        //         hoTen:'ddd'});
        //     let item =[{
        //         email:'sad',
        //         hoTen:'ddd'
        //     }]
        //
        //     this.setState({
        //        data:arr
        //     });
        // },3000)

    }

    render() {
        let {data} = this.state;
        return (
            <View style={styles.container}>
                {/*<MenuThemChuChoVay/>*/}
                <View style={styles.thongTin}>
                    {data.map(item => (
                        <ChuChoVayItem key={item._id} email={item.email} hoTen={item.hoTen}/>
                    ))}

                </View>

            </View>
        );
    }

    componentDidMount() {
        getDataChuChoVay(this.state.page).then((data) => {
            this.setState({
                data: data,
                page:this.state.page+1
            });
        });


    }

}

async function getDataChuChoVay(page) {
    try {
        let value = await AsyncStorage.getItem('token');
        let response = await fetch(apiLink + 'admin/managers/'+page+'?token=' + value);
        let responseJson = await response.json();
        return responseJson;
    } catch (e) {
        console.log(e);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    thongTin: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: '2%'
    }

});

