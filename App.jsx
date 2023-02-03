import {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

export default function App() {
  const [agentId, setAgentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    console.log('agentID', agentId);
    if (agentId == 1234) {
      setError('Login failed. Please try again.');
      return;
    }

    setError('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.nameHeading}>BCX android</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Agent ID</Text>
        <TextInput
          style={styles.textInput}
          value={agentId}
          onChangeText={setAgentId}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
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
      {error && <Text style={styles.errorText}>{error}</Text>}
    </SafeAreaView>
  );
}

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
    textAlign: 'left',
    marginTop: StatusBar.currentHeight,
    marginBottom: 30,
    fontFamily: 'monospace',
    padding: 5,
  },
  inputContainer: {
    margin: 16,
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
    paddingVertical: 15,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#EFF4F7',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
});
