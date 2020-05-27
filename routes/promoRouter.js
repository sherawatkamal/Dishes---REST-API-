const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promotions = require('../models/promotions')

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
    .get((req, res, next) => {
        Promotions.find({})
            .then((promotions) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(promotions);
            }, (err) => next(err))
            .catch((err) => {
                next(err);
            });
    })
    .post((req, res, next) => {
        Promotions.create(req.body)
            .then((promotions) => {
                console.log('Promotions Created ', promotions);
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(promotions);
            }, (err) => next(err))
            .catch((err) => {
                next(err);
            })
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation is not supported!');
    })
    .delete((req, res, next) => {
        Promotions.deleteMany({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => {
                next(err);
            })
    });

promotionRouter.route('/:promotionID')
    .get((req, res, next) => {
        Promotions.findById(req.params.promotionID)
            .then((promotions) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(promotions);
            }, (err) => next(err))
            .catch((err) => {
                next(err);
            });
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on ${req.params.promotionID}`);
    })
    .put((req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promotionID, {
                $set: req.body
            }, {
                new: true
            })
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => {
                next(err);
            });
    })
    .delete((req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promotionID)
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => {
                next(err);
            });
    })

module.exports = promotionRouter;