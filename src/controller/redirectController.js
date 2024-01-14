const AppDB = require("../models/applicationModel");
const dotenv = require("dotenv");
const moment = require("moment");
dotenv.config();


const actualizaDB = async (req, res) => {

    try {
        const flag = true;
        const id = req.body.IdSesionAlumno;
        const IdSesionSense = req.body.IdSesionSense;
        if(!req.body.GlosaError){
            flag = false;
        }
        const href = req.query.href;

        const filter = { GlosaError: glosaError, flag: flag };
        const appUpdate = await AppDB.findByIdAndUpdate(id, filter, { new : true, });
        res.redirect(href);

    }catch(e){
        console.log("Error Server : " , e);
    }

}


module.exports = {
    actualizaDB
};
