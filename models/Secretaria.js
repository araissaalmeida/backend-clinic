import mongoose from "mongoose";

const secretariaSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    nome: {type: String, required: true},
    cpf: {
        type: String,
        trim: true,
        match: [/^\d{11}$/, 'CPF da secretária deve conter 11 dígitos numéricos'],
    },
},{versionKey: false});

const secretaria = mongoose.model("secretarias", secretariaSchema);
export default secretaria;
