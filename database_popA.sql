-- Tables: users, common users, company, employer_employees, follows, befriends.

INSERT INTO users (UID, Name, Password, Email, PhotoPath)
    VALUES 
    (1, 'Jeff', 'superjeff', 'jeff@gmail.com', '/photos/jeff.jpeg'),
    (2, 'Doug', 'dumbdoug', 'doug@gmail.com', '/photos/doug.jpeg'),
    (3, 'Tom', 'bighattom', 'tom@gmail.com', '/photos/tom.jpeg'),
    (4, 'Bob', 'onearmbob', 'bob@gmail.com', '/photos/bob.jpeg'),
    (5, 'Joe', 'joeisdead', 'joe@gmail.com', '/photos/joe.jpeg'),
    (6, 'Smith', 'agentsmith', 'smith@gmail.com', '/photos/smith.jpeg'),
    (7, 'Matt', 'matthew', 'matt@gmail.com', '/photos/matt.jpeg'),
    (8, 'Cup', 'mug', 'cup@gmail.com', '/photos/cup.jpeg'),
    (9, 'Don', 'nob', 'don@gmail.com', '/photos/don.jpeg'),
    (10, 'Donkey', 'kong', 'donkey@gmail.com', '/photos/donkey.jpeg'),
    (11, 'Google', 'getmejerbs', 'google@gmail.com', '/photos/google.jpeg'),
    (12, 'Amazon', 'jerbsplsbezos', 'amazon@gmail.com', '/photos/amazon.jpeg'),
    (13, 'Microsoft', 'donatetomygofundme', 'microsoft@gmail.com', '/photos/microsoft.jpeg'),
    (14, 'Redhat', 'nolinux', 'redhat@gmail.com', '/photos/redhat.jpeg'),
    (15, 'Trump', 'maga', 'maga@gmail.com', '/photos/maga.jpeg'),
    (16, 'Youtube', 'likecommentsubscribe', 'youtube@gmail.com', '/photos/youtube.jpeg'),
    (17, 'Facebook', 'praiseourlizardmanceo', 'facebook@gmail.com', '/photos/facebook.jpeg'),
    (18, 'Apple', 'ilikeorangesmore', 'apple@gmail.com', '/photos/apple.jpeg'),
    (19, 'Uber', 'getinvancouveralready', 'uber@gmail.com', '/photos/uber.jpeg'),
    (20, 'SpaceX', 'elonisamartian', 'spacex@gmail.com', '/photos/spacex.jpeg');



INSERT INTO common_users (UID)
    VALUES 
    (1),
    (2),
    (3),
    (4),
    (5),
    (6),
    (7),
    (8),
    (9),
    (10);
INSERT INTO company (CID, Type)
    VALUES 
    (11, 'ads'),
    (12, 'selling stuff'),
    (13, 'OS'),
    (14, 'OS'),
    (15, 'fake news'),
    (16, 'video streaming'),
    (17, 'selling your data'),
    (18, 'hipster fruit'),
    (19, 'avoiding liability'),
    (20, 'alien invasion');

INSERT INTO employs_employee (EMID, CID, Ename)
    VALUES
    (21, 15, 'Alan'),
    (22, 15, 'John'),
    (23, 11, 'Smith'),
    (24, 11, 'Justin'),
    (25, 11, 'Cole'),
    (26, 18, 'Gary'),
    (27, 13, 'Vincent'),
    (28, 14, 'Austin'),
    (29, 20, 'Leo'),
    (30, 19, 'Jacky');

INSERT INTO befriend (UID1, UID2)
    VALUES
    (1,2),
    (3,2),
    (4,2),
    (5,4),
    (5,3),
    (3,6),
    (8,9),
    (9,1),
    (10,3),
    (7,5);

INSERT INTO follow (UID, CID, FollowDate)
    VALUES
    (1,11, '2015-10-04'),
    (1,14, '2015-11-05'),
    (3,15, '2015-04-08'),
    (4,11, '2015-05-06'),
    (5,13, '2016-03-21'),
    (6,18, '2016-02-15'),
    (2,19, '2013-01-18'),
    (7,15, '2012-12-08'),
    (9,14, '2018-04-12'),
    (10,20, '2014-10-30');