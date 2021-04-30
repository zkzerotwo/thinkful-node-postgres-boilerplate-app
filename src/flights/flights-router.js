const path = require('path')
const express = require('express')
const xss = require('xss')
const FlightService = require('./flights-service')

const flightRouter = express.Router()
const jsonParser = express.json()

//filter out the response to avoid showing broken data
const serializeFlight = flight => ({
    id: flight.id,
    title: xss(flight.title),
    description: xss(flight.description),
    flight_owner: flight.flight_owner,
    is_public: flight.is_public
})

flightRouter
    .route('/')
    //relevant
    .get((req, res, next) => {

        //connect to the service to get the data
        FlightService.getFlights(req.app.get('db'))
            .then(flights => {
                //map the results to get each one of the objects and serialize them
                res.json(flights.map(serializeFlight))
            })
            .catch(next)
    })
    //relevant
    .post(jsonParser, (req, res, next) => {

        //take the input from the user
        const {
            title,
            flight_owner,
            description
            // is_public
        } = req.body
        const newFlight = {
            title,
            flight_owner,
            description
            // is_public
        }

        //validate the input
        for (const [key, value] of Object.entries(newFlight)) {
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
        FlightService.insertFlight(
            req.app.get('db'),
            newFlight
        )
            .then(flight => {
                res
                    //display the 201 status code
                    .status(201)
                    //redirect the request to the original url adding the flight id for editing
                    .location(path.posix.join(req.originalUrl, `/${flight.id}`))
                    //return the serialized results
                    .json(serializeFlight(flight))
            })
            .catch(next)
    })


flightRouter
    .route('/:flight_id')
    .all((req, res, next) => {
        if (isNaN(parseInt(req.params.flight_id))) {
            //if there is an error show it
            return res.status(404).json({
                error: {
                    message: `Invalid id`
                }
            })
        }

        //connect to the service to get the data
        FlightService.getFlightById(
            req.app.get('db'),
            req.params.flight_id
        )
            .then(flight => {
                if (!flight) {
                    //if there is an error show it
                    return res.status(404).json({
                        error: {
                            message: `Flight doesn't exist`
                        }
                    })
                }
                res.flight = flight
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {

        //get each one of the objects from the results and serialize them
        res.json(serializeFlight(res.flight))
    })
    //relevant
    .patch(jsonParser, (req, res, next) => {

        //take the input from the user
        const {
            title,
            flight_owner,
            description,
            is_public
        } = req.body
        const flightToUpdate = {
            title,
            flight_owner,
            description,
            is_public
        }

        //validate the input by checking the length of the flightToUpdate object to make sure that we have all the values
        const numberOfValues = Object.values(flightToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            //if there is an error show it
            return res.status(400).json({
                error: {
                    message: `Request body must content either 'title' or 'completed'`
                }
            })
        }

        //save the input in the db
        FlightService.updateFlight(
            req.app.get('db'),
            req.params.flight_id,
            flightToUpdate
        )
            .then(updatedFlight => {

                //get each one of the objects from the results and serialize them
                res.status(200).json(serializeFlight(updatedFlight))
            })
            .catch(next)
    })
    //relevant
    .delete((req, res, next) => {
        FlightService.deleteFlight(
            req.app.get('db'),
            req.params.flight_id
        )
            .then(numRowsAffected => {

                //check how many rows are effected to figure out if the delete was successful
                res.status(204).json(numRowsAffected).end()
            })
            .catch(next)
    })
flightRouter.route('/:flight_id/saved')
    .all((req, res, next) => {
        if (isNaN(parseInt(req.params.flight_id))) {
            //if there is an error show it
            return res.status(404).json({
                error: {
                    message: `Invalid id`
                }
            })
        }

        //connect to the service to get the data
        FlightService.getFlightById(
            req.app.get('db'),
            req.params.flight_id
        )
            .then(flights => {
                if (!flights) {
                    //if there is an error show it
                    return res.status(404).json({
                        error: {
                            message: `Flight doesn't exist`
                        }
                    })
                }
                res.flights = flights
                next()
            })
            .catch(next)
    })
    //relevant
    .get((req, res, next) => {
        // console.log(req.params)
        FlightService.getPairsForFlight(req.app.get('db'),
            req.params)
            .then(pairs => {
                //json each pair returned from the flights
                res.json({ pairs })
            })
            .catch(next)

    })


module.exports = flightRouter