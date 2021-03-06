PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS items;

CREATE TABLE topics (
  id serial primary key,
  topicName varchar(50) NOT NULL UNIQUE
);
CREATE TABLE items(
  id serial primary key,
  itemName varchar(50) UNIQUE NOT NULL,
  topic INTEGER NOT NULL,
  foreign key (topic) 
    REFERENCES topics (id)
);


insert into topics(topicName) values ('example topic');
insert into items(topic, itemName) values (1, 'example item');
