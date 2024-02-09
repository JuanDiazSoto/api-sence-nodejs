const AppDB = require("../models/applicationModel");
const dotenv = require("dotenv");
const moment = require("moment");
dotenv.config();


const redirectIniciaSesion = async (req, res) => {

    try {
        
        var flag = true;
        const id = req.body.IdSesionAlumno; 
        var IdSesionSense = "";
        
        if(req.body.GlosaError != undefined){
            flag = false;
        }
        else{
         IdSesionSense  = req.body.IdSesionSence;
        }

        const dataUpdate = { GlosaError: req.body.GlosaError, Flag: flag , IdSesionSense : IdSesionSense };
        const appUpdate = await AppDB.findByIdAndUpdate(id, dataUpdate, { new : true, });
        const application = await AppDB.findById(id);
        
        res.redirect(decodeURIComponent(application.href));

    }catch(e){
        console.log("Error Server : " , e);
    }
}

const redirectCierraSesion = async (req, res) => {
    console.log("Redirect Cierra Sesion : ", req);

    try{
        const id = req.body.IdSesionAlumno; 
        const application = await AppDB.findById(id);
        const url = application.href;
        
        if(req.body.GlosaError != undefined){
           
          await AppDB.findByIdAndDelete(id, (error, success)=>{
            if(error){
                console.log(`Ha ocurrido un error: ${error}`);                   
            }else{
                console.log('Se ha Eliminado el registro');                    
            }
            res.redirect(decodeURIComponent(url));
            });
        }else{
            const dataUpdate = { GlosaError: req.body.GlosaError };
            const appUpdate = await AppDB.findByIdAndUpdate(id, dataUpdate, { new : true, });
            res.redirect(decodeURIComponent(url));
        }
    }catch(e){
        console.log("Error Server : " , e);
    }        
}


module.exports = {
    redirectIniciaSesion,
    redirectCierraSesion 
    
};
