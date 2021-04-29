    ALTER TABLE pairs ADD COLUMN  flight_id
    INTEGER REFERENCES flights(id)
    ON DELETE SET NULL;