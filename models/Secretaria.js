import mongoose from "mongoose";

const secretariaSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    nome: {type: String, required: true},
},{versionKey: false});

const secretaria = mongoose.model("secretarias", secretariaSchema);
export default secretaria;
