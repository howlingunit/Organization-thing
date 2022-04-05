import express from 'express';
import * as api from './lib/api.mjs';
// import * as sql from './lib/sql.mjs';


const app = express();

app.use(express.static('static'));

app.get('/getTopics', api.getTopics);

app.get('/getTopic', api.getTopic);

app.post('/addTopic', express.json(), api.addTopic);

app.post('/delTopic', express.json(), api.delTopic);

app.listen(8080);
