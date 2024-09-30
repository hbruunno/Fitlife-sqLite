import * as SQLite from 'expo-sqlite';


const openDatabase = async () => {
  return await SQLite.openDatabaseAsync('fitlife');
};


export const initDb = async () => {
  const db = await openDatabase(); 
  try {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS listaalunos (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      nome TEXT,
      nascimento TEXT,
      cpf TEXT UNIQUE,
      email TEXT,
      sexo TEXT,
      entrada TEXT,
      nota TEXT,
      telefone TEXT,
      pagamento BOOLEAN
    );`);
    console.log('Tabela listaalunos criada com sucesso');
  } catch (error) {
    console.log('Erro ao criar tabela', error);
  }
};


export const criarAluno = async (aluno) => {
  const db = await openDatabase(); 
  try {
    const result = await db.runAsync(
      `INSERT INTO listaalunos (nome, nascimento, cpf, email, sexo, entrada, nota, telefone, pagamento)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [aluno.nome, aluno.nascimento, aluno.cpf, aluno.email, aluno.sexo, aluno.entrada, aluno.nota, aluno.telefone, false]
    );
    console.log('Aluno inserido com sucesso com ID:', result.lastInsertRowId);
  } catch (error) {
    console.log('Erro ao cadastrar aluno', error);
  }
};


export const getAlunos = async () => {
  const db = await openDatabase(); 
  try {
    const allRows = await db.getAllAsync(`SELECT * FROM listaalunos`);
    return allRows;
  } catch (error) {
    console.log('Erro ao buscar alunos', error);
    return [];
  }
};


export const deletarAluno = async (id) => {
  const db = await openDatabase(); 
  try {
    await db.runAsync(`DELETE FROM listaalunos WHERE id = ?`, [id]);
    console.log(`Aluno com ID ${id} deletado com sucesso`);
  } catch (error) {
    console.log('Erro ao deletar aluno', error);
  }
};


export const atualizarAluno = async (id, aluno) => {
  const db = await openDatabase();
  try {
    await db.runAsync(
      `UPDATE listaalunos 
       SET nome = ?, nascimento = ?, cpf = ?, email = ?, sexo = ?, entrada = ?, nota = ?, telefone = ?, pagamento = ? 
       WHERE id = ?`,
      [aluno.nome, aluno.nascimento, aluno.cpf, aluno.email, aluno.sexo, aluno.entrada, aluno.nota, aluno.telefone, aluno.pagamento, id]
    );
    console.log(`Aluno com ID ${id} atualizado com sucesso`);
  } catch (error) {
    console.log('Erro ao atualizar aluno', error);
  }
};


export const limparPagamentos = async () => {
  const db = await openDatabase(); 
  try {
    await db.runAsync(`UPDATE listaalunos SET pagamento = false`);
    console.log('Pagamentos limpos com sucesso');
  } catch (error) {
    console.log('Erro ao limpar pagamentos', error);
  }
};