const jwt       			= require('jsonwebtoken');
const Animal 				= require('../models/animal');
const { objectHasValues } 	= require('../utils');
const config 				= require('../config');

module.exports = (app, express) => {

    const apiRouter = express.Router();

	// Middleware de acesso por token (fake apenas para simular)
	
    apiRouter.use( (req, res, next) => {
		// Trava de token
		if( config.noToken ) {
			next();
			return;
		}

        const token = req.headers['x-access-token'];
        if(token){
			// vVerifica se token está valido
			jwt.verify(token, config.superSecret, (err, decoded) => {
				if(err){
					console.log('err ' + err);
					res.status(403).send({
						success: false,
						message: 'Failed to authenticate token.'
					});
				} else{
                    //Adiciona payload para objeto req, caso seja necessário id do usuario logado e afins
					req.decoded = decoded;
					next();
				}
			});
		} else {
			res.status(403).send({
				success: false,
				message: 'No token found'
			});
		}
    });


	// ===== ROTAS ======
	apiRouter.get('/animal', getAllAnimals);
	apiRouter.get('/animal/:id', getAnimal);
	apiRouter.get('/animal/search/:nome', searchAnimal);
	apiRouter.post('/animal', createAnimal);
	apiRouter.put('/animal/:id', updateAnimal);
	apiRouter.delete('/animal/:id', deleteAnimal);

	return apiRouter
}

/**
 * Retorna todos os registros da collection animals
 * @param {Request} req 
 * @param {Response} res 
 */
const getAllAnimals = async (req, res) => {
	try{
		const animals = await Animal.find().lean();
		res.json({
			success: true,
			data: animals
		})
	}catch(err){
		console.log(err);
		res.status(500).json({
			success: false,
			message: err.message
		});
	}
}

/**
 * Retorna um animal específico
 * @param {Request} req 
 * @param {Response} res 
 */
const getAnimal = async (req, res) => {
	try{
		// ========== VALIDAÇÂO ==========
		// Checa se ID foi fornecido
		const { id } = req.params;
		if(!id) throw new Error('No [id] supplied to get');
		// ========= \ VALIDAÇÂO =========

		const animal = await Animal.findById(id).lean();
		res.json({
			success: true,
			data: animal
		})
	}catch(err){
		console.log(err);
		res.status(500).json({
			success: false,
			message: err.message
		});
	}
}

/**
 * Busca animais por nome
 * @param {Request} req 
 * @param {Reponse} res 
 */
const searchAnimal = async (req, res) => {
	try{
		// ========== VALIDAÇÂO ==========
		// Checa se ID foi fornecido
		const { nome } = req.params;
		if(!nome) throw new Error('No [nome] supplied to search');
		// ========= \ VALIDAÇÂO =========
		const searchRegExp = new RegExp(nome, 'gi');
		const animals = await Animal.find({ nome: searchRegExp }).lean();
		res.json({
			success: true,
			data: animals
		})
	}catch(err){
		console.log(err);
		res.status(500).json({
			success: false,
			message: err.message
		});
	}
}

/**
 * Cria um novo animal na base
 * @param {Request} req 
 * @param {Response} res 
 */
const createAnimal = async (req, res) => {
	try{
		const { nome, peso, idade, tipo } = req.body;
		// ====== VALIDAÇÃO ======
		// Nenhuma validação manual requerida até o momento

		// A própria lib fará o tratamento necessário dos dados
		const animal = new Animal({ nome, peso, idade, tipo });
		// Se todos os parametros estiverem de acordo, o mesmo será inserido
		await animal.save();

		res.json({
			success: true,
			data: animal
		});
	}catch(err){
		console.log(err);
		res.status(500).json({
			success: false,
			message: err.message
		});
	}
}

/**
 * Altera um animal existente
 * @param {Request} req 
 * @param {Response} res 
 */
const updateAnimal = async (req, res) => {
	try{
		// ========== VALIDAÇÂO ==========
		// Checa se ID foi fornecido
		const { id } = req.params;
		if(!id) throw new Error('No [id] supplied to update');
		// Checa se não há valores para serem alterados
		const changes = req.body;
		if(!objectHasValues(changes)) throw new Error('No info to change');
		// Checa existencia do animal
		const animal = await Animal.findById(id);
		if(!animal) throw new Error(`No animal found with id (${id})`);
		// Checa se há alteração de nome. O memso não é permitido
		if(changes.nome) throw new Error('Animal validation failed: You can\'t change property `nome` of Animal ')
		// Checa TIPO manualmente
		if(changes.tipo && !Animal.TIPOS.includes(changes.tipo)) throw new Error(`Animal validation failed: tipo: \`${changes.tipo}\` is not a valid enum value for path \`tipo\`.`);
		// ========= \ VALIDAÇÂO =========

		// Altera de fato
		const updatedAnimal = await Animal.findByIdAndUpdate(id, changes, {new: true});
		
		res.json({
			success: true,
			data: updatedAnimal
		});

	}catch(err){
		console.log(err);
		res.status(500).json({
			success: false,
			message: err.message
		});
	}
}

/**
 * Exclui um animal por ID
 * @param {Request} req 
 * @param {Response} res 
 */
const deleteAnimal = async (req, res) => {
	try{
		// ========== VALIDAÇÂO ==========
		// Checa se ID foi fornecido
		const { id } = req.params;
		if(!id) throw new Error('No [id] supplied to delete');
		// ========= \ VALIDAÇÂO =========
		const deletedAnimal = await Animal.findByIdAndDelete(id);
		res.json({
			success: true, 
			data: deletedAnimal,
			message: deletedAnimal ? 'Animal deleted' : `No animal found with id (${id})`
		});		
	}catch(err){
		console.log(err);
		res.status(500).json({
			success: false,
			message: err.message
		});
	}
}