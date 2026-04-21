var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController")
var upload = require('../config/configUploadPost')

router.post("/postar", upload.single('imgPost'), (req, res) => {
     postController.postar(req,res);
});
router.get("/buscarPosts/:filtro1/:filtro2/:idEspectador", function (req, res) {
     postController.buscarPost(req,res);
});
router.post("/curtir", function(req, res){
     postController.curtir(req,res);
});
router.get("/buscarComentarios/:idPost/:idEspectador", function(req, res){
     
     postController.buscarComentarios(req,res);
});
module.exports = router;