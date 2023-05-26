import autores from "../models/autor.js";

class AutorController {

	static listarAutores = async (req, res) => {
		try {
			const autoresResult = await autores.find();
			res.status(200).json(autoresResult);   
		} catch (error) {
			res.status(500).json({ message: ("erro interno")});
		}
	};

	static listarAutorPorId = async (req, res) => {
		try {
			const id = req.params.id;
    
			const autorResultado = await autores.findById(id);
    
			res.status(200).send(autorResultado);
		} catch (erro) {
			res.status(400).send({message: `${erro.message} - Id do Autor não localizado.`});
		}
	};

	static cadastrarAutor = async (req, res) => {
		try {
			let autor = new autores(req.body);
			const autorResultado = await autor.save();
    
			res.status(201).send(autorResultado.toJSON());
            
		} catch (error) {
			res.status(500).send({ message: `${error.message} - falha ao cadastrar Autor.` });
		}
	};


	static atualizarAutor = async  (req, res) => {
		try {
			const id = req.params.id;
			await autores.findByIdAndUpdate(id, {$set: req.body});
			res.status(200).send({ message: "autor atualizado com sucesso" });
		} catch (error) {
			res.status(500).send({ message: error.message });
		}

	};

	static excluirAutor = async (req, res) => {
		try {
			const id = req.params.id;
			await autores.findByIdAndDelete(id);
			res.status(200).send({ message: "Autor removido com sucesso!!!" });
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	};
}

export default AutorController;