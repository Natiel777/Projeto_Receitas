import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { logger } from './Middlewares/logger.js';
import { tratarErros } from './Middlewares/tratarErros.js';
import usuarioRoutes from './Routes/usuario.js';
import receitasRoutes from './Routes/receitas.js';
import avaliarRoutes from './Routes/avaliar.js';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use('/uploads', express.static('uploads'));

app.use('/usuario', usuarioRoutes);
app.use('/receitas', receitasRoutes);
app.use('/avaliar', avaliarRoutes);
app.use(tratarErros);

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));