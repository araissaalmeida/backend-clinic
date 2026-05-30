import mongoose from "mongoose";

async function pool(){
    const connectionString = process.env.DB_CONNECTION_STRING;

    if (!connectionString) {
        throw new Error("A variável DB_CONNECTION_STRING não foi definida no .env");
    }

    await mongoose.connect(connectionString);
    return mongoose.connection;
};

export default pool;
