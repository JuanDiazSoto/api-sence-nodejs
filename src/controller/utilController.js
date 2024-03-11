const express = require('express');

const getIp = async (req, res) =>{
  console.log("obtener ip : ", req.ip);
  try{
      res.status(200).json({"ip": req.ip});
  }catch(e){
      res.status(500).json({ message: `Error internal server : ${e}` });
  }
}

module.exports = {
getIp
}
