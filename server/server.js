import path from 'path';
import express from 'express';

import handleRender from './serverSideRenderer';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../', '/dist')));
app.get('/', handleRender);


app.listen(port, function(err) {
  if (err) console.log(err);
  console.log('listening on port ', port);
});





