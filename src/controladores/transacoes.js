const knex = require('../conexaodb');

class TransacoesControlador {
  async listarTodas(req, res) {
    try {
      const transacoes = await knex('transacoes');

      return res.status(200).json(transacoes);
    } catch (error) {
      return res.status(400).json('Falha ao listar transações');
    }
  }
}

module.exports = TransacoesControlador;
