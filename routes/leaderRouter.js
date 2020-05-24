const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send details of all leaders!');
    })
    .post((req, res, next) => {
        res.end(`Will post name of leader : ${req.body.name}
     with description : ${req.body.description}`);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation is not supported!');
    })
    .delete((req, res, next) => {
        res.end('Deleted all leaders!');
    });

leaderRouter.route('/:leaderID')
    .get((req, res, next) => {
        res.end(`Will send detail of leader : ${req.params.leaderID}`);
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on ${req.params.leaderID}`);
    })
    .put((req, res, next) => {
        res.write(`Will update the leader : ${req.params.leaderID}` + '\n');
        res.end(`Will update the leader : ${req.body.name} 
        with details : ${req.body.description}`);
    })
    .delete((req, res, next) => {
        res.end(`Deleted leader : ${req.params.leaderID}`);
    })

module.exports = leaderRouter;