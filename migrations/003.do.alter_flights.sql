ALTER TABLE flights ADD COLUMN  flight_owner
    INTEGER REFERENCES users(id)
    ON DELETE SET NULL;

