
INSERT INTO users (UID, Name, Password, Email, PhotoPath)
    VALUES
    (1, 'Jeff', 'superjeff', 'jeff@gmail.com', 'photos/jeff.jpeg'),
    (2, 'Doug', 'dumbdoug', 'doug@gmail.com', 'photos/doug.jpeg'),
    (3, 'Tom', 'bighattom', 'tom@gmail.com', 'photos/tom.jpeg'),
    (4, 'Bob', 'onearmbob', 'bob@gmail.com', 'photos/bob.jpeg'),
    (5, 'Joe', 'joeisdead', 'joe@gmail.com', 'photos/joe.jpeg'),
    (6, 'Smith', 'agentsmith', 'smith@gmail.com', 'photos/smith.jpeg'),
    (7, 'Matt', 'matthew', 'matt@gmail.com', 'photos/matt.jpeg'),
    (8, 'Cup', 'mug', 'cup@gmail.com', 'photos/cup.jpeg'),
    (9, 'Don', 'nob', 'don@gmail.com', 'photos/don.jpeg'),
    (10, 'Donkey', 'kong', 'donkey@gmail.com', 'photos/donkey.jpeg'),
    (11, 'Google', 'getmejerbs', 'google@gmail.com', 'photos/google.jpeg'),
    (12, 'Amazon', 'jerbsplsbezos', 'amazon@gmail.com', 'photos/amazon.jpeg'),
    (13, 'Microsoft', 'donatetomygofundme', 'microsoft@gmail.com', 'photos/microsoft.jpeg'),
    (14, 'Redhat', 'nolinux', 'redhat@gmail.com', 'photos/redhat.jpeg'),
    (15, 'Trump', 'maga', 'maga@gmail.com', 'photos/maga.jpeg'),
    (16, 'Youtube', 'likecommentsubscribe', 'youtube@gmail.com', 'photos/youtube.jpeg'),
    (17, 'Facebook', 'praiseourlizardmanceo', 'facebook@gmail.com', 'photos/facebook.jpeg'),
    (18, 'Apple', 'ilikeorangesmore', 'apple@gmail.com', 'photos/apple.jpeg'),
    (19, 'Uber', 'getinvancouveralready', 'uber@gmail.com', 'photos/uber.jpeg'),
    (20, 'SpaceX', 'elonisamartian', 'spacex@gmail.com', 'photos/spacex.jpeg');



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
INSERT INTO groups (GID, Name, Description, Type, FounderID, Founder)
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



