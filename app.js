import express from "express";
import 'dotenv/config';
import pool from './config/dbConnect.js';
import atendimentoRoutes from './routes/atendimento.js';
import dentistaRoutes from './routes/dentista.js';
import rotaProcedimentos from './routes/procedimentos.js';
import rotaSecretaria from "./routes/secretaria.js";

const app = express();
const PORT = 3000;

const conexao = await pool();


conexao.on('error', console.error.bind(console, 'Erro de conexão:'));
conexao.once('open', () => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

app.use(express.json());
app.use('/secretaria', rotaSecretaria);

app.use('/atendimentos', atendimentoRoutes);
app.use("/dentistas", dentistaRoutes);

app.use('/procedimentos', rotaProcedimentos);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});