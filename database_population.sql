
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


-- Part B: Tables: groups, groups_contains_posts, groups_contains_user, likes, posts, users_comment_posts
-- TODO
INSERT INTO groups (GID, Name, Descriptor, Type, FounderID, Founder)
    VALUES
     (1,
        'Vancouver Sneakhead Group',
        'A place for sneakerheads to gather and share sneaker news in Vancouver',
        'Social',
        1,
        'Jeff'),

     (2,
          'Headpages News',
          'A place where Headpages share their storie, news, and interaction with their members with their member',
          'Social',
          2,
          'Doug'),


     (3,
          'Headpages Anime Society',
          'Headpages''s very own anime club that gathers all anime enthusiasts in the company',
          'Interests',
          3,
          'Tom'),

     (4,
          'Headpages Music Club',
          'Headpages''s very own music club that gathers all music enthusiasts in the company',
          'Interests',
          4,
          'Bob'),

     (5,
          'Headpages Gym Buffs',
          'Headpages''s very own gym club that gathers all gym buffs in the company',
          'Sports',
          5,
          'Joe'),

     (6,
           'Vancouver Bitcoin Society',
           'A place where Bitcoin Enthusiasts in Vancouver gather to share their interest in Bitcoin',
           'Interests',
           6,
           'Smith'),

     (7,
           'Vancouver Finance Social',
           'A place where finance finatics gather to talk everything finance',
           'Business',
           7,
           'Matt'),

     (8,
           'Canada''s Hockey Team',
           'A group dedicated to everything hockey in Canada',
           'Sports',
           8,
           'Cup'),

     (9,
            'Vancouver Foodie Group',
            'A place where people gather and share their experience with food across Vancouver',
            'Food',
            9,
            'Don'),

     (10,
            'Vancouver''s Children''s Hospital',
            'A place where VCH share updates and their patient''s stories' ,
            'Company group',
            10,
            'Donkey');


     INSERT INTO groups_contains_posts(GID, PostID)
        VALUE
            (1, 11),
            (2, 12),
            (3, 13),
            (4, 14),
            (5, 15),
            (6, 16),
            (7, 17),
            (8, 18),
            (9, 19),
            (10, 20),
            (1, 21),
            (2, 22),
            (3, 23),
            (4, 24),
            (5, 25),
            (6, 26),
            (7, 27),
            (8, 28),
            (9, 29),
            (10, 30);






















-- Part C: Tables: games, play, events, creates_events, admins, admins_monitors_content, rsvp
-- TODO