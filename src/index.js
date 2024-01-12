const express       = require("express");
const dotenv        = require('dotenv');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const appRoutes     = require("./v1/routes/application.routes");
const db            = require("./database/db");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 443 ;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());    

app.use('/api/v1/logs', appRoutes);
app.get( '/', ( req, res ) => { res.send('Bienvenido api - logs - sence') });

app.post('/redireccionar', (req, res) => {
  console.log(req);
  const paginaDestino = 'https://www.google.com';
  
  // Redirige a la página especificada
  res.redirect(paginaDestino);
});

app.listen(PORT, () => { console.log("Server Listening") });
