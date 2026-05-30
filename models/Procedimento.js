import mongoose from "mongoose";

const procedimentoSchema = new mongoose.Schema({
    idProcedimento: { type: Number, unique: true, sparse: true },
    descricao: { type: String, required: true, trim: true },
    tipoProcedimento: { type: String, required: true, trim: true },
    nome: { type: String, required: true, trim: true },
    valor: { type: Number, required: true, min: 0 }
}, { versionKey: false });

const Procedimento = mongoose.model("Procedimento", procedimentoSchema, "procedimento");

export default Procedimento;
