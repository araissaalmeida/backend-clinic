const express = require('express');
const app = express();
const PORT = 3000;
const atendimentoRoutes = require('./routes/atendimento');
app.use(express.json());

app.use('/atendimentos', atendimentoRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});