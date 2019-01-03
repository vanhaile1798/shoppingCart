let express = require('express');
const port = 3030;

let path = require('path');

// Use mongodb

// let mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/bookstore', { useNewUrlParser: true});

// Use lowdb

let db = require('./db/db');


let bodyParser = require('body-parser');
let session = require('express-session');
let index = require('./routes/index');

let admin = require('./routes/admin');

let authentication = require('./routes/authentication');

let book = require('./routes/book');

let cart = require('./routes/cart');

let cartNum = require('./routes/cartNum');

let app = express();

app.use(session({
	secret: 'Just a string',
	
	cookie: {
		maxAge: 6000000
	},
	resave: false,
	saveUninitialized: false
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');



app.use('/', cartNum, index);
app.use('/admin', cartNum, authentication, admin);
app.use('/books', cartNum, book);
app.use('/cart', cartNum, cart);

// app.use('/', index);
// app.use('/admin', admin);
// app.use('/books', book);
// app.use('/cart', cart);

app.listen(port, function() {
	console.log(`Server is running on port ${3030}`);
});
