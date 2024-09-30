import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native'; // Importando o useFocusEffect
import { getAlunos, initDb } from '../database/Database';

export default function Inicio() {
  const [lista, setLista] = useState([]);
  const [novosCadastros, setNovosCadastros] = useState(0);
  const [totalRendimento, setTotalRendimento] = useState(0);

  // Função para buscar os alunos do banco de dados
  const buscarAlunos = async () => {
    try {
      const alunos = await getAlunos(); // Busca os alunos do banco de dados
      const listaAlunos = alunos.map((item) => ({
        ...item,
        key: item.id.toString(),
        nota: parseFloat(item.nota.replace(',', '.')), // Converte nota de string para número
      }));
      setLista(listaAlunos); // Atualiza a lista de alunos
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };

  // useFocusEffect para buscar os dados toda vez que a tela for acessada
  useFocusEffect(
    useCallback(() => {
      buscarAlunos();
    }, [])
  );

  useEffect(() => {
    const initializeDatabase = async () => {
      await initDb(); // Cria o banco de dados
      await buscarAlunos(); // Busca os alunos após a inicialização do banco
    };
    initializeDatabase();
  }, []);

  // useEffect para calcular os novos cadastros e o rendimento total
  useEffect(() => {
    const hoje = moment();
    const cadastrosRecentes = lista.filter((item) => {
      const dataCadastro = item.entrada;
      const dataCadastroNumerica = formatarDataNumerica(dataCadastro);

      if (!dataCadastroNumerica) return false;
      const diffDays = hoje.diff(dataCadastroNumerica, 'days');
      return diffDays <= 7 && diffDays >= 0;
    });

    setNovosCadastros(cadastrosRecentes.length);

    const rendimentoTotal = lista.reduce((total, item) => total + item.nota, 0);
    setTotalRendimento(rendimentoTotal);
  }, [lista]);

  // Função para formatar a data
  const formatarDataNumerica = (dataCadastro) => {
    if (/^\d{2}[\.-]\d{2}[\.-]\d{4}$/.test(dataCadastro)) {
      const [dia, mes, ano] = dataCadastro.split(/[\.-]/);
      return moment(`${ano}-${mes}-${dia}`, 'YYYY-MM-DD');
    }
    return null;
  };

  return (
    <ImageBackground
      source={require('../img/fundo1.jpg')} // Caminho para a imagem de fundo
      style={styles.background}
      imageStyle={{ opacity: 0.08 }} // Opacidade da imagem de fundo
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo ao FitLife</Text>
        <View style={styles.widget}>
          <Text style={styles.txtoWid}>Total de Alunos: {lista.length}</Text>
        </View>
        <View style={styles.widget}>
          <Text style={styles.txtoWid}>Novos alunos nos últimos 7 dias: {novosCadastros}</Text>
        </View>
        <View style={styles.widget}>
          <Text style={styles.txtoWid}>Total de rendimento: R$ {totalRendimento.toFixed(2)}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  widget: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  }, 
  txtoWid: {
    fontSize: 20,
    padding: 15,
    color: '#666666',
  },
});
