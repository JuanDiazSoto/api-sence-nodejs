const AppDB = require("../models/applicationModel");
const dotenv = require("dotenv");
const moment = require("moment");
dotenv.config();

const actualizaDB = async (req, res) => {
  console.log("Redirect", req.body.GlosaError);
  console.log("Redirect", req.body.IdSesionAlumno);
  try {
    var flag = true;
    const id = req.body.IdSesionAlumno;
    var IdSesionSense = "";
    if (req.body.GlosaError != "200") {
      flag = false;
    } else {
      IdSesionSense = req.body.IdSesionSense;
    }
    console.log("PASO");
    console.log(id);

    //const href = req.query.href;

    const filter = {
      GlosaError: req.body.GlosaError,
      Flag: flag,
      IdSesionSense: IdSesionSense,
    };
    console.log("filter", filter);
    const appUpdate = await AppDB.findByIdAndUpdate(id, filter, { new: true });
    console.log("update", appUpdate);

    const application = await AppDB.findById(id);
    console.log("update", appUpdate);
    console.log(application);
    res.redirect(decodeURIComponent(application.href));
  } catch (e) {
    console.log("Error Server : ", e);
  }
};

const redirectIniciaSesion = async (req, res) => {
  try {
    var flag = true;
    const id = req.body.IdSesionAlumno;
    var IdSesionSense = "";

    if (req.body.GlosaError != undefined) {
      flag = false;
    } else {
      IdSesionSense = req.body.IdSesionSence;
    }

    const dataUpdate = {
      GlosaError: req.body.GlosaError,
      Flag: flag,
      IdSesionSense: IdSesionSense,
    };
    const appUpdate = await AppDB.findByIdAndUpdate(id, dataUpdate, {
      new: true,
    });
    const application = await AppDB.findById(id);

    res.redirect(decodeURIComponent(application.href));
  } catch (e) {
    console.log("Error Server : ", e);
    res.status(200).json({ message: `Error internal server : ${e}`});
  }
};

const redirectCierraSesion = async (req, res) => {
  console.log("Redirect Cierra Sesion : ", req);

  try {
    const id = req.body.IdSesionAlumno;
    const application = await AppDB.findById(id);
    const url = application.href;

    if (req.body.GlosaError != undefined) {
      await AppDB.findByIdAndDelete(id, (error, success) => {
        if (error) {
          console.log(`Ha ocurrido un error: ${error}`);
        } else {
          console.log("Se ha Eliminado el registro");
        }
        res.redirect(decodeURIComponent(url));
      });
    } else {
      const dataUpdate = { GlosaError: req.body.GlosaError };
      const appUpdate = await AppDB.findByIdAndUpdate(id, dataUpdate, {
        new: true,
      });
      res.redirect(decodeURIComponent(url));
    }
  } catch (e) {
    res.status(200).json({ message: `Error internal server : ${e}`});
    console.log("Error Server : ", e);
  }
};

module.exports = {
  actualizaDB,
  redirectCierraSesion,
  redirectIniciaSesion,
};
