const express = require('express');
const app = express();
const PORT = 3000;
const rotaProcedimentos = require('./routes/procedimentos.js');

app.use(express.json());

app.use('/procedimentos', rotaProcedimentos);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});