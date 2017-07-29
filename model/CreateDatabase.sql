/*
DROP DATABASE image_manager;
*/

CREATE DATABASE image_manager;
USE image_manager;

CREATE TABLE users(
    user varchar(32),
    password varchar(32) NOT NULL,
    PRIMARY KEY (user)
);

CREATE TABLE images(
    imageid int AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    type varchar(255) NOT NULL,
    size varchar(255) NOT NULL,
    dimension varchar(255) NOT NULL,
    private varchar(5) NOT NULL,
    PRIMARY KEY (imageid)
);

CREATE TABLE associations(
    userid varchar(32),
    imageid int,
    owner varchar(5) NOT NULL,
    PRIMARY KEY (userid, imageid),
    CONSTRAINT FK_userid FOREIGN KEY (userid) REFERENCES users(user),
    CONSTRAINT FK_imageid FOREIGN KEY (imageid) REFERENCES images(imageid)
);

/*
INSERT INTO users (user, password) VALUES ('alejandro', 'jaja19');
INSERT INTO images (name, type, size, dimension) VALUES ('img1', 'jpg', '1MB', '512x512', 'true');
*/

/*
CREATE USER 'alejandro' IDENTIFIED BY 'jaja19';
GRANT ALL ON image_manager.* TO alejandro;
*/
