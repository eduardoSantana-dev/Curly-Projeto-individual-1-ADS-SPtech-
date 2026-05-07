var express = require("express");
var router = express.Router();
var adminController = require("../controllers/adminController")

router.post("/login", function(req, res){
     adminController.logar(req,res)
});
module.exports = router;