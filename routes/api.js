const Animal = require('../models/animal');
const config = require('../config');

module.exports = (app, express) => {

    const apiRouter = express.Router();

	// Middleware de acesso por token (fake apenas para simular)
	/*
    apiRouter.use( (req, res, next) => {
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

*/
	// ROTAS
    apiRouter.get('/animal', async (req, res) => {
		try{
			const animals = await Animal.find({});
			res.json({
				success: true,
				animals
			})
		}catch(err){
			console.log(err);
			res.status(500).json({
				success: false,
				message: err.message
			})
		}
		
	});
    

    return apiRouter
}
