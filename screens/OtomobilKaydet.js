/*Screen to register the user*/
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'cars.db',  createFromLocation : 1});
 
export default class OtomobilKaydet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marka: '',
      model: '',
      yıl: '',
      km:'',
      fiyat:''

    };
  }
 
  register_car = () => {
    var that = this;
    const { marka } = this.state;
    const { model } = this.state;
    const { yıl } = this.state;
    const { km } = this.state;
    const { fiyat } = this.state;
   
    if (marka) {
      if (model) {
        if (yıl) {
          if (km) {
            if (fiyat) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO cars_table (marka, model, yıl, km, fiyat) VALUES (?,?,?,?,?)',
              [marka, model, yıl, km, fiyat],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Başarılı',
                    'Otomobil Kayıt Edildi.',
                    [
                      {
                        text: 'Tamam',
                        onPress: () =>
                          that.props.navigation.navigate('HomeScreen'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Registration Failed');
                }
              }
            );
          });
        } else {
          alert('Fiyat Giriniz!');
        }
      } else {
        alert('KM Giriniz!');
      }
    } else {
      alert('Yıl Giriniz!');
    }
  } else {
    alert('Model Giriniz!');
  }
  } else {
    alert('Marka Giriniz!');
  }
  };
 
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Marka Gir"
              onChangeText={marka => this.setState({ marka })}
              style={{ padding:10 }}
            />
            <Mytextinput
              placeholder="Model Gir"
              onChangeText={model => this.setState({ model })}
              style={{ padding:10 }}
            />
            <Mytextinput
              placeholder="Yıl Gir"
              onChangeText={yıl => this.setState({ yıl })}
              keyboardType="numeric"
              style={{ textAlignVertical: 'top',padding:10 }}
            />
            <Mytextinput
              placeholder="Kilometre gir"
              onChangeText={km => this.setState({ km })}
              keyboardType="numeric"                      
              style={{ textAlignVertical: 'top',padding:10 }}
            />
             <Mytextinput
              placeholder="Fiyat gir"
              onChangeText={fiyat => this.setState({ fiyat })}
              style={{ textAlignVertical: 'top',padding:10 }}
            />
            <Mybutton
              title="Kaydet!"
              customClick={this.register_car.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}