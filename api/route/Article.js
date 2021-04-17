const express = require('express');
const router = express.Router();
const ArticleController = require('../controller/ArticleController');




router.post('/article', (req, res) => {
    ArticleController.create(req, res);
});

router.get('/article', (req, res) => {
    ArticleController.findAll(req, res);
});


router.get('/article/:id', (req, res) => {
    ArticleController.findById(req, res);
});



router.put('/article/:id', (req, res) => {
    ArticleController.update(req, res);
});


router.delete('/article/:id', (req, res) => {
    ArticleController.delete(req, res);
});
router.get('/article/page/:num', (req, res) => {
    ArticleController.paginate(req, res);
});


module.exports = router;