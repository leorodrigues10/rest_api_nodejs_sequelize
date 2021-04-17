const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/CategoryController');


router.post('/category', (req, res) => {
    CategoryController.create(req, res);
});

router.get('/category', (req, res) => {
    CategoryController.findAll(req, res);
});

router.get('/category/:id', (req, res) => {
    CategoryController.findById(req, res);
});

router.delete('/category/:id', (req, res) => {
    CategoryController.delete(req, res);
});

router.put('/category/:id', (req, res) => {
    CategoryController.update(req, res);
});


module.exports = router;