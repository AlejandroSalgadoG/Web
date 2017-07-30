DROP DATABASE image_manager;

CREATE DATABASE image_manager;
USE image_manager;

CREATE TABLE users(
    user varchar(32),
    password varchar(32) NOT NULL,
    PRIMARY KEY (user)
);

CREATE TABLE images(
    name varchar(32),
    type varchar(32) NOT NULL,
    size int NOT NULL,
    dimension varchar(32) NOT NULL,
    private varchar(5) NOT NULL,
    PRIMARY KEY (name)
);

CREATE TABLE associations(
    userid varchar(32),
    imageid varchar(32),
    owner varchar(5) NOT NULL,
    PRIMARY KEY (userid, imageid),
    CONSTRAINT FK_userid FOREIGN KEY (userid) REFERENCES users(user),
    CONSTRAINT FK_imageid FOREIGN KEY (imageid) REFERENCES images(name)
);

/*
INSERT INTO users (user, password) VALUES ('alejandro', 'jaja19');
INSERT INTO images (name, type, size, dimension, private) VALUES ('img1', 'jpg', '1', '512x512', 'true');
*/

/*
CREATE USER 'alejandro' IDENTIFIED BY 'jaja19';
GRANT ALL ON image_manager.* TO alejandro;
*/
