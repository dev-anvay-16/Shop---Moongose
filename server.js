const express = require('express');
const body = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const csrfProtection = csrf();
const app = express();
const flash = require('connect-flash');

app.set('view engine' , 'ejs');
app.set('views' , 'Views');

const adminRoute = require('./Routes/admin-routes');
const shopRoute = require('./Routes/shop-routes');
const authRoute = require('./Routes/auth');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://anvay16:condensed@shop.tbyec.mongodb.net/Shop'

const store = new MongoDBStore({
   uri: MONGODB_URI,
   collection : 'sessions'
});


app.use(body.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }))
app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
   
   if (!req.session.user) {
      return next();
   }
   User.findOne(req.session.user._id).then(user => {
      req.user = user;
      next();
   })
      .catch(err => console.log(err));
})

app.use((req, res, next) => {
   res.locals.isAuthenticated = req.session.isLoggedIn;
   res.locals.csrfToken = req.csrfToken(); 
   next();
})

app.use('/admin',adminRoute.routes);
app.use(shopRoute);
app.use(authRoute);
app.use(errorController.error);

mongoose.connect('mongodb+srv://anvay16:condensed@shop.tbyec.mongodb.net/Shop?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(result => {
      User.findOne().then(user => {
         if (!user) {
            const user = new User({
               name: "Anvay Wankhede",
               email: "anvaymilind@gmail.com",
               cart: {
                  items : []
               }
            })
            user.save();
         }
      })
    app.listen(6716);
   })
   .catch(err => {
      console.log(err);
   })






