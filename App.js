import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import SplashPage from './src/containers/SplashPage';
import SignUp from './src/containers/Signup';
import Login from './src/containers/Login';
import Home from './src/containers/Home';
import OtomobilKaydet from './screens/OtomobilKaydet';
import OtomobilGuncelle from './screens/OtomobilGuncelle';
import HepsiniGoruntule from './screens/HepsiniGoruntule';
import OtomobilSil from './screens/OtomobilSil';
import AnaEkran from './screens/AnaEkran';
import OtomobilMarkaları from './screens/OtomobilMarkaları';

const App = createStackNavigator(
  {
    SplashPage: {
      screen: SplashPage,
      navigationOptions: {
        header: null,
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Home: {
      screen: AnaEkran,
      navigationOptions: {
        headerStyle: { backgroundColor: 'Transparent' },
        headerTransparent:'true',
        headerLeft:null
      },
    },
   
    All: {
      screen: HepsiniGoruntule,
      navigationOptions: {
        title: 'Bütün Otomobilleri Görüntüle',
        headerStyle:{backgroundColor:'#151965'},
        headerTintColor: '#46b3e6',
      },
    },
    Guncelle: {
      screen: OtomobilGuncelle,
      navigationOptions: {
        title: 'Otomobil Güncelle',
        headerStyle: { backgroundColor: '#151965' },
        headerTintColor: '#46b3e6',
      },
    },
    Kaydet: {
      screen: OtomobilKaydet,
      navigationOptions: {
        title: 'Otomobil Kaydet',
        headerStyle: { backgroundColor: '#151965' },
        headerTintColor: '#46b3e6',
      },
    },
    Sil: {
      screen: OtomobilSil,
      navigationOptions: {
        title: 'Otomobil Sil',
        headerStyle:{backgroundColor:'#151965'},
        headerTintColor: '#46b3e6',
      },
    },
    Markalar: {
      screen: OtomobilMarkaları,
      navigationOptions: {
        title:'Tüm Otomobil Markaları',
        headerStyle: {backgroundColor:'#151965'},
        headerTintColor: '#46b3e6',
      },
    },
  },
  {
    initialRouteName: 'SplashPage',
  },
);

export default createAppContainer(App);
