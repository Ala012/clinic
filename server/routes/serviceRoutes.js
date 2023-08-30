const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');


router.post('/add', serviceController.createService);


router.put('/put/:id', serviceController.updateService);


router.get('/get/:id', serviceController.getService);


router.get('/get', serviceController.getAllService);


router.delete('/delete/:id', serviceController.deleteService);


router.get('/search', serviceController.searchService);

module.exports = router;
