const FlightService = {
    //relevant
    getFlights(db) {
        return db
            .select('*')
            .from('flights')
    },
    getFlightById(db, flight_id) {
        return db
            .select('*')
            .from('flights')
            .where('flights.id', flight_id)
            .first()
    },
    getPairsForFlight(db, flight_id) {
        // console.log(flight_id)
        return db
        // .join('flights', 'flights.id', '=','pairs.flight_id')
        .select('*')
        .from('pairs')
        .where(flight_id, flight_id)
    },
    //relevant
    insertFlight(db, newFlight) {
        return db
            .insert(newFlight)
            .into('flights')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    //relevant
    updateFlight(db, flight_id, newFlight) {
        return db('flights')
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
        return db('flights')
            .delete()
            .where({
                'id': flight_id
            })
    }
}

module.exports = FlightService