const express = require('express');
const app = express();
const PORT = 3000;

const dentistaRoutes = require("./routes/dentista");
app.use(express.json());
app.use("/dentistas", dentistaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});