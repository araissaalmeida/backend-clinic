const express = require('express');
const app = express();
const PORT = 3000;


const dentistaRoutes = require("./routes/dentista");


const rotaProcedimentos = require('./routes/procedimentos.js');

const atendimentoRoutes = require('./routes/atendimento');

const rotaSecretaria = require("./routes/secretaria");


app.use(express.json());
app.use('/secretaria', rotaSecretaria);

app.use('/atendimentos', atendimentoRoutes);
app.use("/dentistas", dentistaRoutes);

app.use('/procedimentos', rotaProcedimentos);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});