import * as express from 'express';
import * as path from 'path';
import * as hypothesesRouter from './routes/hypotheses';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));

app.use( '/api', hypothesesRouter );

// catch 404 and forward to error handler
interface HttpError extends Error {
  status: number
}
app.use(function(req, res, next) {
    const NotFound = {
      status: 404,
      message: 'Page not found'
    }
    next( NotFound );
});

// error handler
app.use(function( err: HttpError, req: express.Request, res: express.Response, next: express.RequestHandler ) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status( err.status || 500 );
  res.send( err.message );
});

module.exports = app;
