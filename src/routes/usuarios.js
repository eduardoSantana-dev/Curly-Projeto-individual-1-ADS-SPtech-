var express = require("express");
var router = express.Router();
var usuarioController = require("../controllers/usuarioController")
var upload = require('../config/configUpload')
router.post("/cadastrar", upload.single('foto'), (req, res) => {
    usuarioController.cadastrar(req,res);
});
module.exports = router;