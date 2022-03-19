import sqlite3 from 'sqlite3';
import uuid from 'uuid-random';
import { open } from 'sqlite';

async function init() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}
const dbConn = init();

export async function grabTopic(topicName) {
  const db = await dbConn;
  let topic = await db.all('SELECT topicName from topics where topicName = ?', topicName);
  topic = topic[0].topicName;

  const items = [];
  const DBitems = await db.all('SELECT i.itemName from topics t join items i on i.topic = t.id where t.topicName = ?', topicName);
  for (let i = 0; i < DBitems.length; i++) {
    items.push(DBitems[i].itemName);
  }

  const topicItems = { topic, items };
  console.log(await db.all("select * from topics"));
  return topicItems;
}

export async function grabTopics() {
  const db = await dbConn;
  const DBtopics = await db.all('SELECT topicName FROM topics');
  const topics = [];
  for (let i = 0; i < DBtopics.length; i++) {
    topics.push(DBtopics[i].topicName);
  }
  return topics;
}

export async function add(topic) {
  const db = await dbConn;
  const topicId = uuid();
  db.run('INSERT INTO topics(id, topicName) VALUES (?,?)', [topicId, topic.topicName]);
  const items = topic.items;
  for (let i = 0; i < items.length; i++) {
    db.run('INSERT INTO items(id, topic, itemName) VALUES (?, ?, ?)', [uuid(), topicId, items[i]]);
  }
}

export async function del(topic) {
  const db = await dbConn;
  let topicId = await db.all('select id from topics where topicName = ?', topic);
  topicId = topicId[0].id;
  console.log(topicId);
  db.run('delete from topics where id = ?', topicId);
  db.run('delete from items where topic = ?', topicId);
}
