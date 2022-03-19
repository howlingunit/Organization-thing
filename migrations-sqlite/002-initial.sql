PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS items;

CREATE TABLE topics (
  id serial primary key,
  topicName varchar(50) NOT NULL UNIQUE
);
CREATE TABLE items(
  id serial primary key,
  itemName varchar(50) NOT NULL,
  topic INTEGER NOT NULL,
  foreign key (topic) 
    REFERENCES topics (id)
);


insert into topics(id, topicName) values (1, 'example topic');
insert into items(id, topic, itemName) values (1, 1, 'example item1');
insert into items(id, topic, itemName) values (2, 1, 'example item2');

insert into topics(id, topicName) values (2, 'example topic2');
insert into items(id, topic, itemName) values (3, 2, 'new example item1');
insert into items(id, topic, itemName) values (4, 2, 'new example item2');
