
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Alert, Text, Switch, ImageBackground } from 'react-native';
import Aluno from './Aluno';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { initDb, getAlunos, deletarAluno, atualizarAluno } from '../database/Database';

export default function ListarAluno() {
  const [lista, setLista] = useState([]);
  const navigation = useNavigation();
  const [valorLigado, setValorLigado] = useState(false);

  const carregarDados = async () => {
    try {
      const alunos = await getAlunos();
      let sortedData = alunos.map(item => ({ ...item, key: item.id.toString() }));
      if (valorLigado) {
        sortedData = sortedData.sort((a, b) => a.nome.localeCompare(b.nome));
      }
      setLista(sortedData);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  useEffect(() => {
    const initializeDatabase = async () => {
      await initDb();
      await carregarDados();
    };
    initializeDatabase();
  }, [valorLigado]);

  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  const confirmarDelecao = (key) => {
    Alert.alert(
      "Confirmação",
      "Deseja realmente apagar os dados do aluno?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deletarItem(key);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const deletarItem = (key) => {
    deletarAluno(key);
    setLista((prevLista) => prevLista.filter((item) => item.id != key));
    Alert.alert("Sucesso", "O aluno foi deletado com sucesso!", [
      { text: "OK", onPress: () => navigation.navigate('Home') }
    ]);
  };

  const atualizarItem = (key, alunoEditado) => {
    atualizarAluno(key, alunoEditado);
    setLista((prevLista) =>
      prevLista.map((item) =>
        item.id == key ? { ...item, ...alunoEditado } : item
      )
    );
  };

  return (
    <ImageBackground
      source={require('../img/fundo1.jpg')}
      style={styles.background}
      imageStyle={{ opacity: 0.08 }}
    >
      <View style={styles.container}>
        <View style={styles.titulo}>
          <Text style={styles.texttitulo}>Alunos Cadastrados</Text>
          <View style={styles.switchContainer}>
            <Text>Ordem de cadastro:</Text>
            <Switch
              value={valorLigado}
              onValueChange={(valor) => setValorLigado(valor)} // Atualiza o valor do Switch
              thumbColor="#1E4363"
              trackColor={{ false: '#247BA0', true: '#247BA0' }}
            />
            <Text>Ordem alfabética:</Text>
          </View>
        </View>
        <FlatList
          style={styles.flatlist}
          data={lista}
          renderItem={({ item }) => (
            <View>
              <Aluno props={item} funcao={confirmarDelecao} atualizarFuncao={atualizarItem} />
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  flatlist: {
    width: '100%',
    height: '100%',
    paddingTop: 20,
  },
  titulo: {
    marginTop: 25,
    width: '100%',
    height: '7%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  texttitulo: {
    fontWeight: 'bold',
    fontSize: 30,
    padding: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ajusta o espaçamento entre os textos e o Switch
    paddingTop: 20,
  },
});
