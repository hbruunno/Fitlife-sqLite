import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logotipo from '../img/Logotipo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email === 'ufal' && password === '12345') {
      navigation.navigate('Main');
    } else {
      Alert.alert('Erro', 'Email ou senha incorretos, revise os dados e tente novamente');
    }
  };

  return (
    <View style={styles.container}>

      <Logotipo/>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        id='nome'
        name='nome'
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        id='senha'
        name='senha'
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text>email use 'ufal' senha use '12345'</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: '#247BA0',
    borderRadius: 15,
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '90%',
    height: 50,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#247BA0',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '40%',
    height: 45,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
