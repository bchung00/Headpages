-- I have lowercased all table names.
-- some of the drop table if exists due to cascading deletion but it doesnt really hurt to be sure.

DROP TABLE IF EXISTS users;
CREATE TABLE users(
   UID               INTEGER AUTO_INCREMENT,
   Name              VARCHAR(20) NOT NULL,
   Password          VARCHAR(30) NOT NULL,
   Email             VARCHAR(60) NOT NULL UNIQUE,
   PhotoPath         VARCHAR(100),  -- added this attribute to link to photos for user profiles
   PRIMARY KEY (UID));

DROP TABLE IF EXISTS common_users;
CREATE TABLE common_users(
   UID               INTEGER,
   PRIMARY KEY (UID),
   FOREIGN KEY (UID) REFERENCES users
                        ON DELETE CASCADE
                        ON UPDATE CASCADE);

DROP TABLE IF EXISTS company;
CREATE TABLE company(
   CID               INTEGER,
   Type              VARCHAR(30), -- should type be initialized to NULL?
   PRIMARY KEY (CID),
   FOREIGN KEY (CID) REFERENCES users(UID)
                     ON DELETE CASCADE
                     ON UPDATE CASCADE);

DROP TABLE IF EXISTS employs_employee;
CREATE TABLE employs_employee(
   EMID              INTEGER AUTO_INCREMENT,
   CID               INTEGER,
   Ename             VARCHAR(20) NOT NULL,
   PRIMARY KEY (EMID, CID),
   FOREIGN KEY (CID) REFERENCES company
                     ON DELETE CASCADE
                     ON UPDATE CASCADE);

DROP TABLE IF EXISTS follow;
CREATE TABLE follow(
   UID               INTEGER,
   CID               INTEGER,
   FollowDate        Date,
   PRIMARY KEY (UID, CID),
   FOREIGN KEY (UID) REFERENCES common_Users
                     ON DELETE CASCADE
                     ON UPDATE CASCADE,
   FOREIGN KEY (CID) REFERENCES company
                     ON DELETE CASCADE
                     ON UPDATE CASCADE); -- originally was set null but having it cascade makes more sense to me as if for some reason the cid were updated I'd assume the user should still follow them

DROP TABLE IF EXISTS befriend;
CREATE TABLE befriend(
   UID1              INTEGER,
   UID2              INTEGER,
   PRIMARY KEY (UID1, UID2),
   FOREIGN KEY (UID1) REFERENCES common_users(UID) -- not sure if this is written correctly to have both reference UID
                     ON DELETE CASCADE
                     ON UPDATE CASCADE,
   FOREIGN KEY (UID2) REFERENCES common_users(UID) -- not sure if this is written correctly to have both reference UID
                     ON DELETE CASCADE
                     ON UPDATE CASCADE);
                     

DROP TABLE IF EXISTS game;
CREATE TABLE game(
   GID               INTEGER AUTO_INCREMENT,
   Name              VARCHAR(20) NOT NULL,
   Type              VARCHAR(20),
   Description       VARCHAR(1000),
   PRIMARY KEY (GID));

DROP TABLE IF EXISTS play;
CREATE TABLE play(
   GID               INTEGER,
   UID               INTEGER,
   Score             INTEGER,
   PRIMARY KEY (GID, UID),
   FOREIGN KEY (GID) REFERENCES game
                     ON DELETE CASCADE
                     ON UPDATE CASCADE,
   FOREIGN KEY (UID) REFERENCES common_users
                     ON DELETE CASCADE
                     ON UPDATE CASCADE);

DROP TABLE IF EXISTS creates_event;
CREATE TABLE creates_event(
   EID               INTEGER AUTO_INCREMENT, -- should we maybe rename this since we already have an eid for employee?
   UID               INTEGER NOT NULL,
   Name              CHAR(20) NOT NULL,
   Time              TIME,
   Date              DATE,
   Location          CHAR(20),
   Description       VARCHAR(1000),
   PRIMARY KEY (EID),
   FOREIGN KEY (UID) REFERENCES users
                     ON DELETE SET NULL
                     ON UPDATE CASCADE);

