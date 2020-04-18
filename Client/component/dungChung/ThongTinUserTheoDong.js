import React, {useState,Fragment} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import call from 'react-native-phone-call';
export default function ThongTinUserTheoDong(props) {
    const args = {
        number: props.giaTri,
        prompt: true
    }
    return (
        <Fragment>
            {
                props.type === 'bt'&&(
                    <View style={styles.wrapItem}>
                        <Text style={styles.itemLeft} >{props.tieuDe}</Text>
                        <Text style={styles.itemRight}>{props.giaTri}</Text>
                    </View>
                )
            }
            {
                props.type === 'sdt'&&(
                    <View style={styles.wrapItem}>
                        <Text style={styles.itemLeft} >{props.tieuDe}</Text>
                        <Text style={styles.itemRight} onPress={()=>{call(args).catch(console.error)}}>{props.giaTri}</Text>
                    </View>
                )
            }
        </Fragment>

    );
}
const styles = StyleSheet.create({
    wrapItem:{
        width:'100%',
        height:'10%',
        flexDirection:'row',
        borderBottomColor:'#a9a9a9',
        borderBottomWidth:1,
        marginVertical:10
    },
    itemLeft:{
        flex:1,
        fontWeight:'bold',
        fontSize:22,
        paddingLeft:'8%'

    },
    itemRight:{
        flex:2,
        fontWeight:'bold',
        fontSize:22,
        paddingLeft:'10%',
        color:'#1e90ff'

    }

});