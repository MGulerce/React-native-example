/*Screen to view all the user*/
import React from 'react';
import { StyleSheet,FlatList, Text, View } from 'react-native';
import {ImageBackground} from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage';
import { BorderlessButton } from 'react-native-gesture-handler';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'cars.db', createFromLocation : 1});
 
export default class HepsiniGoruntule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM cars_table', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
    );
  };
  render() {
    return (
     
        
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.id} style={{ padding: 20,paddingTop:50 }}>           
              <Text style={styles.text} >Otomobil No.: {item.id}</Text>
              <Text style={styles.text}>Marka: {item.marka}</Text>
              <Text style={styles.text}>Model: {item.model}</Text>
              <Text style={styles.text}>Yıl: {item.yıl}</Text>
              <Text style={styles.text}>Kilometre: {item.km}</Text>
              <Text style={styles.text}>Fiyat: {item.fiyat}</Text>       
            </View>
          )}
        />
         </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: '#151965',
    fontWeight:'bold',
    fontSize: 18,
    marginLeft: 95,
    marginRight: 25,
  },
});