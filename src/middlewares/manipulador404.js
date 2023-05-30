import NaoEncontrado from "../erros/NaoEncontrado.js";

function manipulador404(res, req, next) {
	const erro404 = new NaoEncontrado();
	next(erro404);
}
export default manipulador404;