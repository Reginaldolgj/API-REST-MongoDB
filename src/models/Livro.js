import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
	{
		id: {type: String},
		titulo: {
			type: String, 
			required: [true, "O titulo do livro é obrigatório" ]},
		autor: {
			type: mongoose.Schema.Types.ObjectId, 
			ref: "autores", 
			required: [true, "Autor obrigatório"]},
		editora: {
			type: String, 
			required: [true, "editora obrigatória"],
			enum:{ 
				values:["Casa do código", "Regis Editor"],
				message: "A editora '{VALUE}' não é um valor permitido"
			},
		},
		numeroPaginas: {
			type: Number,
			validate: {
				validator: (valor) => {
					return valor >= 10 && valor <= 5000;
				},
				message: "O número de página deve estar entre 10 e 5000 mil. Valor fornecido: {VALUE}"
			}
			// min: [10, "O número de página deve estar entre 10 e 5000 mil. Valor fornecido: {VALUE}"],
			// max: [5000, "O número de página deve estar entre 10 e 5000 mil. Valor fornecido: {VALUE}"],
		}
	}
);

const livros = mongoose.model("livros", livroSchema);

export default livros;