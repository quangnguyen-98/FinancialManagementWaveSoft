import React,{useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import DangNhapScreen from "./screens/DangNhapScreen";
import DrawerAdmin from "./navigation/admin/DrawerAdmin";
import {useSelector,useDispatch} from 'react-redux';

export default function App() {
    // const screen = useSelector(state => state);
    // const dispatch = useDispatch();
    const [screen, setScreen] = useState('login');
    function handleChange(newValue) {
        setScreen(newValue);
    }


    // const {screen} = this.state;
    let mainScreen;
    if (screen === 'login') {
        mainScreen = <DangNhapScreen onChange={handleChange}/>
    } else if (screen === 'admin') {
        mainScreen = <DrawerAdmin/>
    }
    return(
        mainScreen

    );
}
// const mapStateToProps = (state /*, ownProps*/) => {
//     return {
//         screen: state.counter
//     }
// }
// function mapDispatchToProps(dispath){
//     return{};
// }
// export default connect(mapStateToProps) (App);
//  const Connected = connect(mapStateToProps) (App);
// export default Connected;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
