import * as sql from './sql.mjs';
export async function getTopics(req, res) {
  const topics = await sql.grabTopics();
  res.send(topics);
}

export async function getTopic(req, res) {
  const topic = await sql.grabTopic(req.query.topic);
  res.send(topic);
}

export function addTopic(req, res) {
  sql.add(req.body);
  res.send('OK');
}

export function delTopic(req, res) {
  const topic = req.body;
  sql.del(topic);
  res.send("OK");
}
