var express = require("express");
var router = express.Router();
var usuarioController = require("../controllers/usuarioController")
var upload = require('../config/configUpload')

router.post("/cadastrar", upload.single('foto'), (req, res) => {
    usuarioController.cadastrar(req,res);
});

router.post("/verificarCadastro", function (req, res) {
    usuarioController.verificarCadastro(req,res);
});
router.post("/logar", function (req, res) {
    usuarioController.login(req,res);
});
router.get("/userDados/:idUser",function(req,res){
   usuarioController.buscarDados(req,res)
})

module.exports = router;