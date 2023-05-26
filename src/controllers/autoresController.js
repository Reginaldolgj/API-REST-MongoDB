import autores from "../models/autor.js";

class AutorController {

	static listarAutores = async (req, res, next) => {
		try {
			const autoresResult = await autores.find();
			res.status(200).json(autoresResult);   
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
				res.status(404).send({ message: "Id do Autor não encontrado!"});
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
			await autores.findByIdAndUpdate(id, {$set: req.body});
			res.status(200).send({ message: "autor atualizado com sucesso" });
		} catch (error) {
			next(error);
		}

	};

	static excluirAutor = async (req, res, next) => {
		try {
			const id = req.params.id;
			await autores.findByIdAndDelete(id);
			res.status(200).send({ message: "Autor removido com sucesso!!!" });
		} catch (error) {
			next(error);
		}
	};
}

export default AutorController;