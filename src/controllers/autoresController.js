import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores} from "../models/index.js";

class AutorController {

	static listarAutores = async (req, res, next) => {
		try {
			const autoresResult = autores.find();
			req.resultado = autoresResult;
			next();
		} catch (error) {
			next(error);
		}
	};

	static listarAutorPorId = async (req, res, next) => {
		try {
			const id = req.params.id;
    
			const autorResultado = await autores.findById(id);
			if(autorResultado !== null){
				res.status(200).send(autorResultado);
			} else {
				next(new NaoEncontrado("Id do autor não encontrado."));
			}
		} catch (erro) {
			next(erro);
		}
	};

	static cadastrarAutor = async (req, res, next) => {
		try {
			let autor = new autores(req.body);
			const autorResultado = await autor.save();
    
			res.status(201).send(autorResultado.toJSON());
            
		} catch (error) {
			next(error);
		}
	};


	static atualizarAutor = async  (req, res, next) => {
		try {
			const id = req.params.id;
			const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});
			if(autorResultado !== null){
				res.status(200).send({ message: "autor atualizado com sucesso" });
			} else {
				next(new NaoEncontrado("Id do Autor não encontrado"));
			}

		} catch (error) {
			next(error);
		}

	};

	static excluirAutor = async (req, res, next) => {
		try {
			const id = req.params.id;
			await autores.findByIdAndDelete(id);
			const autorResultado = res.status(200).send({ message: "Autor removido com sucesso!!!" });
			if(autorResultado !== null){
				res.status(200).send({message: "autor removido com sucesso"});
			} else {
				next(new NaoEncontrado("Id do autor não encontrado"));
			}
		} catch (error) {
			next(error);
		}
	};
}

export default AutorController;