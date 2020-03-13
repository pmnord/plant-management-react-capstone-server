BEGIN;

TRUNCATE
    fancyplants_plant_instances,
    fancyplants_plants,
    fancyplants_users
    RESTART IDENTITY CASCADE;

INSERT INTO fancyplants_users ( username, email, password)
    VALUES
    ( 'test', 'test-email', '$2a$12$yWmO1coIMF5SD0hMYI3aL.ZDK4S.cgiRoviJao5zU1VbjSxgLjU9u' );

INSERT INTO fancyplants_plants (
            trefle_id, 
            scientific_name, 
            common_name, 
            image,
            plant_class,
            plant_order,
            family,
            family_common_name,
            genus,
            duration,
            shade_tolerance,
            drought_tolerance,
            flower_color
)
    VALUES ( 
            157554, 
            'Monstera deliciosa', 
            'tarovine', 
            'https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg',
            'Liliopsida',
            'Arales',
            'Araceae',
            'Arum family',
            'Monstera',
            'Perennial',
            NULL,
            NULL,
            NULL
    );

INSERT INTO fancyplants_plant_instances (user_id, trefle_id, note)
    VALUES
    ( 1, 157554, 'This is a test note' );

COMMIT;