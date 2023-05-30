import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidate extends RequisicaoIncorreta {
	constructor(erro){
		const messagemErro = Object.values(erro.errors)
			.map(erro => erro.message)
			.join("; ");
		super(`Os seguintes erros foram encontrados:${messagemErro}`);
	}
}

export default ErroValidate;