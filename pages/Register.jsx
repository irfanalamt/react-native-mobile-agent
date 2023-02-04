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

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    axios
      .post(SERVER_DOMAIN + '/register', {
        name,
        email,
        address,
        password,
      })
      .then((response) => {
        console.log('response', response.data);
      })
      .catch((err) => console.log('error', err));
  }

  return (
    <View style={styles.page}>
      <View>
        <Text style={styles.registerText}>REGISTER</Text>
      </View>
      <View style={styles.container}>
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
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
  container: {
    marginTop: '30%',
    elevation: 2,
    backgroundColor: '#f3f7f9',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 4},
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
});
