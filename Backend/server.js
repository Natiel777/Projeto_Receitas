const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { logger } = require('./Middlewares/logger');
const { tratarErros } = require('./Middlewares/tratarErros');
const { cookieParser } = require('./Middlewares/auth');

const usuarioRoutes = require('./Routes/usuario');
const receitasRoutes = require('./Routes/receitas');
const avaliarRoutes = require('./Routes/avaliar');

const app = express();
app.use(cors({ origin:true, credentials:true }));
app.use(bodyParser.json());
app.use(logger);
app.use(cookieParser());

app.use('/usuario', usuarioRoutes);
app.use('/receitas', receitasRoutes);
app.use('/avaliar', avaliarRoutes);

app.use(tratarErros);

app.listen(3000, ()=>console.log('Servidor rodando na porta 3000'));