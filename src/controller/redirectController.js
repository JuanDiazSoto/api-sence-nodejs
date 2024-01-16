const AppDB = require("../models/applicationModel");
const dotenv = require("dotenv");
const moment = require("moment");
dotenv.config();


const actualizaDB = async (req, res) => {
console.log("Redirect", req.body.GlosaError);
console.log("Redirect", req.body.IdSesionAlumno);
    try {
        const flag = true;
        const id = req.body.IdSesionAlumno;
        const IdSesionSense = req.body.IdSesionSense;
        if(!req.body.GlosaError){
            flag = false;
        }
        const href = req.query.href;

        const filter = { GlosaError: req.body.GlosaError, Flag: flag };
        const appUpdate = await AppDB.findByIdAndUpdate(id, filter, { new : true, });
        const application = AppDB.findById(id)
        console.log(application)
        res.redirect(application.href);

    }catch(e){
        console.log("Error Server : " , e);
    }

}


module.exports = {
    actualizaDB
};
