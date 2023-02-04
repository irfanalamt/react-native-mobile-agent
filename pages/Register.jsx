import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {SERVER_DOMAIN} from '@env';
import {validateEmail} from '../helpers/myFunctions';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function postToServer(data) {
    axios
      .post(SERVER_DOMAIN + '/register', data)
      .then((response) => {
        console.log('response', response.data);
      })
      .catch((err) => console.log('error', err));
  }

  function validateFields() {
    if (name.length < 3) {
      setError('Name must be at least 3 characters');
      return false;
    }

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setError('Email is not valid');
      return false;
    }

    if (address.length < 5) {
      setAddress('Address too short');
      return false;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return false;
    }

    setError('');
    return true;
  }

  function handleSubmit() {
    const isAllValid = validateFields();
    if (!isAllValid) return;

    postToServer({
      name,
      email,
      address,
      password,
    });
  }

  return (
    <View style={styles.page}>
      <View>
        <Text style={styles.registerText}>REGISTER</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder='Name'
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder='Email'
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder='Address'
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#EFF4F7',
    height: '100%',
    paddingHorizontal: 10,
  },
  card: {
    elevation: 2,
    backgroundColor: '#f3f7f9',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 4},
  },
  container: {
    marginTop: '20%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#4D7C96',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerText: {
    fontSize: 24,
    color: '#90B2D3',
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 30,
    fontFamily: 'monospace',
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
  },
});
