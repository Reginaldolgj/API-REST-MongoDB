import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladoDeErros(erro, req, res, next) {
	console.error(erro);
	if(erro instanceof mongoose.Error.CastError) {
		res.status(404).send({ message: "Um ou mais dados estão incorretos"});
	} else if (erro instanceof mongoose.Error.ValidationError){
		const messagemErro = Object.values(erro.errors)
			.map(erro => erro.message)
			.join("; ");
		res.status(400).send({message: `Os seguintes erros foram encontrados:${messagemErro}`});
	} else {
		res.status(500).send({message: "Erro interno do servidor"});
	}
}

export default manipuladoDeErros;