DROP TABLE IF EXISTS rsvp;
CREATE TABLE rsvp(
   UID               INTEGER,
   EID               INTEGER,
   Time              TIME,
   Date              DATE,
   PRIMARY KEY (UID, EID),
   FOREIGN KEY (UID) REFERENCES users
                     ON DELETE CASCADE
                     ON UPDATE CASCADE,
   FOREIGN KEY (EID) REFERENCES create_Events
                     ON DELETE CASCADE
                     ON UPDATE CASCADE);

DROP TABLE IF EXISTS post;
CREATE TABLE post( 
   PostID            INTEGER AUTO_INCREMENT,
   UID               INTEGER,
   Location          CHAR(30),
   Time              TIME,
   Date              DATE,
   Photo_File        VARCHAR(100),
   Text              TEXT,
   PRIMARY KEY (PostID),
   FOREIGN KEY (UID) REFERENCES users
                     ON DELETE CASCADE
                     ON UPDATE CASCADE);

DROP TABLE IF EXISTS likes;
CREATE TABLE likes( 
   UID               INTEGER,
   PostID            INTEGER,
   PRIMARY KEY (UID, PostID),
   FOREIGN KEY (UID) REFERENCES users
                     ON DELETE CASCADE
                     ON UPDATE CASCADE,
   FOREIGN KEY (PostID) REFERENCES post
                     ON DELETE CASCADE
                     ON UPDATE CASCADE);

DROP TABLE IF EXISTS user_comments_posts;
CREATE TABLE user_comments_posts( 
   CommentID         INTEGER AUTO_INCREMENT,
   UID               INTEGER,
   PostID            INTEGER,
   Text              TEXT,
   PRIMARY KEY (CommentID),
   FOREIGN KEY (UID) REFERENCES Users
                     ON DELETE CASCADE
                     ON UPDATE CASCADE,
   FOREIGN KEY (PostID) REFERENCES Post
                     ON DELETE CASCADE
                     ON UPDATE CASCADE);

DROP TABLE IF EXISTS groups;
CREATE TABLE groups(
   GID               INTEGER AUTO_INCREMENT,
   Name              CHAR(20),
   Description       VARCHAR(1000),
   Type              CHAR(20),
   FounderID         INTEGER,
   Founder           CHAR(20), -- I think maybe we dont need this since founderId is the user that made said group
   PRIMARY KEY (GID),
   FOREIGN KEY (FounderID) REFERENCES Users(UID)
                     ON DELETE CASCADE
                     ON UPDATE CASCADE);

DROP TABLE IF EXISTS group_contains_user;
CREATE TABLE group_contains_user(
         UID                              INTEGER,
         GID                              INTEGER,
   PRIMARY KEY (UID,GID),
   FOREIGN KEY (UID) REFERENCES users
                     ON DELETE CASCADE
                     ON UPDATE CASCADE,
   FOREIGN KEY (GID) REFERENCES groups
                     ON DELETE CASCADE
                     ON UPDATE CASCADE);

DROP TABLE IF EXISTS group_contains_post;
CREATE TABLE group_contains_post(
   GID               INTEGER,
   PostID            INTEGER UNIQUE,
   PRIMARY KEY (GID, PostID),
   FOREIGN KEY (GID) REFERENCES groups
                     ON DELETE CASCADE
                     ON UPDATE CASCADE,
   FOREIGN KEY (PostID) REFERENCES post
                     ON DELETE CASCADE
                     ON UPDATE CASCADE);

DROP TABLE IF EXISTS admins;
CREATE TABLE admins(
   AID         INTEGER AUTO_INCREMENT,
   Name        CHAR(20),
   Title       CHAR(20),
   Password    VARCHAR(20),
   Username    VARCHAR(20),
   PRIMARY KEY (AID));

DROP TABLE IF EXISTS admin_monitors_content;
CREATE TABLE admin_monitors_content( -- this has been changed to just show what groups/posts admins moniter since admin duties are simply forcefully removing posts I think?
   AID         INTEGER,
   GID         INTEGER,
   PostID      INTEGER,
   PRIMARY KEY (AID, GID, PostID),
   FOREIGN KEY (AID) REFERENCES admins
                     ON DELETE CASCADE
                     ON UPDATE CASCADE,
   FOREIGN KEY (GID) REFERENCES groups
                     ON DELETE CASCADE
                     ON UPDATE CASCADE,
   FOREIGN KEY (PostID) REFERENCES Post
                     ON DELETE CASCADE
                     ON UPDATE CASCADE);
