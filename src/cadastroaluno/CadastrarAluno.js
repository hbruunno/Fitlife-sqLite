import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { criarAluno, initDb } from '../database/Database';
import { TextInputMask } from 'react-native-masked-text';


export default function CadastrarAluno() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [sexo, setSexo] = useState('');
  const [observacao, setObservacao] = useState('');
  const [email, setEmail] = useState('');
  const [entrada, setEntrada] = useState('');

  const navigation = useNavigation();
  useEffect(() => {
    const initializeDatabase = async () => {
      await initDb(); // Cria o banco de dados
     };
      initializeDatabase();
    }, []);
  const cadastrarDados = () => {

    
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!nome || !dataNascimento || !cpf || !entrada || !telefone) {
      Alert.alert(
        'Campos Obrigatórios',
        'Por favor, preencha todos os campos obrigatórios.',
        [{ text: 'OK', onPress: () => console.log('Alertando sobre campos obrigatórios') }],
        { cancelable: false }
      );
      return;
    }

    const novoCadastro = {
      nome,
      nascimento: dataNascimento,  
      cpf,
      email,
      sexo,
      entrada,
      nota: observacao,
      telefone,
    };

    // Chama a função para cadastrar o aluno no SQLite
    criarAluno(novoCadastro)
      .then(() => {
        Alert.alert(
          'Sucesso',
          'Aluno cadastrado com sucesso!',
          [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
        );

        // Limpa os campos do formulário após o cadastro ser realizado
        setNome('');
        setDataNascimento('');
        setCpf('');
        setEmail('');
        setSexo('');
        setEntrada('');
        setObservacao('');
        setTelefone('');
      })
      .catch(error => {
        console.error("Erro ao cadastrar:", error);
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o aluno.');
      });
  };

  return (
    <ImageBackground
      source={require('../img/fundo1.jpg')} // Caminho para sua imagem de fundo
      style={styles.background}
      imageStyle={{ opacity: 0.08 }} // Opacidade da imagem de fundo
    >
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.texttitulo} >Cadastrar Novo Aluno</Text>
      </View>

      <View style={styles.container2}>

      
      
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <TextInputMask
        type={'datetime'}
        options={{
          format: 'DD-MM-AAAA',
        }}
        placeholder="Data de Nascimento"
        style={styles.input}
        value={dataNascimento}
        onChangeText={setDataNascimento}
        keyboardType="numeric"
      />
      <TextInputMask
        type={'cpf'}
        placeholder="CPF"
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Telefone"
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInputMask
      type={'datetime'}
      options={{
        format: 'DD-MM-AAAA',
      }}
        placeholder="Data de entrada"
        style={styles.input}
        value={entrada}
        onChangeText={setEntrada}
        keyboardType="numeric"
      />
      <Text style={styles.textosexo}>Sexo:</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioOption, sexo === 'M' && styles.selectedOption]}
          onPress={() => setSexo('M')}
        >
          <Text>M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioOption, sexo === 'F' && styles.selectedOption]}
          onPress={() => setSexo('F')}
        >
          <Text>F</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Valor: R$"
        style={styles.input}
        value={observacao}
        onChangeText={setObservacao}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={cadastrarDados}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Cobrir toda a área disponível
    justifyContent: 'center', // Centralizar conteúdo na vertical
  },
  container: {
    flex: 1,
    paddingTop: 40,
    
  },
  container2:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    color: '#247BA0',
    paddingTop: 30,

  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#247BA0',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#247BA0',
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  radioOption: {
    borderWidth: 1,
    borderColor: '#247BA0',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  selectedOption: {
    backgroundColor: '#1E4363',
    color: '#247BA0',
  },
  button: {
    backgroundColor: '#1E4363',
    width: '80%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  textosexo: {
    color: '#247BA0',
  },
  imagem: {
    width: '80%',
    height: 80,
    marginBottom: 40,
  },
  titulo: {
    marginTop: 20,
  //  backgroundColor: '#247BA0',
    width: '100%',
    height: '7%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texttitulo: {
    fontWeight: 'bold',
    fontSize: 30,    
    padding: 5,
  }
});
