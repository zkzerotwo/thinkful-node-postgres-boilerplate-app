TRUNCATE users  RESTART IDENTITY CASCADE;

INSERT INTO users (user_name, password)

VALUES 
('eren@aot.com', 'attacktitan'),
('mikasa@aot.com', 'attacktitan'),
('armin@aot.com', 'attacktitan'),
('hange@aot.com', 'attacktitan'),
('sasha@aot.com', 'attacktitan'),
('conny@aot.com', 'attacktitan'),
('levi@aot.com', 'attacktitan');

TRUNCATE flights RESTART IDENTITY CASCADE;

INSERT INTO flights (id, flight_owner, title, description, is_public)
VALUES 
(2, 'Spicy', 'How food with even spicier wine', 0),
(1, 'Tart and Crisp', 'Light and refreshing, tons of acid', 0),
(1, 'Bold and Brash', 'Heavy tannins and heavt protein', 0),
(1, 'Delicate Sweets', 'Delicious dessert and decadent dessert wine', 0),
(3, 'Mediterranean', 'Sea infleunce from grape to glass', 0),
(3, 'Funky Friends', 'Weirdo fermentations with weirder pairings', 0);


TRUNCATE pairs RESTART IDENTITY CASCADE;

INSERT INTO pairs 
(recipe_id, recipe_title, recipe_image_url, recipe_description, servings, beverage_title, beverage_description, url, flight_id)

VALUES
(651681, 'Pizza Puff Casserole', 'www.puffin.com', 'fuckindelicious', 2, 'champagne', 'crisp, sparkling white wine', 'www.tastybubbles,com', 1),
(651681, 'Pizza Puff Casserole', 'www.puffin.com', 'fuckindelicious', 2, 'champagne', 'crisp, sparkling white wine', 'www.tastybubbles,com', 1),
(651681, 'Pizza Puff Casserole', 'www.puffin.com', 'fuckindelicious', 2, 'champagne', 'crisp, sparkling white wine', 'www.tastybubbles,com', 1),
(651681, 'Pizza Puff Casserole', 'www.puffin.com', 'fuckindelicious', 2, 'champagne', 'crisp, sparkling white wine', 'www.tastybubbles,com', 1),
(651681, 'Pizza Puff Casserole', 'www.puffin.com', 'fuckindelicious', 2, 'champagne', 'crisp, sparkling white wine', 'www.tastybubbles,com', 1),
(651681, 'Pizza Puff Casserole', 'www.puffin.com', 'fuckindelicious', 2, 'champagne', 'crisp, sparkling white wine', 'www.tastybubbles,com', 1),
(651681, 'Pizza Puff Casserole', 'www.puffin.com', 'fuckindelicious', 2, 'champagne', 'crisp, sparkling white wine', 'www.tastybubbles,com', 1),
(651681, 'Pizza Puff Casserole', 'www.puffin.com', 'fuckindelicious', 2, 'champagne', 'crisp, sparkling white wine', 'www.tastybubbles,com', 1),
(651681, 'Pizza Puff Casserole', 'www.puffin.com', 'fuckindelicious', 2, 'champagne', 'crisp, sparkling white wine', 'www.tastybubbles,com', 1),
(651681, 'Pizza Puff Casserole', 'www.puffin.com', 'fuckindelicious', 2, 'champagne', 'crisp, sparkling white wine', 'www.tastybubbles,com', 1);