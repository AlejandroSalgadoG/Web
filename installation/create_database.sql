DROP DATABASE image_manager;

CREATE DATABASE image_manager;
USE image_manager;

CREATE TABLE users(
    user varchar(32),
    password varchar(32) NOT NULL,
    PRIMARY KEY (user)
);

CREATE TABLE images(
    id int AUTO_INCREMENT,
    name varchar(32) NOT NULL,
    path varchar(32) NOT NULL,
    private varchar(5) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE associations(
    userid varchar(32),
    imageid int,
    owner varchar(5) NOT NULL,
    PRIMARY KEY (userid, imageid),
    CONSTRAINT FK_userid FOREIGN KEY (userid) REFERENCES users(user),
    CONSTRAINT FK_imageid FOREIGN KEY (imageid) REFERENCES images(id)
);

/*
INSERT INTO users (user, password) VALUES ('alejandro', 'jaja19');
INSERT INTO images (id, name, path, private) VALUES (1, 'img1', 'share/', 'true');
INSERT INTO associations (userid, imageid, owner) VALUES ('alejandro', 1, 'true');
*/

/*
CREATE USER 'alejandro' IDENTIFIED BY 'jaja19';
GRANT ALL ON image_manager.* TO alejandro;
*/
