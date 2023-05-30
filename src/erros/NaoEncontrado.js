import ErroBase from "./ErrosBase.js";

class NaoEncontrado extends ErroBase {
	constructor(messagem = "Pag nao encotnrada"){
		super(messagem, 400);
	}
}

export default NaoEncontrado;