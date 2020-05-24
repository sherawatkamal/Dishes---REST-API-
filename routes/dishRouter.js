const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all details of dishes!');
    })
    .post((req, res, next) => {
        res.end(`Will post name of dish : ${req.body.name}
     with description : ${req.body.description}`);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation is not supported!');
    })
    .delete((req, res, next) => {
        res.end('Will delete details of all dishes!');
    });

dishRouter.route('/:dishID')
    .get((req, res, next) => {
        res.end(`Will send detail of dish : ${req.params.dishID}!`);
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on ${req.params.dishID}`);
    })
    .put((req, res, next) => {
        res.write(`Will update the dish : ${req.params.dishID}` + '\n');
        res.end(`Will update the dish : ${req.body.name} 
        with details : ${req.body.description}`);
    })
    .delete((req, res, next) => {
        res.end(`Deleted dish : ${req.params.dishID}!`);
    })

module.exports = dishRouter;