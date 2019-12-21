import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import firebase from 'react-native-firebase';
import {ImageBackground} from 'react-native';
export default class SplashPage extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'Home' : 'SignUp');
      });
    }, 1800);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: '#151965', fontSize: 40}}>Hoşgeldiniz</Text>
        <ActivityIndicator color="#151965" size="large" />
      
      </View>
    );
  
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
