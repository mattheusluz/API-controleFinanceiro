/* eslint-disable class-methods-use-this */
const knex = require('../conexaodb');
const schemaCadastrarTransacao = require('../validacoes/transacoes/cadastrarTransacoes');
const schemaEditarTransacao = require('../validacoes/transacoes/editarTransacoes');

class Transacoes {
  async listarTodas(req, res) {
    const { usuario } = req;
    try {
      const transacoes = await knex('transacoes').where({ usuario_id: usuario.id });

      return res.status(200).json(transacoes);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async obterTransacao(req, res) {
    const { usuario } = req;
    const { id } = req.params;
    try {
      const transacao = await knex('transacoes').where({ id, usuario_id: usuario.id }).first();

      if (!transacao) {
        return res.status(400).json({ erro: 'transação não encontrada' });
      }

      return res.status(200).json(transacao);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async cadastrarTransacao(req, res) {
    const { usuario } = req;
    const {
      tipo, valor, categoria, data, descricao,
    } = req.body;
    try {
      await schemaCadastrarTransacao.validate(req.body);

      const dataTransformada = new Date(data);

      const transacao = await knex('transacoes').insert({
        tipo, valor, categoria, data: dataTransformada, descricao, usuario_id: usuario.id,
      });

      if (!transacao) {
        return res.status(400).json({ erro: 'não foi possivel cadastrar a transação' });
      }

      return res.status(200).json({ mensagem: 'transação cadastrada com sucesso' });
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async editarTransacao(req, res) {
    const { usuario } = req;
    const { id } = req.params;
    const {
      tipo, valor, categoria, data, descricao,
    } = req.body;
    try {
      await schemaEditarTransacao.validate(req.body);

      const transacao = await knex('transacoes').update({
        tipo, valor, categoria, data, descricao,
      }).where({ id, usuario_id: usuario.id });

      if (!transacao) {
        return res.status(400).json({ erro: 'não foi possivel editar a transação' });
      }

      return res.status(200).json({ mensagem: 'transação editada com sucesso' });
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async excluirTransacao(req, res) {
    const { usuario } = req;
    const { id } = req.params;

    try {
      const transacao = await knex('transacoes').del().where({ id, usuario_id: usuario.id });

      if (!transacao) {
        return res.status(400).json({ erro: 'não foi possivel excluir a transação' });
      }

      return res.status(200).json({ mensagem: 'transacao excluída com suucesso' });
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }
}

module.exports = new Transacoes();
