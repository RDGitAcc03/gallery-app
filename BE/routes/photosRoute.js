const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photosController');


router.get('/getPhotosFromPixabay' , photosController.getPhotosFromPixabay);
router.get('/sortList', photosController.sortList);
router.get('/getPageFromMemory', photosController.getPageFromMemory);



module.exports = router;