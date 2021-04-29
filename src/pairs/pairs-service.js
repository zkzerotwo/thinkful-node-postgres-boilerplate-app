const FlightService = {
    //relevant
    getFlights(db) {
        return db
            .select('*')
            .from('flight')
    },
    getFlightById(db, flight_id) {
        return db
            .select('*')
            .from('flight')
            .where('flight.id', flight_id)
            .first()
    },
    //relevant
    insertFlight(db, newFlight) {
        return db
            .insert(newFlight)
            .into('flight')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    //relevant
    updateFlight(db, flight_id, newFlight) {
        return db('flight')
            .update(newFlight, returning = true)
            .where({
                id: flight_id
            })
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    //relevant
    deleteFlight   (db, flight_id) {
        return db('flight')
            .delete()
            .where({
                'id': flight_id
            })
    }
}

module.exports = FlightService