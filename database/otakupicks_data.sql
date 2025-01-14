DROP TABLE IF EXISTS otakupicks.background;
DROP TABLE IF EXISTS otakupicks.anime;
DROP TABLE IF EXISTS otakupicks.user;
-- -----------------------------------------------------
-- Table otakupicks.user
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS otakupicks.user (
id INT AUTO_INCREMENT,
user VARCHAR(255) NOT NULL,
password VARCHAR(20) NOT NULL,
PRIMARY KEY (id)
);
INSERT INTO otakupicks.user (user, password)
VALUES
('Henry', 'password'),
('Jamey', 'password');
-- -----------------------------------------------------
-- Table otakupicks.anime
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS otakupicks.anime (
name VARCHAR(255) NOT NULL,
studio_name VARCHAR(255) NOT NULL,
director_name VARCHAR(255) NOT NULL,
year INT NOT NULL,
image_filename VARCHAR(255) NOT NULL,
PRIMARY KEY (name)
);
INSERT INTO otakupicks.anime (name, studio_name, director_name, year, image_filename)
VALUES
('K-On', 'Kyoto Animation', 'Yamada Naoko', 2009, 'K-On.jpg'),
('Evangelion', 'Gainax', 'Hideaki Anno', 1995, 'Eva.jpg'),
('Monogatari', 'Shaft', 'Akiyuki Shinbo', 2009, 'Bakemonogatari.jpg'),
('5cm per second', 'CoMix wave', 'Makoto Shinkai', 2007, '5cm_per_second.jpg'),
('Garden of Words', 'CoMix wave', 'Makoto Shinkai', 2013, 'Garden_of_Words.jpg'),
('Sora no Woto', 'A-1 pictures', 'Mamoru Kanbe', 2010, 'Sora_no_Woto.jpg'),
('Kill la Kill', 'Trigger', 'Hiroyuki Imaishi', 2014, 'Kill_la_Kill.jpg'),
('Sousou no Frieren', 'Madhouse', 'Keiichiro Saito', 2023, 'Frieren.jpg'),
('Toradora', 'JC Staff', 'Tatsuyuki Nagai', 2008, 'Toradora.jpg'),
('Violet Evergarden', 'Kyoto Animation', 'Taichi Ishidate', 2018, 'VEG.jpg');
-- -----------------------------------------------------
-- Table otakupicks.background
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS otakupicks.background (
filename VARCHAR(255) NOT NULL,
anime VARCHAR(255) NOT NULL,
PRIMARY KEY (filename),
FOREIGN KEY (anime) REFERENCES anime(name) ON DELETE CASCADE
);
INSERT INTO otakupicks.background (filename, anime)
VALUES
('5cm_per_second_background.jpg', '5cm per second'),
('evangelion_tokyo_3_background.jpg', 'Evangelion'),
('garden_of_words_background.jpg', 'Garden of Words'),
('kill_la_kill_school_background.jpg', 'Kill la Kill'),
('k-on_school_background.jpg', 'K-On'),
('monogatari_house_background.jpg', 'Monogatari'),
('monogatari_school_background.jpg', 'Monogatari'),
('sora_no_woto_city_background.jpg', 'Sora no Woto');

create table otakupicks.users(
email varchar(255),
username varchar(255),
userpassword varchar(255),
primary key (email)
);