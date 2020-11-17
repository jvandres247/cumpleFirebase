import React, {useEffect, useState} from 'react';
import {decode, encode} from 'base-64';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
  LogBox
} from 'react-native';
import firebase from './src/utils/firebase';
import 'firebase/auth';
import Auth from './src/components/Auth';
import ListBirthday from './src/components/ListBirthday';

if(!global.btoa) global.btoa = encode;
if(!global.atob) global.atob = decode;
LogBox.ignoreLogs(["Setting a timer for a long period"])

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
        {user ? <ListBirthday user={user}/> : <Auth />}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15212b',
    height: '100%',
  },
});
