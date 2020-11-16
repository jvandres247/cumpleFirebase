import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';
import firebase from './src/utils/firebase';
import 'firebase/auth';
import Auth from './src/components/Auth';
import ListBirthday from './src/components/ListBirthday';

export default function App() {
  const [user, setUSer] = useState(undefined);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => setUSer(response));
  }, []);

  if (user === undefined) return null;
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.background}>
        {user ? <ListBirthday/> : <Auth />}
      </SafeAreaView>
    </>
  );
}

function Logout() {
  const logout = () => {
    firebase.auth().signOut();
  }
  return (
    <View>
      <Button title={'Cerrar Sesion'} onPress={logout}/>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15212b',
    height: '100%',
  },
});
