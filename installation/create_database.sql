USE image_manager;

CREATE TABLE users(
    user varchar(32),
    password varchar(32) NOT NULL,
    PRIMARY KEY (user)
);

CREATE TABLE images(
    id int AUTO_INCREMENT,
    file varchar(32) NOT NULL,
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
