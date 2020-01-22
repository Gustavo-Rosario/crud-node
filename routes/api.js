module.exports = (app, express) => {

    const apiRouter = express.Router();

    // Middleware de acesso por token (fake apenas para simular)
    apiRouter.use( (req, res, next) => {
        const token = req.headers['x-access-token'];
    });
    

    return apiRouter
}
