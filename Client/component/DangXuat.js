import React from 'react';
import {StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
export default class DangXuat extends React.Component {
    constructor(props) {
        super(props);
        this.props.action('admin');
    }

    render() {

    }

}

