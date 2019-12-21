/*Screen to update the user*/
import React from 'react';
import { View, YellowBox, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'cars.db', createFromLocation : 1});
 
export default class OtomobilGuncelle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      marka: '',
      model: '',
      yıl: '',
      km:'',
      fiyat:''
    };
  }
  searchCar = () => {
    const {id} =this.state;
    console.log(this.state.id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM cars_table where id = ?',
        [id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len',len);
          if (len > 0) {
            console.log(results.rows.item(0).yıl);
            this.setState({
             marka:results.rows.item(0).marka,
            });
            this.setState({
             model:results.rows.item(0).model,
            });
            this.setState({
             yıl:results.rows.item(0).yıl,
            });
            this.setState({
              km:results.rows.item(0).km,
             });
             this.setState({
              fiyat:results.rows.item(0).fiyat,
             });
          }else{
            alert('No user found');
            this.setState({
              marka:'',
              model:'',
              yıl:'',
              km:'',
              fiyat:''
            });
          }
        }
      );
    });
  };
  updateCar = () => {
    var that=this;
    const { id } = this.state;
    const { model } = this.state;
    const { marka } = this.state;
    const { yıl } = this.state;
    const { km } = this.state;
    const { fiyat } = this.state;
    if (marka){
      if (model){
        if (yıl){
          if (km){
            if (fiyat){
          db.transaction((tx)=> {
            tx.executeSql(
              'UPDATE cars_table set marka=?, model=? , yıl=? , km=?, fiyat=? , where id=?',
              [marka, model, yıl, km, fiyat, id],
              (tx, results) => {
                console.log('Results',results.rowsAffected);
                if(results.rowsAffected>0){
                  Alert.alert( 'Başarılı', 'Car updated successfully',
                    [
                      {text: 'Ok', onPress: () => that.props.navigation.navigate('HomeScreen')},
                    ],
                    { cancelable: false }
                  );
                }else{
                  alert('Updation Failed');
                }
              }
            );
          });
        }else{
          alert('Fiyat Giriniz!');
        }
      }else{
        alert('Kilometre Giriniz!');
      }
    }else{
      alert('Yıl Giriniz');
    }
  }else{
    alert('Model Giriniz');
  }
}else{
  alert('Marka Giriniz');
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
              placeholder="Otomobil No. Gir"
              style={{ padding:10 }}
              onChangeText={id => this.setState({id })}
            />
            <Mybutton
              title="Otomobil Ara"
              customClick={this.searchCar.bind(this)}
            />
            <Mytextinput
              placeholder="Marka Gir"
              value={this.state.marka}
              style={{ padding:10 }}
              onChangeText={marka => this.setState({ marka })}
            />
            <Mytextinput
              placeholder="Model Gir"
              value={''+ this.state.model}
              onChangeText={model => this.setState({ model })}
             
              style={{ padding:10 }}
            
            />
            <Mytextinput
              value={this.state.yıl}
              placeholder="Yıl Gir"
              onChangeText={yıl => this.setState({ yıl })}
              keyboardType="numeric"
              
              style={{textAlignVertical : 'top', padding:10}}
            />
            <Mytextinput
              value={this.state.km}
              placeholder="Kilometre Gir"
              onChangeText={km => this.setState({ km })}
              
              style={{textAlignVertical : 'top', padding:10}}
            />
            <Mytextinput
              value={this.state.fiyat}
              placeholder="Fiyat Gir"
              onChangeText={fiyat => this.setState({ fiyat })}
             
              style={{textAlignVertical : 'top', padding:10}}
            />
            <Mybutton
              title="Otomobili Güncelle!"
              customClick={this.updateCar.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}