INSERT INTO post(PostID, UID, Location, Time, Date, Photo_File, Text)
    VALUES
        (1, 1, 'Vancouver, BC, Canada', '16:10:20', '2018-01-01', 'photos/post1.jpeg', 'First photo ever!' ),
        (2, 2, 'Yellow Knife, BC, Canada', '21:11:30', '2018-01-02', 'photos/post2.jpeg', 'Saw the northen lights for the first time'),
        (3, 3, 'Toronto, ON, Canada', '13:11:11', '2018-01-03', NULL, 'Excited to see the blue jays game tonight'),
        (4, 4, 'Vancouver, BC, Canada', '00:01:50', '2018-01-04', NULL, 'Why am i still awake at this time?'),
        (5, 5, 'Cambridge, ON, Canada','08:12:17', '2018-01-05', 'photos/post5.jpeg', 'Great view'),
        (6, 6, 'Montreal, QB, Canada', '09:15:40', '2018-01-06', NULL, 'Anyone can help me fix my bike?'),
        (7, 7, 'Queens, ON, Canada', '17:12:30', '2018-01-07', 'photos/post7.jpeg', 'I regreted that cup of coffee earlier'),
        (8, 8, 'Hamilton, ON, Canada', '22:12:21', '2018-01-08', NULL, 'I LOVE MY LIFE RN'),
        (9, 9, 'Victoria, BC, Cadana', '01:01:01', '2018-01-09', 'photos/post9.jpeg', 'I LOVE MY DOG'),
        (10, 10, 'Ottawa, ON, Canada','03:12:42', '2018-01-10', NULL, 'GOD BLESS CANADA'),

        (11, 1, 'Calgary, AB, Canada', '05:12:10', '2018-02-02', NULL, 'Beautiful day in Calgary'),
        (12, 2, 'St.John, NB, Canada', '12:12:12', '2018-11-11', NULL, 'Bless the weather in New Brunswick'),
        (13, 3, 'Saskatoon, SK, Canada', '17:17:28', '2018-03-03', 'photos/post12.jpeg', 'Beautiful Saskatoon'),
        (14, 4, 'Edmonton, AB, Canada', '19:39:59', '2018-04-04', NULL, 'Oops did I missed April Fools Day?'),
        (15, 5, 'Winnepeg, MN, Canada', '12:42:12', '2018-05-05', 'photos/post15.jpeg', 'I love fall weather!'),
        (16, 6, 'Kelowna, BC, Canada', '22:42:12', '2018-06-06', NULL, 'I love being in wine city of canada' ),
        (17, 7, 'Guelph, ON, Canada','09:12:32', '2018-07-07', NULL, 'Summer in Guelph is the best'),
        (18, 8, 'Regina, SK, Canada', '08:15:40', '2018-08-08', NULL, 'CANT WAIT FOR THE NEW SEMESTER!!'),
        (19, 9, 'London, ON, Canada','12:12:32', '2018-09-09', 'photos/post19.jpeg', 'Cant believe summer is almost over'),
        (20, 10, 'Halifax, NS, Canada', '23:23:12', '2018-10-10', 'photos/post20.jpeg', 'Winter Ball Charity Fundraising'),

        (21, 1, 'Vancouver, BC, Canada', '13:31:33', '2018-01-20',NULL, 'Welcome to Vancouver Sneakerhead Group'),
        (22, 2, 'Prince Edward Island, NS, Canada','12:12:12','2018-02-20','photos/post22.jpeg','Today at Headpages HQ'),
        (23, 3, 'Toronton, ON, Canada', '14:43:21','2018-03-20', NULL, 'Which anime are you guys most looked forward for this summer?'),
        (24, 4, 'Ottawa, ON, Canada','12:43:12','2018-04-20','photos/post24.jpeg','Our very first jam night this friday, JOIN US!'),
        (25, 5, 'Edmonton, AB, Canada', '12:54:12','2018-05-20', NULL, 'Looking for a gym buddy at 24HR fitness downtown Edmonton. hmu'),
        (26, 6, 'St.Johns, NB, Canada', '15:32:12','2018-06-20', 'photos/post26.jpeg', 'Come out this friday to learn about bitcoin!'),
        (27, 7, 'Calgary, AB, Canada', '23:12:12', '2018-07-20', NULL, 'Anyone suggestions on how to get started with trading forex?'),
        (28, 8, 'Toronto, ON, Canada', '12:42:12', '2018-08-20', 'photos/post28.jpeg', 'Had a great pre-game signing and interacting with fans'),
        (29, 9, 'Vancouver, BC, Canada', '17:32:12', '2018-09-20', NULL, 'Coming to Vancouver this friday, any suggestions where to get good asian food?'),
        (30, 10, 'Vancouve, BC, Canada', '14:13:23', '2018-10-20', 'photos/post30.jpeg','Thank you for the volunteers and everyone that came to help out with the fundraising today');

INSERT INTO group_contains_post(GID, PostID)
    VALUES
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

INSERT INTO group_contains_user(UID, GID)
    VALUES
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
        (6, 6),
        (7, 7),
        (8, 8),
        (9, 9),
        (10, 10),
        (1, 2),
        (2, 3),
        (3, 4),
        (4, 5),
        (5, 6),
        (6, 7),
        (7, 8),
        (8, 9),
        (9, 10),
        (10, 1);

