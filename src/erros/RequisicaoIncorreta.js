import ErroBase from "./ErrosBase.js";

class RequisicaoIncorreta extends ErroBase{
	constructor(mensagem = "Um ou mais dados forncidos estão incorretos") {
		super(mensagem, 400);
	}
}

export default RequisicaoIncorreta;