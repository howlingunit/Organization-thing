import express from 'express';
import * as sql from './lib/sql.mjs';


const app = express();

app.use(express.static('static'));

app.listen(8081);