const { Router } = require('express');
const TransacoesControlador = require('./controladores/transacoes');

const rotas = Router();

rotas.get('/transacoes', TransacoesControlador.listarTodas);

module.exports = rotas;
