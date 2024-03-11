const express       = require("express");
const dotenv        = require('dotenv');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const appRoutes     = require("./v1/routes/application.routes");
const redirectRoutes = require("./v1/routes/redirect.routes");
const db            = require("./database/db");
const redController = require("./controller/redirectController");
const utilRoutes       = require("./v1/routes/util.routes");
const requestIp = require('request-ip');

const app = express();
app.use(requestIp.mw());

dotenv.config();
const PORT = process.env.PORT || 443 ;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());    

app.use('/api/v1/logs', appRoutes);
app.use('/api/v1/util', utilRoutes );
app.get( '/', ( req, res ) => { res.send('Bienvenido api - logs - sence') });

app.post('/', redirectRoutes);
//app.post('/redireccionar', redController.actualizaDB);
app.post('/redirectInicioSesion', redController.redirectIniciaSesion);
app.post('/redirectCierreSesion', redController.redirectCierraSesion);

app.get('/getIp', (req, res) => {
    // Obtener la IP pública y la IP interna
    const ipAddressPublic = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ipAddressInternal = req.clientIp;
  
    res.send(`IP Pública: ${ipAddressPublic}<br>IP Interna: ${ipAddressInternal}`);
  });


app.listen(PORT, () => { console.log("Server Listening") });
