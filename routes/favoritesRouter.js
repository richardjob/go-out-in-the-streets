const express = require('express')
const favoritesRouter = express.Router()
const Favorite = require('../models/favorite')
const bodyParser = require('body-parser')
const authenticate = require('../authenticate')

favoritesRouter.use(bodyParser.json())

favoritesRouter.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        Favorite.findOne({ "user": req.user._id })
            .populate('user')
            .populate({
                path: 'outlets',
                model: 'Outlet'
            })
            .then((favorite) => {
                res.setHeader('Content-type', 'application/json')
                res.statusCode = 200
                res.json(favorite)
            })
            .catch(err => next(err))
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Favorite.findOne({ "user": req.user._id }, (err, favorite) => {
            if (err) {
                next(err)
            }
            if (!favorite) {
                Favorite.create({ "user": req.user._id })
                    .then((fav) => {
                        req.body.forEach(outlet => {
                            if (!fav.outlets.includes(outlet._id)) {
                                fav.outlets.push(outlet._id)
                            }
                        })
                        fav.save()
                            .then((favorite) => {
                                res.setHeader('Content-type', 'application/json')
                                res.statusCode = 200
                                res.json(favorite)
                            })
                    })
                    .catch(err => next(err))
            }
            else {
                Favorite.findOne({ "user": req.user._id })
                    .then((fav) => {
                        req.body.forEach(outlet => {
                            if (!fav.outlets.includes(outlet._id)) {
                                fav.outlets.push(outlet._id)
                            }
                        })
                        fav.save()
                            .then((favorite) => {
                                res.setHeader('Content-type', 'application/json')
                                res.statusCode = 200
                                res.json(favorite)
                            })
                    })
                    .catch(err => next(err))

            }
        })
    })

module.exports = favoritesRouter