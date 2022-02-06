import MysqlDatabase from '../../infra/database/MysqlDatabase'

test('Deve conectar no banco de dados e listar usuários', async () =>{
  const connection = new MysqlDatabase();
  const users = await connection.selectMany('select * from tb_usuario', []);
  expect(users).toHaveLength(58);
});

test('Deve conectar no banco de dados e listar um usuário', async () =>{
  const connection = new MysqlDatabase();
  const user = await connection.selectOne('select * from `tb_usuario` where `id` = ?', [1]);
  expect(user).toHaveProperty('nome', 'Teste');
});