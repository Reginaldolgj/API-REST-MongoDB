import {autores, livros} from "../models/index.js";

class LivroController {

	static listarLivros = async (req, res, next) => {
		try{
			const buscaLivros = livros.find();
			req.resultado = buscaLivros;

			next();
		} catch (erro) {
			next(erro);
		}
	};

	static listarTodosLivros = (req, res) => {
		const id = req.params.id;

		livros.findById(id) 
			.populate("autor", "nome")
			.exec((err, livros) => {
				if (err) {
					res.status(400).send({ message: `Id do livro não localizado -> msg de erro: ${err.message}` });
				} else {
					res.status(200).send(livros);
				}
			});
	};

	static cadastrarLivro = (req, res) => {
		let livro = new livros(req.body);
		livro.save((err) => {
			if (err) {
				res.status(500).send({ message: `${err.message} - falha ao cadastrar livro.` });
			} else {
				res.status(201).send(livro.toJSON());
			}
		});
	};

	static atualizarLivro = (req, res) => {
		const id = req.params.id;
		livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
			if (!err) {
				res.status(200).send({ message: "livros atualizado com sucesso" });
			} else {
				res.status(500).send({ message: err.message });
			}
		});
	};

	static excluirLivro = (req, res) => {
		const id = req.params.id;
		livros.findByIdAndDelete(id, (err => {
			if (!err) {
				res.status(200).send({ message: "livro removido com sucesso!!!" });
			} else {
				res.status(500).send({ message: err.message });
			}
		}));
	};

	static listarLivroPorFiltro = async (req, res, next) => {
		try {
			const busca = await processaBusca(req.query);

			if(busca !== null) {
				const livrosResult = livros
					.find(busca)
					.populate("autor");

				req.resultado = livrosResult;
				next();
			} else {
				res.status(200).send([]);
			}
		} catch (error) {
			next(error);
		}
	};
}

async function processaBusca(parametros) {
	const {editora, titulo, minPaginas, maxPaginas, NomeAutor} = parametros;

	let busca = {};

	if(minPaginas || maxPaginas) busca.numeroPaginas = {};
	if(editora) busca.editora=editora;
	if(titulo) busca.titulo = { $regex: titulo, $options: "i" };
	if(minPaginas) busca.numeroPaginas.$gte = minPaginas;
	if(maxPaginas) busca.numeroPaginas.$lte =maxPaginas;
	if(NomeAutor) {
		const autor = await autores.findOne({ nome: NomeAutor});
		if( autor !== null){
			busca.autor = autor._id;
		} else {
			busca = null;
		}
	}

	return busca;
}

export default LivroController;