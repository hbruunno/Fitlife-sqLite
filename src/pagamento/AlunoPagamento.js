import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function AlunoPagamento({ item, atualizarFuncao }) {
  const [alunoEditado, setAlunoEditado] = useState(item);

  const funcao = () => {
    Alert.alert(
      "Confirmação",
      `Deseja confirmar o pagamento do aluno ${item.nome} ?`,
      [
        { text: "NÃO", style: "cancel" },
        {
          text: "SIM",
          onPress: () => {
            const alunoAtualizado = { ...alunoEditado, pagamento: true };
            setAlunoEditado(alunoAtualizado);
            atualizarFuncao(item.id, alunoAtualizado); // Passar argumentos
          },
        },
      ],
      { cancelable: false }
    );
  };

  const getDay = (fullDate) => {
    if (!fullDate) return ''; // Verifica se fullDate é nulo ou indefinido
    const datePart = fullDate.split(' ')[0].replace(/-/g, '.'); // Pega a primeira parte da string até o espaço
    const day = datePart.split('.')[0]; // Pega a primeira parte da data até o ponto
    return day;
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.nomeinfo}>
          {item.nome}
        </Text>
        <Text  style={styles.vencimentoinfo}>
          Dia do Vencimento: {getDay(item.entrada)}
        </Text>
        <Text style={styles.valorinfo}>
           Valor: {item.nota}
        </Text>
      </View>
      <View style={styles.icon}>
        {!alunoEditado.pagamento && (
          <TouchableOpacity style={styles.botao} onPress={funcao}>
            <Text style={styles.textobotao}>Confirmar Pagamento?</Text>
            <Icon style={styles.textobotao} name='checkcircleo' size={20} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row'
  },
  info: {
    width: "75%",
    justifyContent: 'space-around',
  },
  icon: {
    width: "25%",
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  botao: {
    width: 100,
    height: 40,
    justifyContent: 'space-around',
    backgroundColor: '#1E4363',
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 10, // Tamanho da sombra
    shadowOpacity: 0.5
  },
  textobotao: {
    color: "white",
  },
  nomeinfo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "#1E4363",
  },
  vencimentoinfo: {
    color: '#3B82F6'
  },
  valorinfo: {
    color: '#F59E0B'
  }
});


