import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import firebase from '../utils/firebase';

export default function ActionBar(props) {
  const {showList, setShowList} = props;
  return (
    <View style={styles.viewFooter}>
      <View style={styles.viewClose}>
        <TouchableOpacity onPress={() => firebase.auth().signOut()}>
          <Text style={styles.text}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewAdd}>
        <TouchableOpacity onPress={() => setShowList(!showList)}>
          <Text style={styles.text}>{showList ? "Nueva Fecha" : "Cancelar Fecha"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewFooter: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  viewClose: {
    backgroundColor: '#820000',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  viewAdd: {
    backgroundColor: '#1ea1f2',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
});
