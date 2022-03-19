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
  sql.add(req.body.topic);
  res.statusCode = 200;
}

export function delTopic(req, res) {
  sql.del(req.body.topic);
  res.statusCode = 200;
}
