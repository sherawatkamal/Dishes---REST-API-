const express = require('express');
const bodyParser = require('body-parser');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send details of all promotions!');
    })
    .post((req, res, next) => {
        res.end(`Will post name of promotion : ${req.body.name}
     with description : ${req.body.description}`);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation is not supported!');
    })
    .delete((req, res, next) => {
        res.end('Deleted all promotions!');
    });

promotionRouter.route('/:promotionID')
    .get((req, res, next) => {
        res.end(`Will send detail of promotion : ${req.params.promotionID}`);
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on ${req.params.promotionID}`);
    })
    .put((req, res, next) => {
        res.write(`Will update the promotion : ${req.params.promotionID}` + '\n');
        res.end(`Will update the promotion : ${req.body.name} 
        with details : ${req.body.description}`);
    })
    .delete((req, res, next) => {
        res.end(`Deleted promotion : ${req.params.promotionID}`);
    })

module.exports = promotionRouter;