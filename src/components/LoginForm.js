import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function LoginForm(props) {
  const {changeForm} = props;
  return (
    <View>
      <Text>login form</Text>
      <TouchableOpacity onPress={changeForm}>
        <Text style={styles.btnText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    btnText: {
        color: '#fff',
        fontSize: 18
    }
});
