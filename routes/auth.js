const jwt       = require('jsonwebtoken');
const config    = require('../config');

module.exports = (app, express) => {

    const apiRouter = express.Router();

    // Rota para gerar token de acesso a api (fake)
    apiRouter.post('/generate-token', (req, res) => {
        const {login, pwd} = req.body;
        // Para simplificar, apenas uma simulação. Sem tabela de usuario
        // Valida login e pwd juntos, pois não retornará qual dos dados está invalido (questão de segurança)
        if(login === config.auth.login && pwd === config.auth.pwd){
            const token = jwt.sign({
                _id: 1,
                name: "GMaster Developer" 
            }, config.superSecret, {
                expiresIn: '48h' // expires in 48 horas
            });

            res.json({
                success: true,
                token: token
            });
        }else{
            res.json({
                success: false,
                message: 'Failed to generate access token'
            });
        }
    });
    

    return apiRouter;
}