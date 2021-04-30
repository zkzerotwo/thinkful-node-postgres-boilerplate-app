TRUNCATE flights RESTART IDENTITY CASCADE;

INSERT INTO flights (flight_owner, title, description, is_public)
VALUES 
(2, 'Spicy', 'How food with even spicier wine', 0),
(1, 'Tart and Crisp', 'Light and refreshing, tons of acid', 0),
(1, 'Bold and Brash', 'Heavy tannins and heavt protein', 0),
(1, 'Delicate Sweets', 'Delicious dessert and decadent dessert wine', 0),
(3, 'Mediterranean', 'Sea infleunce from grape to glass', 0),
(3, 'Funky Friends', 'Weirdo fermentations with weirder pairings', 0);
