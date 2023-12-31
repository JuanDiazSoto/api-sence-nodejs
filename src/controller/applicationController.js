const AppDB = require("../models/applicationModel");
const dotenv        = require('dotenv');
const moment = require('moment');
dotenv.config();

const createNewApp = async (req, res) => {
  try {
    const ip = req.query.ip;
    const codSence = req.query.codSence;
    const codCurso = req.query.conCurso;
    const IdSesionAlumno = req.query.IdSesionAlumno;
    const IdSesionSense = req.query.IdSesionSense;
    const LineaCapacitacion = req.query.LineaCapacitacion;
    const GlosaError = req.query.GlosaError;
    const Flag = req.query.Flag;
    // const { ip, codSence, codCurso, IdSesionAlumno, IdSesionSense, LineaCapacitacion, GlosaError, Flag } = req.body;
    const newApp = new AppDB({
      ip,
      codSence,
      codCurso,
      IdSesionAlumno,
      IdSesionSense,
      LineaCapacitacion,
      GlosaError,
      Flag,
    });
    const appSave = await newApp.save();
    res.status(201).json(appSave);
  } catch (e) {
    res.status(500).json({ message: `Error Internal server :  ${e}` });
  }
};

const updateApplication = async (req, res) => {
  const ip = req.query.ip;
  const GlosaError = req.query.GlosaError;
  const Flag = req.query.Flag;


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
  createNewApp,
  updateApplication,
  getApplications,
};
