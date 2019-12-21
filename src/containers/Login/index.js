import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ToastAndroid,
} from 'react-native';
import firebase from 'react-native-firebase';
export default class Login extends React.Component {
  state = {email: '', password: '', errorMessage: null};
  handleLogin = () => {
    if (this.state.email && this.state.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Home'))
        .catch(error => this.setState({errorMessage: error.message}));
    } else {
      ToastAndroid.show('Lütfen bütün boş alanları doldur!', ToastAndroid.LONG);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: '#151965', fontSize: 40}}>Login</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Şifre"
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
        <View style={{marginVertical: 20}}>
          <Button title="Giriş" color="#151965" onPress={this.handleLogin} />
        </View>
        <View>
          <Text>
            {' '}
            Bir hesabın yok mu?
            <Text
              onPress={() => this.props.navigation.navigate('SignUp')}
              style={{color: 'blue', fontSize: 16}}>
              {' '}
              Kayıt Ol{' '}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  textInput: {
    height: 40,
    fontSize: 20,
    width: '90%',
    borderColor: '#9b9b9b',
    borderBottomWidth: 1,
    marginTop: 8,
    marginVertical: 15,
  },
});
