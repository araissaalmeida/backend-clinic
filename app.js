const express = require('express');
const app = express();
const PORT = 3000;
const atendimentoRoutes = require('./routes/atendimento');

const rotaSecretaria = require("./routes/secretaria");

app.use(express.json());
app.use('/secretaria', rotaSecretaria);

app.use('/atendimentos', atendimentoRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});