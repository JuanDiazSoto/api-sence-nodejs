const AppDB = require("../models/applicationModel");
const dotenv = require("dotenv");
const moment = require("moment");
dotenv.config();


const actualizaDB = async (req, res) => {

    console.log("Redirect", req.body);
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
        console.log("PASO : idSesionSence", IdSesionSense);
        console.log(id);
        
        //const href = req.query.href;

        const filter = { GlosaError: req.body.GlosaError, Flag: flag , IdSesionSense : IdSesionSense };
        console.log("filter", filter);
        const appUpdate = await AppDB.findByIdAndUpdate(id, filter, { new : true, });
        console.log("update", appUpdate);
        
        const application = await AppDB.findById(id);
        console.log("update", appUpdate);
        console.log(application)
        res.redirect(decodeURIComponent(application.href));

    }catch(e){
        console.log("Error Server : " , e);
    }
}

const redirectCierraSesion = asyn (req, res) => {
    console.log("Redirect Cierra Sesion : ", req);

    try{
    }catch(e){

        if(req.body.GlosaError != undefined){
            
           const id = req.body.IdSesionAlumno; 
           const application = await AppDB.findById(id);
           const url = application.href;

            await AppDB.findByIdAndDelete(id, (error, success)=>{
                if(error){
                    console.log(`Ha ocurrido un error: ${error}`);                   
                }else{
                    console.log('Se ha Eliminado el registro');                    
                }
                res.redirect(decodeURIComponent(url));
            })

            
            
        }
            
        
    }
        
}


module.exports = {
    actualizaDB
};
