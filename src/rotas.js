const { Router } = require('express');
const Transacoes = require('./controladores/transacoes');
const Usuarios = require('./controladores/usuarios');

const rotas = Router();

rotas.post('/usuarios', Usuarios.cadastrarUsuario);

rotas.get('/transacoes', Transacoes.listarTodas);

module.exports = rotas;
