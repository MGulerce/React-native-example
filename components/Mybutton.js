/*Custom Button*/
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const Mybutton = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#151965',
    color: '#413c69',
    padding: 15,
    marginTop: 27,
    marginBottom: 5,
    marginLeft: 35,
    marginRight: 35,
  },
  text: {
    color: '#46b3e6',
  },
});
export default Mybutton;