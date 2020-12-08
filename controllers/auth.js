const User = require('../models/user');
const bcrypt = require('bcryptjs')

exports.getLogin = (req, res, next) => {
    
      res.render('auth/login', {
        path: '/login',
          pageTitle: 'Sign In',
          errorMessage1: req.flash('error1'),
          errorMessage2: req.flash('error2')
        
      });

}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
     User.findOne({email : email})
         .then(user => {
             if (!user) {
                 req.flash('error1', 'Invalid email or password');
                 return res.redirect('/login');
             }
             return bcrypt.compare(password, user.password)
                 .then(passMatched => {
                     if (passMatched) {
                        req.session.user = user;
                        req.session.isLoggedIn = true;
                        return req.session.save(err => {
                        res.redirect('/');
                        })
                     }
                     req.flash('error2', 'Invalid password');
                     return res.redirect('/login')
                 })
                 .catch(err => {
                     console.log(err);
                    
                    });
      })          
}

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
      isAuthenticated: false,
      errorMessage3: req.flash('error3')
  });
};

exports.postSignup = (req, res, next) => {
    const mobile = req.body.mobile;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({ email: email }).then(userDoc => {
        if (userDoc) {
            req.flash('error3', 'Email ID exists, Please choose different Email ID');
            return res.redirect('/signup');
        }
        return bcrypt.hash(password, 12).then(hashedPassword => {
            const user = new User({
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            email: email,
            password: hashedPassword,
            cart: {
                items: []
                },
            type : "CUSTOMER"
        });
         return user.save();
        })
        .then(result => {
        return res.redirect('/login');
    } ); 
    })
}

exports.postLogout = (req, res, next) => {
    
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })

}


