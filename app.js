import 'dotenv/config';
import express from 'express';
import pool from './config/dbConnect.js';

import dentistaRoutes from './routes/dentista.js';
import rotaProcedimentos from './routes/procedimentos.js';
import atendimentoRoutes from './routes/atendimento.js';
import rotaSecretaria from './routes/secretaria.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/secretaria', rotaSecretaria);
app.use('/atendimentos', atendimentoRoutes);
app.use('/procedimentos', rotaProcedimentos);
app.use("/dentistas", dentistaRoutes);


pool()
    .then(() => {
        console.log("Conectado ao MongoDB com sucesso!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Erro ao conectar no MongoDB:", error);
    });