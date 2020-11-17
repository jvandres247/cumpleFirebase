import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DatePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import firebase from '../utils/firebase';
import 'firebase/firestore';

firebase.firestore().settings({experimentalForceLongPolling: true})
const db = firebase.firestore(firebase);


export default function AddBirthday(props) {
  const {user, setShowList,setReloadData} = props;
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handlerConfirm = (date) => {
    const dateBirth = date;
    dateBirth.setHours(0);
    dateBirth.setMinutes(0);
    dateBirth.setSeconds(0);
    setFormData({...formData, dateBirth});
    hideDatePicker();
  };
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  const onSubmit = () => {
    let errors = {};
    if (!formData.name || !formData.lastName || !formData.dateBirth) {
      if (!formData.name) errors.name = true;
      if (!formData.lastName) errors.lastName = true;
      if (!formData.dateBirth) errors.dateBirth = true;
    } else {
      const data = formData;
      data.dateBirth.setYear(0);
      db.collection(user.uid)
        .add(data)
        .then(() => {
          setReloadData(true);
          setShowList(true);
        })
        .catch(() => {
          console.log("Nel")
          setFormError({name: true})
        })
    }
    setFormError(errors);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, formError.name && {borderColor: '#940c0c'}]}
          placeholder="Nombre"
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, 'name')}
        />
        <TextInput
          style={[styles.input, formError.lastName && {borderColor: '#940c0c'}]}
          placeholder="Apellidos"
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, 'lastName')}
        />
        <View style={[styles.input, styles.datePicker, formError.dateBirth && {borderColor: '#940c0c'}]}>
          <TouchableOpacity onPress={showDatePicker}>
            <Text
              style={{
                color: formData.dateBirth ? '#fff' : '#969696',
                fontSize: 18,
              }}>
              {formData.dateBirth
                ? moment(formData.dateBirth).format('LL')
                : 'Fecha de Nacimiento'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onSubmit}>
          <Text style={styles.addButton}>Añadir Cumpleaños</Text>
        </TouchableOpacity>
      </View>
      <DatePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handlerConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    color: '#fff',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#1e3040',
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1e3040',
  },
  datePicker: {
    justifyContent: 'center',
  },
  addButton: {
    fontSize: 18,
    color: '#fff',
  },
});
