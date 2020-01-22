const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const cors          = require('cors');
const mongoose      = require('mongoose');
const morgan        = require('morgan');
const config        = require('./config');

// ===========================
// ===== CONFIGURAÇÃO ========
// ===========================
// Para pegar dados de requisições POST mais facilmente
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
// Middleware de permissões para requisições
app.use( (req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, x-access-token, content-type');
	next();
});
// Log de requisições
app.use(morgan('dev'));
app.use(cors());

//Banco de dados
mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error db:'));


// ===========================
// ======== ROTAS ============
// ===========================
const apiAuth = require('./routes/auth')(app, express);
app.use('/auth', apiAuth);

const apiRoutes = require('./routes/api')(app, express);
app.use('/api', apiRoutes);

// ===========================
// ======== RODAR ============
// ===========================
app.listen(config.port, () => console.log(`App running on port ${config.port}`))