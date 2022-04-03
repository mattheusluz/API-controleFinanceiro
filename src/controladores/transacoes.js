const knex = require('../conexaodb');
const schemaCadastroTransacao = require('../validacoes/transacoes/cadastroTransacoes');

class Transacoes {
  // eslint-disable-next-line class-methods-use-this
  async listarTodas(req, res) {
    const { usuario } = req;
    try {
      const transacoes = await knex('transacoes').where({ usuario_id: usuario.id });

      return res.status(200).json(transacoes);
    } catch (error) {
      return res.status(400).json('Falha ao listar transações');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async cadastrarTransacao(req, res) {
    const { usuario } = req;
    const {
      tipo, valor, categoria, data, descricao,
    } = req.body;
    try {
      await schemaCadastroTransacao.validate(req.body);

      const transacao = await knex('transacoes').insert({
        tipo, valor, categoria, data, descricao, usuario_id: usuario.id,
      });

      if (!transacao) {
        return res.status(400).json({ erro: 'não foi possivel cadastrar a transação' });
      }

      return res.status(200).json({ mensagem: 'transação cadastrada com sucesso' });
    } catch (error) {
      return res.status(400).json('Falha ao cadastrar transação');
    }
  }
}

module.exports = new Transacoes();
