var express = require("express");
var router = express.Router();
var adminController = require("../controllers/adminController")

router.post("/login", function(req, res){
     adminController.logar(req,res)
});
router.get("/dadosDash",function(req,res){
     adminController.dadosDash(req,res)
})
router.get("/buscarUsuarios/:status/:ordem/:pesquisa",function(req,res){
     adminController.buscarUsuarios(req,res)
})
router.post("/desativarOuAtivarUser",function(req,res){
     adminController.desativarOuAtivarUser(req,res)
})
module.exports = router;