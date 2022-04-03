/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');
const knex = require('../conexaodb');

class Filtros {
  async verificaLogin(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(404).json({ erro: 'Token não informado.' });
    }

    try {
      const token = authorization.replace('Bearer', '').trim();

      const { id } = jwt.verify(token, process.env.SEGREDO_LOGIN);

      const usuarioEncontrado = await knex('usuarios').where({ id }).first();

      if (!usuarioEncontrado) {
        return res.status(404).json({ erro: 'usuário não encontrado.' });
      }

      const { senha, ...usuario } = usuarioEncontrado;

      req.usuario = usuario;

      next();
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }
}
module.exports = new Filtros();
