const express       = require("express");
const dotenv        = require('dotenv');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const appRoutes     = require("./v1/routes/application.routes");
const redirectRoutes = require("./v1/routes/redirect.routes");
const db            = require("./database/db");
const redController = require("./controller/redirectController");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 443 ;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());    

app.use('/api/v1/logs', appRoutes);
app.user('api/v1/ip', (req, res) => { res.status(200).json({"ip":req.ip})});
app.get( '/', ( req, res ) => { res.send('Bienvenido api - logs - sence') });

app.post('/', redirectRoutes);
//app.post('/redireccionar', redController.actualizaDB);
app.post('/redirectInicioSesion', redController.redirectIniciaSesion);
app.post('/redirectCierreSesion', redController.redirectCierraSesion);


app.listen(PORT, () => { console.log("Server Listening") });
