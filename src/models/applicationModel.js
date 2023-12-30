const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    ip : { type : String , required : true},
    codSence: { type : String},
    codCurso: { type : String},
    IdSesionAlumno: { type : String},
    IdSesionSense : { type : String},
    LineaCapacitacion: { type : String}, 
    GlosaError: { type : String},
    Flag : { type : String}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
