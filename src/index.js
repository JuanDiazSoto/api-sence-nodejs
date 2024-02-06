const express       = require("express");
const dotenv        = require('dotenv');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const appRoutes     = require("./v1/routes/application.routes");
const redirectRoutes = require("./v1/routes/redirect.routes");
const db            = require("./database/db");
const redController = require("./controller/redirectController");
const os            = require('os');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 443 ;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());    

app.use('/api/v1/logs', appRoutes);
app.get( '/', ( req, res ) => { res.send('Bienvenido api - logs - sence') });

app.get('/macaddress', (req, res) => {
  const networkInterfaces = os.networkInterfaces();
  console.log("macaddress1 : ", networkInterfaces);
  const macAddress = networkInterfaces['Ethernet']; // Ajusta 'Ethernet' según tu interfaz de red
  console.log("macaddress2 : ",macAddress)
  res.json({ macAddress });
});

app.post('/', redirectRoutes);
app.post('/redireccionar', redController.actualizaDB);

/*
app.post('/redireccionar', (req, res) => {
  const href = req.body.href;
  res.redirect(href);
});
*/

app.listen(PORT, () => { console.log("Server Listening") });
