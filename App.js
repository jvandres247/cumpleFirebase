import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import firebase from './src/utils/firebase';
import "firebase/auth"

export default function App() {
  const [user, setUSer] = useState(undefined)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((response)=>
     setUSer(response)
    )
  }, [])

  if(user === undefined) return null;
  return (
    <SafeAreaView>
      {user ? <Text>Estas logeeado</Text> : <Text>No estas loggeado</Text>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
