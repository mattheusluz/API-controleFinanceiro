const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../conexaodb');
const schemaCadastrarUsuario = require('../validacoes/usuarios/cadastrarUsuarios');
const schemaLogin = require('../validacoes/usuarios/login');

class Usuarios {
  // eslint-disable-next-line class-methods-use-this
  async cadastrarUsuario(req, res) {
    const { nome, email, senha } = req.body;
    try {
      await schemaCadastrarUsuario.validate(req.body);

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

  // eslint-disable-next-line class-methods-use-this
  async login(req, res) {
    const { senha, email } = req.body;

    try {
      await schemaLogin.validate(req.body);

      const usuario = await knex('usuarios').where({ email }).first();

      if (!usuario) {
        return res.status(400).json({ erro: 'email e/ou senha incorretos' });
      }

      const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

      if (!senhaVerificada) {
        return res.status(400).json({ erro: 'email e/ou senha incorretos' });
      }

      const token = jwt.sign({ id: usuario.id }, process.env.SEGREDO_LOGIN);

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }
}

module.exports = new Usuarios();
