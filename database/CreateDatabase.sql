CREATE DATABASE image_manager;
USE image_manager;

CREATE TABLE users(
    userid int AUTO_INCREMENT,
    user varchar(255),
    password varchar(255),
    PRIMARY KEY (userid)
);

CREATE TABLE images(
    imageid int AUTO_INCREMENT,
    name varchar(255),
    type varchar(255),
    size varchar(255),
    dimension varchar(255),
    PRIMARY KEY (imageid)
);

CREATE TABLE associations(
    userid int,
    imageid int,
    PRIMARY KEY (userid, imageid),
    CONSTRAINT FK_userid FOREIGN KEY (userid) REFERENCES users(userid),
    CONSTRAINT FK_imageid FOREIGN KEY (imageid) REFERENCES images(imageid)
);

/*
INSERT INTO users (user, password) VALUES ('asalgad2', 'jaja19');
INSERT INTO images (name, type, size, dimension) VALUES ('img1', 'jpg', '1MB', '512x512');
*/

/*
CREATE USER 'alejandro' IDENTIFIED BY 'jaja19';
GRANT ALL ON image_manager.* TO alejandro;
*/
