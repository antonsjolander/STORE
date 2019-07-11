const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const app = express();
const routes = require('./src/routes');
const session = require('express-session');
const flash = require('connect-flash');

const publicPath = path.join(__dirname, 'public');

app.set('views', path.join(__dirname, 'src/views'));
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout'  }));
app.set('view engine', 'hbs');

app.set('port', (process.env.PORT || 5000 ));
app.use(session({
    secret: 'antonrules', 
    resave: false, 
    saveUninitialized: false,
    cookie: {maxAge: 180 * 60 * 1000 }
}));
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
})
app.use(flash());
app.use('/', routes);

app.use('/', express.static(publicPath))
app.use('/product/:id', express.static(publicPath))

app.listen(app.get('port'), function() {
    console.log('Server started on port 5000');
}) 


