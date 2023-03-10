import axios from 'axios';
import {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import {SERVER_DOMAIN} from '@env';
import jwt_decode from 'jwt-decode';
import {validateEmail} from '../helpers/myFunctions';

const LoginPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function postToServer(data) {
    axios
      .post(SERVER_DOMAIN + '/login', data)
      .then((response) => {
        console.log(response.data);
        const decoded = jwt_decode(response.data.jwt);

        console.log(decoded);
      })
      .catch((error) => {
        const errorMessage = error.response.data.error;
        console.log(errorMessage);
        setError(errorMessage);
      });
  }

  function handleLogin() {
    const isAllValid = validateFields();
    if (!isAllValid) return;

    postToServer({username: email, password: password});

    return;

    navigation.navigate('Home');

    if (email == 1234) {
      setError('Login failed. Please try again.');
      return;
    }

    setError('');
  }

  function validateFields() {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setError('Email is not valid');
      return false;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return false;
    }

    setError('');
    return true;
  }

  function handleRegister() {
    navigation.navigate('Register');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView>
        <View style={styles.middleContainer}>
          <Text style={styles.nameHeading}>BCX mobile</Text>

          <View style={styles.card}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder='Email'
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                value={password}
                onChangeText={setPassword}
                placeholder='Password'
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                activeOpacity={0.8}
                underlayColor='#738ea8'
                style={styles.loginButton}
                onPress={handleLogin}>
                <Text style={styles.loginButtonText}>LOGIN</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <Text style={styles.errorText}>{error}</Text>
      </KeyboardAvoidingView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>FORGOT PASSWORD</Text>
        </TouchableOpacity>
        <Text style={{color: '#24354D'}}>/</Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.createAccountText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF4F7',
    paddingHorizontal: 10,
  },
  nameHeading: {
    fontSize: 24,
    color: '#24354D',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'monospace',
    padding: 5,
  },
  inputContainer: {
    margin: 10,
  },
  inputLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#24354D',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
  },
  buttonContainer: {
    margin: 16,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#90B2D3',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#EFF4F7',
    fontWeight: 'bold',
    fontSize: 17,
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 20,
  },
  forgotPasswordText: {
    color: '#4D7C96',
    paddingHorizontal: 5,
  },
  createAccountText: {
    color: '#4D7C96',
    paddingHorizontal: 5,
  },
  middleContainer: {marginTop: '35%'},
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
});