INSERT INTO likes(UID, PostID)
    VALUES
        (1, 1),
        (1, 3),
        (1, 12),

        (2, 2),
        (2, 4),
        (2, 13),

        (3, 3),
        (3, 5),
        (3, 14),

        (4, 4),
        (4, 6),
        (4, 15),

        (5, 5),
        (5, 7),
        (5, 16),

        (6, 6),
        (6, 8),
        (6, 17),

        (7, 7),
        (7, 9),
        (7, 18),

        (8, 8),
        (8, 1),
        (8, 19),

        (9, 9),
        (9, 2),
        (9, 20),

        (10, 10),
        (10, 3),
        (10, 11);

INSERT INTO user_comments_posts(CommentID, UID, PostID, Text)
    VALUES
        (1, 1, 2, 'Awesome'),
        (2, 2, 3, 'Me too! See you there!'),
        (3, 3, 4, 'Go to sleep bro!'),
        (4, 4, 5, 'Nice shot!'),
        (5, 5, 6, 'There''s a bike shops near you that my friend own, let me send you the address!'),
        (6, 6, 7, 'I know that feel :)' ),
        (7, 7, 8, 'Proud of you buddy!'),
        (8 ,8 ,9, 'Such a cute dog you have there!'),
        (9, 9, 10, 'Canada is the best!'),
        (10, 10, 11, 'Such a beautiful view in your backyard!'),
        (11, 11, 12, 'Keep warm buddy!'),
        (12, 12, 13, 'Amazing!'),
        (13, 13, 14, 'Haha that was 3 days ago girl!'),
        (14, 14, 15, 'My favourite season too!'),
        (15, 15, 16, 'Kelowna is the best!'),
        (16, 16, 17, 'Cant''t believe it''s summer already'),
        (17, 17, 18, 'I''m excited and anxious at the same time!'),
        (18, 18, 19, 'Time to whip out the skis and snowboards!'),
        (19, 19, 20, 'Thanks everyone that came out to help!');
     
-- Part C: Tables: games, play, events, creates_events, admins, admins_monitors_content, rsvp

INSERT INTO game (Name, Type, Description)
    VALUES
    ('Super Mario', 'ACT', "The Super Mario games follow Mario's adventures, typically in the fictional Mushroom Kingdom with Mario as the player character."),
    ('Beat Saber', 'MUG', 'Beat Saber is a 2018 virtual reality rhythm game created by Czech-based indie studio Hyperbolic Magnetism in which the player slashes blocks representing musical beats with a pair of energy blades resembling lightsabers.'),
    ('Sudoku','PZG', 'Sudoku is a logic-based, combinatorial number-placement puzzle.'),
    ('UNO', 'TAB', 'UNO is an American shedding-type card game that is played with a specially printed deck.'),
    ('Words with Friends', 'PUZ', 'Words with Friends is a multiplayer word game developed by Newtoy. Players take turns building words crossword puzzle style in a manner similar to the classic board game Scrabble.'),
    ('FIFA2009','SPG','FIFA2009 is a sport game in which users can create their own team and join the game.'),
    ('Angry Birds', 'PUZ', 'The series focuses on multi-colored birds who try to save their eggs from green-colored pigs, their enemies.'),
    ('Candy Crush Saga', 'PUZ', 'Candy Crush Saga is a free-to-play match-three puzzle video game.'),
    ('Darts FRVR', 'SPG', 'Darts FRVR is a sport game in which small missiles are thrown at a circular dartboard fixed to a wall.'),
    ('Swimming Pool', 'SPG', 'Swimming Pool is a sport game in which players use keyboard to control the athlete to swim faster.');

INSERT INTO play (GID, UID, Score)
    VALUES
    (1, 1, 255),
    (2, 5, 980),
    (1, 5, 289),
    (6, 10, 378),
    (3, 7, 34),
    (6, 3, 489),
    (9, 8, 424),
    (10, 10, 29),
    (4, 6, 324),
    (8, 2, 38);

