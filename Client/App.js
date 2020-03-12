import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import DangNhapScreen from "./screens/login/DangNhapScreen";
import MenuAdmin from "./screens/admin/MenuAdmin";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        // Bind the this context to the handler function
        this.handler = this.handler.bind(this);

        this.state = {
            screen: 'login'
        }
    }

    handler(string) {
        if(string == 'admin'){
            this.setState({
                screen: 'admin'
            });
        }

    }

    render() {
        const {screen} = this.state;
        let mainScreen;
        if (screen === 'login') {
            mainScreen = <DangNhapScreen action={this.handler}/>
        } else if (screen === 'admin') {
            mainScreen = <MenuAdmin/>
        }
        return mainScreen;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
