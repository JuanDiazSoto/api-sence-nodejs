const AppDB = require("../models/applicationModel");
const dotenv        = require('dotenv');
const moment = require('moment');
dotenv.config();

const getApplication = async (req, res) =>{
  try {

    console.log("getApplication : ",req.params.id);
    const idApp = req.params.id;
    const application = await AppDB.findById(idApp);
    res.status(200).json(application);
  }catch(e){
    res.status(500).json({ message: `Error internal server : ${e}` });
  }
}


const createNewApp = async (req, res) => {
  try {
    const ip = req.query.ip;
    const idTrabajador = req.query.idTrabajador;
    const codSence = req.query.codSence;
    const codCurso = req.query.codCurso;
    const IdSesionAlumno = req.query.IdSesionAlumno;
    const IdSesionSense = req.query.IdSesionSense;
    const LineaCapacitacion = req.query.LineaCapacitacion;
    const GlosaError = req.query.GlosaError;
    const Flag = req.query.Flag;
    const href = decodeURIComponent(req.query.href);
    // const { ip, idTrabajador, codSence, codCurso, IdSesionAlumno, IdSesionSense, LineaCapacitacion, GlosaError, Flag } = req.body;
    const newApp = new AppDB({
      ip,
      idTrabajador,
      codSence,
      codCurso,
      IdSesionAlumno,
      IdSesionSense,
      LineaCapacitacion,
      GlosaError,
      Flag,
      href
    });
    const appSave = await newApp.save();
    const filter = { IdSesionAlumno : appSave._id }
    const appUpdate = await AppDB.findByIdAndUpdate(appSave._id, filter, { new : true, });
    res.status(201).json(appUpdate);
  } catch (e) {
    res.status(500).json({ message: `Error Internal server :  ${e}` });
  }
};

const updateApplication = async (req, res) => {
  try {
    const id = req.query.id;
    const glosaError = req.query.GlosaError;
    const flag = req.query.Flag;

    const filter = { GlosaError: glosaError, Flag: flag };
    const appUpdate = await AppDB.findByIdAndUpdate(id, filter, { new : true, });
    res.status(201).json(appUpdate);
  } catch (e) 
  {
    res.status(500).json({ message: `Error Internal server :  ${e}` });
  }
};

const getApplications = async (req, res) => {
 try {
    const ipAddress = req.query.ip;
    const date = req.query.fecha;
    const fechaCreacionDate = moment(date, 'DD-MM-YYYY').toDate();
         // fechaCreacionDate.setUTCHours(0,0,0,0);

    const fechaFinDelDia = moment(date, 'DD-MM-YYYY').toDate();
          fechaFinDelDia.setUTCDate(fechaFinDelDia.getUTCDate() + 1);
          fechaFinDelDia.setUTCMilliseconds(fechaFinDelDia.getUTCMilliseconds() - 1);



    console.log(fechaCreacionDate)
    console.log(fechaFinDelDia)

    const allApplications = await AppDB.find({
    createdAt:  { $gte: fechaCreacionDate, $lt: fechaFinDelDia } ,
      ip: ipAddress,
    });
    res.status(200).json(allApplications);
  } catch (e) {
    res.status(500).json({ message: `Error internal server : ${e}` });
  }
  

  //res.status(200).json(req.query);
};

module.exports = {
  getApplication,
  createNewApp,
  updateApplication,
  getApplications,
};