INSERT INTO creates_event (UID, Name, Time, Date, Location, Description)
    VALUES
    (3, 'Harry Potter Movie Trivia', '20:00:00', '2018-11-21', 'UBC Sauder', '"It does not do well to dwell on dreams and forget to live." Join us for another round of Harry Potter trivia!'),
    (5, 'A Magical Christmas Yule Ball', '18:00:00', '2018-12-7', 'The Biltmore Cabaret', 'An immersive theatre experience. A portal taking you from your world to a wizarding school hidden in the highlands of Scotland. A Yule Ball that you and all the other students will never forget.'),
    (8, 'Science of Cocktails 2019', '20:00:00', '2019-2-7', 'Science World', 'At Science of Cocktails, the city’s most talented bartenders and chefs will showcase the chemistry, biology and physics behind preparing modern cocktails and cuisine.'),
    (8, 'Whistler Opening Weekend Trip', '15:00:00', '2018-11-23', 'Whistler Blackcomb', 'Another year, another ski season at Whistler Blackcomb! Join us for opening weekend and shred some early season pow.'),
    (20, 'SpaceX At UBC', '09:00:00', '2018-11-24', 'UBC', 'Come and know about the latest technology and news about SpaceX!'),
    (2, 'UBC Local Hack Day 2018', '09:00:00', '2018-12-1', 'Hugh Dempster Pavilion', "Join us for UBC's third iteration of Local Hack Day!"),
    (7, 'Free iOS Essentials Workshop', '18:00:00', '2018-11-23', 'Devhub', 'Build an iOS app in 2 hours!'),
    (4, 'Live SHow', '19:30:00', '2018-11-22', "Koerner's Pub on UBC Campus", 'Coming at you from Koerner’s Pub, we’ll be blowing the roof off with a night of live music, and cheap booze.'),
    (9, 'Annual Customer Appreciation Event', '12:00:00', '2018-11-30', "Molly's Seaside Market", ' Let us show our appreciation with spectacular sales, drinks, appies, gift bags, draws and as always...GOOD VIBES. Hope to see you there!'),
    (6, 'BCom Pancake Breakfast', '09:30:00', '2018-12-13','CPA Hall', 'Stop by CPA Hall to grab a delicious, free pancake breakfast and learn about the programming and services available at the BCC, CLC and UGO.');

INSERT INTO admins (Name, Title, Password, Username)
    VALUES
    ('Zark Muckerberg', 'CEO', 'Headpagethebest!', 'Zarkkkk'),
    ('Sheryl Sandberg', 'COO', 'SuperSheryl', 'LoveSheryl'),
    ('Jerry Chen', 'Program Manager', 'JerryChen1980', 'AwesomeJerry'),
    ('Anne Blinn', 'Program Manager Assistant', 'happyanne1234', 'AnneBlinn'),
    ('Cherry Swift', 'Account', 'Cherry!', 'CherrySwift'),
    ('Samara Hu', 'Account', 'Samara0909', 'SSSSSSamara'),
    ('Barry Park', 'Account', 'BarryBarry', 'BarryP'),
    ('Eric Liu', 'Account', 'EricLiu0102', 'Ericcc'),
    ('Morgan Newton', 'Account', 'Newton0506', 'NewtonTheWizard'),
    ('Mark Wells', 'Account', 'WellWellWell', 'MarkWells'),
    ('Perry Kim', 'Account', 'PerryKim0801', 'PerryPerry');

INSERT INTO admin_monitors_content (AID, GID, PostID)
    VALUES
    (6, 1, 11),
    (7, 1, 11),
    (8, 2, 12),
    (10, 3, 13),
    (6, 4, 14),
    (8, 5, 15),
    (5, 6, 16),
    (9, 7, 17),
    (3, 8, 18),
    (7, 9, 19);

INSERT INTO rsvp (UID, EID, Time, Date)
    VALUES
    (7, 7, '09:30:00', '2018-11-13'),
    (4, 6, '18:00:00', '2018-11-6'),
    (9, 10, '16:40:00', '2018-11-10'),
    (6, 3, '19:00:00', '2018-11-12'),
    (7, 4, '13:30:00', '2018-11-9'),
    (3, 9, '15:30:00', '2018-11-11'),
    (2, 5, '10:00:00', '2018-11-7'),
    (5, 2, '21:00:00', '2018-10-24'),
    (10, 1, '20:00:00', '2018-10-30'),
    (1, 8, '12:00:00', '2018-11-4');


-- TODO

