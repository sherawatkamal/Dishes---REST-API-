const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image file!'), false)
    }
    cb(null, true)
};

const upload = multer({
    storage,
    filefilter: imageFileFilter
});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get(authenticate.verifyUser, authenticate.verifyAdminUser, 
    (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation is not supported on /imageUpload');
})
.post(authenticate.verifyUser, authenticate.verifyAdminUser, 
    upload.single('imageFile'),(req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type','application/json');
    res.json(req.file);
})
.put(authenticate.verifyUser, authenticate.verifyAdminUser, 
    (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported on /imageUpload');
})
.delete(authenticate.verifyUser, authenticate.verifyAdminUser, 
    (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation is not supported on /imageUpload');
})

module.exports = uploadRouter;