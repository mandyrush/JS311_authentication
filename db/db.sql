create table users_amanda (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB;


-- Initial User
-- username: arush
-- password: password
