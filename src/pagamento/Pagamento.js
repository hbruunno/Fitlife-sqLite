
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { getAlunos, atualizarAluno, limparPagamentos } from '../database/Database';
import AlunoPagamento from './AlunoPagamento';

export default function Pagamento() {
  const [lista, setLista] = useState([]);
  const [mostrarPagamentosPendentes, setMostrarPagamentosPendentes] = useState(true);

  // Função para atualizar um aluno no banco de dados
  const atualizarItem = async (key, alunoEditado) => {
    try {
      await atualizarAluno(key, alunoEditado); // Chama a função para atualizar o aluno no banco de dados
      setLista((prevLista) =>
        prevLista.map(item => item.id == key ? { ...item, ...alunoEditado } : item)
      );
      console.log("Item atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };

  // Função para buscar os alunos do banco de dados
  const buscarAlunos = async () => {
    try {
      const alunos = await getAlunos(); // Busca os alunos do banco de dados
      const sortedList = alunos
        .map(item => ({ ...item, key: item.id.toString() }))
        .sort((a, b) => a.nome.localeCompare(b.nome));
      setLista(sortedList);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }
  };

  // useEffect para buscar dados ao carregar a tela
  useEffect(() => {
    buscarAlunos();
  }, []);

  // Função para limpar os pagamentos no banco de dados
  const limparPagamentosBanco = async () => {
    try {
      await limparPagamentos(); // Chama a função para limpar os pagamentos no banco de dados
      setLista(prevLista => prevLista.map(item => ({ ...item, pagamento: false })));
      Alert.alert('Sucesso', 'A lista de pagamento foi limpa.');
    } catch (error) {
      console.error("Erro ao limpar pagamentos:", error);
      Alert.alert('Erro', 'Erro ao limpar pagamentos.');
    }
  };

  // Função para confirmar a limpeza dos pagamentos
  const apagarPagamentos = () => {
    Alert.alert(
      "Limpar dados de Pagamentos?",
      "Ao limpar os dados de pagamentos, não será possível reverter", 
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Continuar",
          onPress: confirmacaoLimparPagamentos
        }
      ],
      { cancelable: false }
    );
  };

  // Função para confirmar a ação de limpar todos os dados de pagamento
  const confirmacaoLimparPagamentos = () => {
    Alert.alert(
      "Confirmação:",
      "Deseja realmente limpar todos os dados de pagamentos?",
      [
        {
          text: "NÃO",
          style: "cancel"
        },
        {
          text: "SIM",
          onPress: limparPagamentosBanco
        }
      ],
      { cancelable: false }
    );
  };

  // Filtra a lista de alunos com base no status de pagamento
  const listaFiltrada = mostrarPagamentosPendentes
    ? lista.filter(item => !item.pagamento)
    : lista.filter(item => item.pagamento);

  return (
    <ImageBackground
      source={require('../img/fundo1.jpg')} // Caminho para sua imagem de fundo
      style={styles.background}
      imageStyle={{ opacity: 0.08 }} // Opacidade da imagem de fundo
    >
      <View style={styles.container}>
        <View style={styles.titulo}>
          <Text style={styles.texttitulo}>Pagamentos</Text>
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.textoswitch}>Pagamento Realizado</Text>
          <Switch
            value={mostrarPagamentosPendentes}
            onValueChange={setMostrarPagamentosPendentes} // Apenas atualiza o valor do Switch
            thumbColor="#1E4363"
            trackColor={{ false: '#247BA0', true: '#247BA0' }}
          />
          <Text style={styles.textoswitch}>Alunos a pagar</Text>
        </View>

        {!mostrarPagamentosPendentes && (
          <TouchableOpacity style={styles.button} onPress={apagarPagamentos}>
            <Text style={styles.buttonText}>Limpar Pagamentos</Text>
          </TouchableOpacity>
        )}

        <FlatList
          style={styles.flatlist}
          data={listaFiltrada}
          renderItem={({ item }) => (
            <View>
              <AlunoPagamento item={item} atualizarFuncao={atualizarItem} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
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
    width: '100%',
    alignItems: 'center',
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
  flatlist: {
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  textoswitch: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'grey'
  },
  button: {
    backgroundColor: '#1E4363',
    padding: 10,
    width: '30%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
