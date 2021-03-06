import 'angular2-universal-polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as ejs from 'ejs';

import { enableProdMode } from '@angular/core';
import { createEngine } from 'angular2-express-engine';

import { MainModule } from './main.node';

enableProdMode();

const app: express.Application = express();
const ROOT: string = path.join(path.resolve(__dirname, '..'));

const assetUrl = (path: string): string => {
  const base = process.env.LAMBDA_TASK_ROOT ? 'https://s3-eu-west-1.amazonaws.com/3sq.re' : '';
  return `${base}${path}`;
};

const engine = (filePath: string, data: ejs.Data, done: Function): Function => {
  const angularEngine = createEngine({});

  return angularEngine(filePath, data, (err, str) => {
    done(err, ejs.render(str, {assetUrl: assetUrl}));
  });
};

app.engine('.html', engine);
app.set('views', __dirname);
app.set('view engine', 'html');

app.use(cookieParser('Angular 2 Universal'));
app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, 'assets'), {maxAge: 30}));
app.use(express.static(path.join(ROOT, 'dist/client'), {index: false}));
app.use(express.static(path.join(ROOT, 'src/public'), {index: false}));

function ngApp(req: express.Request, res: express.Response): void {
  res.render('index', {
    req,
    res,
    ngModule: MainModule,
    preboot: false,
    baseUrl: '/',
    requestUrl: req.originalUrl,
    originUrl: 'http://localhost:3000'
  });
}

app.get('/', ngApp);
app.get('/blog', ngApp);
app.get('/blog/*', ngApp);

app.get('*', function(req: express.Request, res: express.Response) {
  res.setHeader('Content-Type', 'application/json');
  let pojo = { status: 404, message: 'No Content' };
  let json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

export default app;

let server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});



