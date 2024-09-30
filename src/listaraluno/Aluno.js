import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useState } from 'react';

export default function Aluno({props, funcao, atualizarFuncao}) {
  const [editando, setEditando] = useState(false);
  const [alunoEditado, setAlunoEditado] = useState(props);

  const handleAtualizar = () => {
    atualizarFuncao(props.id, alunoEditado);
    setEditando(false);
  };

  return (
    <View style={styles.container}>
      {editando ? (
        <View style={styles.editContainer}>
          <TextInput
            placeholder="Nome"
            value={alunoEditado.nome}
            onChangeText={(text) => setAlunoEditado({ ...alunoEditado, nome: text })}
          />
          <TextInput
            placeholder="Nascimento"
            value={alunoEditado.nascimento}
            onChangeText={(text) => setAlunoEditado({ ...alunoEditado, nascimento: text })}
          />
          <TextInput
            placeholder="CPF"
            value={alunoEditado.cpf}
            onChangeText={(text) => setAlunoEditado({ ...alunoEditado, cpf: text })}
          />
          <TextInput
            placeholder="Email"
            value={alunoEditado.email}
            onChangeText={(text) => setAlunoEditado({ ...alunoEditado, email: text })}
          />
          <TextInput
            placeholder="Sexo"
            value={alunoEditado.sexo}
            onChangeText={(text) => setAlunoEditado({ ...alunoEditado, sexo: text })}
          />
          <TextInput
            placeholder="Entrada"
            value={alunoEditado.entrada}
            onChangeText={(text) => setAlunoEditado({ ...alunoEditado, entrada: text })}
          />
          <TextInput
            placeholder="Nota"
            value={alunoEditado.nota}
            onChangeText={(text) => setAlunoEditado({ ...alunoEditado, nota: text })}
          />
          <TextInput
            placeholder="Telefone"
            value={alunoEditado.telefone}
            onChangeText={(text) => setAlunoEditado({ ...alunoEditado, telefone: text })}
          />
          <Button title="Atualizar" onPress={handleAtualizar} />
          <Button title="Cancelar" onPress={() => setEditando(false)} />
        </View>
      ) : (
        <>
          <View style={styles.info}>
            <Text>{props.nome}, Nascimento: {props.nascimento}, CPF: {props.cpf}, Tel: {props.telefone}, Email: {props.email}, Sexo: {props.sexo}, Entrou dia: {props.entrada}, Valor: {props.nota}</Text>
          </View>

          <View style={styles.icon}>
            <TouchableOpacity onPress={() => funcao(props.id)}>
              <Icon name='delete' size={30}/>        
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setEditando(true)}>
              <Icon name='form' size={30}/>        
            </TouchableOpacity>
          </View>
        </>
      )}
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
    width: "70%",
    justifyContent: 'space-around',
  },
  icon: {
    width: "30%",
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  editContainer: {
    width: '100%',
  },
});
