import mongoose from "mongoose";

const procedimentoSchema = new mongoose.Schema({
    descricao: { type: String, required: true, trim: true },
    tipoProcedimento: { type: String, required: true, trim: true },
    nome: { type: String, required: true, trim: true },
    valor: { type: Number, required: true, min: 0 }
}, { versionKey: false });

export const Procedimento = mongoose.model('Procedimento', procedimentoSchema);
export default Procedimento;
