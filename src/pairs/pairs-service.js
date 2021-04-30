const PairsService = {
    //relevant
    getPairs(db) {
        return db
            .select('*')
            .from('pairs')
    },
    getPairById(db, pair_id) {
        return db
            .select('*')
            .from('pairs')
            .where('pairs.id', pair_id)
            .first()
    },
    //relevant
    insertPair(db, newPair) {
        return db
            .insert(newPair)
            .into('pairs')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    //relevant
    updatePair(db, pair_id, newPair) {
        return db('pairs')
            .update(newPair, returning = true)
            .where({
                id: pair_id
            })
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    //relevant
    deletePair   (db, pair_id) {
        return db('pairs')
            .delete()
            .where({
                'id': pair_id
            })
    }
}

module.exports = PairsService