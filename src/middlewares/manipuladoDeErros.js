import mongoose from "mongoose";
import ErroBase from "../erros/ErrosBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidate from "../erros/ErroValidate.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

// eslint-disable-next-line no-unused-vars
function manipuladoDeErros(erro, req, res, next) {
	console.error(erro);
	if(erro instanceof mongoose.Error.CastError) {
		new RequisicaoIncorreta().enviarResposta(res);
	} else if (erro instanceof mongoose.Error.ValidationError){
		new ErroValidate(erro);
	} else if(erro instanceof NaoEncontrado) {
		erro.enviarResposta(res);
	} else {
		new ErroBase().enviarResposta(res);
	}
}

export default manipuladoDeErros;