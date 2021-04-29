const path = require('path')
const express = require('express')
const xss = require('xss')
const PairsService = require('./pairs-service')

const pairsRouter = express.Router()
const jsonParser = express.json()

//filter out the response to avoid showing broken data
const serializePair = pair => ({
    id: pair.id,
    title: xss(pair.title),
    completed: pair.completed
})

pairsRouter
    .route('/')
    //relevant
    .get((req, res, next) => {

        //connect to the service to get the data
        PairsService.getPairs(req.app.get('db'))
            .then(pairs => {
                //map the results to get each one of the objects and serialize them
                res.json(pairs.map(serializePair))
            })
            .catch(next)
    })
    //relevant
    .post(jsonParser, (req, res, next) => {

        //take the input from the user
        const {
            title,
            completed = false
        } = req.body
        const newPair = {
            title,
            completed
        }

        //validate the input
        for (const [key, value] of Object.entries(newPair)) {
            if (value == null) {
                //if there is an error show it
                return res.status(400).json({
                    error: {
                        message: `Missing '${key}' in request body`
                    }
                })
            }
        }

        //save the input in the db
        PairsService.insertPair(
                req.app.get('db'),
                newPair
            )
            .then(pair => {
                res
                //display the 201 status code
                    .status(201)
                    //redirect the request to the original url adding the pair id for editing
                    .location(path.posix.join(req.originalUrl, `/${pair.id}`))
                    //return the serialized results
                    .json(serializePair(pair))
            })
            .catch(next)
    })


pairsRouter
    .route('/:pair_id')
    .all((req, res, next) => {
        if (isNaN(parseInt(req.params.pair_id))) {
            //if there is an error show it
            return res.status(404).json({
                error: {
                    message: `Invalid id`
                }
            })
        }

        //connect to the service to get the data
        PairsService.getPairById(
                req.app.get('db'),
                req.params.pair_id
            )
            .then(pair => {
                if (!pair) {
                    //if there is an error show it
                    return res.status(404).json({
                        error: {
                            message: `Pair doesn't exist`
                        }
                    })
                }
                res.pair = pair
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {

        //get each one of the objects from the results and serialize them
        res.json(serializePair(res.pair))
    })
    //relevant
    .patch(jsonParser, (req, res, next) => {

        //take the input from the user
        const {
            title,
            completed
        } = req.body
        const pairToUpdate = {
            title,
            completed
        }

        //validate the input by checking the length of the pairToUpdate object to make sure that we have all the values
        const numberOfValues = Object.values(pairToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            //if there is an error show it
            return res.status(400).json({
                error: {
                    message: `Request body must content either 'title' or 'completed'`
                }
            })
        }

        //save the input in the db
        PairsService.updatePair(
                req.app.get('db'),
                req.params.pair_id,
                pairToUpdate
            )
            .then(updatedPair => {

                //get each one of the objects from the results and serialize them
                res.status(200).json(serializePair(updatedPair))
            })
            .catch(next)
    })
    //relevant
    .delete((req, res, next) => {
        PairsService.deletePair(
                req.app.get('db'),
                req.params.pair_id
            )
            .then(numRowsAffected => {

                //check how many rows are effected to figure out if the delete was successful
                res.status(204).json(numRowsAffected).end()
            })
            .catch(next)
    })


module.exports = pairsRouter