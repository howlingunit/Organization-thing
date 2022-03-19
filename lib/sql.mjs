import sqlite3 from 'sqlite3';
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

export async function listTopic(topicName) {
  const db = await dbConn;
  const topic = await db.all('SELECT t.topicName, i.itemName from topics t join items i on t.id = i.id where t.topicName = ?', topicName);
  console.log(topic);
}
