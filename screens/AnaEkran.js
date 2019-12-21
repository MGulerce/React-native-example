import React from 'react';
import { View } from 'react-native';
import Mybutton from '../components/Mybutton';
import Mytext from '../components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
import {ImageBackground} from 'react-native';

var db = openDatabase({ name: 'cars.db', createFromLocation : 1});

export default class AnaEkran extends React.Component {
  constructor(props) {
    super(props);
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='cars_table'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS cars_table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS cars_table(id INTEGER PRIMARY KEY AUTOINCREMENT, marka VARCHAR(20), model VARCHAR(20), yıl VARCHAR(25), km VARCHAR(20), fiyat VARCHAR(20))',
              []
            );
          }
        }
      );
    });
  }
 
  render() {   
    return (    
      <View
        style={{
          flex: 1,   
          flexDirection: 'column',
        }}>   
   <ImageBackground source={require('../components/image.png')} style={{flex:1}} resizeMode="contain"></ImageBackground>
  
        <Mybutton
          title="Otomobil Kaydet"
          customClick={() => this.props.navigation.navigate('Kaydet')}
        />
        <Mybutton
          title="Otomobil Güncelle"
          customClick={() => this.props.navigation.navigate('Guncelle')}
        />
        <Mybutton
          title="Hepsini Görüntüle"
          customClick={() => this.props.navigation.navigate('All')}
        />
        <Mybutton
          title="Otomobil Sil"
          customClick={() => this.props.navigation.navigate('Sil')}
        />
        <Mybutton
          title="Tüm Otomobil Markaları"
          customClick={() => this.props.navigation.navigate('Markalar')}
        />
      </View>
    );
  }
}