import mongoose from 'mongoose';

const dentistaSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    required: true
  },
  nome: { 
    type: String, 
    required: true 
  },
  CRO: { 
    type: String, 
    required: true, 
    unique: true 
  },
  croUF: { 
    type: String, 
    required: true 
  },
  especialidade: { 
    type: String, 
    required: true 
  }
}, { 
  versionKey: false 
});

export default mongoose.model('Dentista', dentistaSchema);