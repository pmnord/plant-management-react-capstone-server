BEGIN;

TRUNCATE
    fancyplants_plant_instances,
    fancyplants_plants,
    fancyplants_users
    RESTART IDENTITY CASCADE;

INSERT INTO fancyplants_users (id, username, email, password)
    VALUES
    ( 1, 'test', 'test-email', '$2a$12$yWmO1coIMF5SD0hMYI3aL.ZDK4S.cgiRoviJao5zU1VbjSxgLjU9u' );

INSERT INTO fancyplants_plants (id, trefle_id, scientific_name, common_name, image)
    VALUES
    ( 1, 157554, 'Monstera deliciosa', 'tarovine', 'https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg' );

INSERT INTO fancyplants_plant_instances (user_id, plant_id, note)
    VALUES
    ( 1, 157554, 'This is a test note' );

COMMIT;