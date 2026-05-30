import mongoose from 'mongoose';

const atendimentoSchema = new mongoose.Schema(
	{
		idAtendimento: {
			type: Number,
			required: true,
			unique: true,
			min: 1,
		},
		observacao: {
			type: String,
			trim: true,
			default: '',
		},
		data: {
			type: String,
			required: true,
			match: [/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD'],
		},
		valorTotal: {
			type: Number,
			required: true,
			min: 0,
		},
		tipoAtendimento: {
			type: String,
			required: true,
			enum: ['CLÍNICO'],
			uppercase: true,
			trim: true,
		},
		parcelas: {
			type: Number,
			required: true,
			min: 1,
		},
		fk_CPF_Paciente: {
			type: String,
			required: true,
			match: [/^\d{11}$/, 'CPF do paciente deve conter 11 dígitos numéricos'],
		},
		fk_CPF_Secretaria: {
			type: String,
			required: true,
			match: [/^\d{11}$/, 'CPF da secretária deve conter 11 dígitos numéricos'],
		},
		status: {
			type: String,
			required: true,
			enum: ['AGENDADO', 'CANCELADO', 'CONCLUIDO'],
			set: (value) =>
				String(value)
					.trim()
					.toUpperCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, ''),
		},
		horario_inicio: {
			type: String,
			required: true,
			match: [/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, 'Horário de início inválido'],
		},
		horario_fim: {
			type: String,
			required: true,
			match: [/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, 'Horário de fim inválido'],
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const atendimento = mongoose.model('Atendimento', atendimentoSchema);

export default atendimento;
