const bcrypt = require('bcrypt');
const knex = require('../conexaodb');
const schemaCadastroUsuario = require('../validacoes/usuarios/cadastroUsuarios');

class Usuarios {
  // eslint-disable-next-line class-methods-use-this
  async cadastrarUsuario(req, res) {
    const { nome, email, senha } = req.body;
    try {
      await schemaCadastroUsuario.validate(req.body);

      const emailEmUso = await knex('usuarios').where({ email }).first();

      if (emailEmUso) {
        return res.status(400).json({ erro: 'Email informado ja está cadastrado no sistema' });
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const usuarioCadastrado = await knex('usuarios').insert({ nome, email, senha: senhaCriptografada });

      if (!usuarioCadastrado) {
        return res.status(400).json({ erro: 'não foi possível cadastrar o usuário' });
      }

      return res.status(201).json({ mensagem: 'usuário cadastrado com sucesso' });
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }
}

module.exports = new Usuarios();
