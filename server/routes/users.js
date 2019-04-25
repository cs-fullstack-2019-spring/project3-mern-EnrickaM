var express = require('express');
var router = express.Router();
var TwitterCollection=require('../models/TwitterLogin');
var bCrypt=require('bcrypt-nodejs');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var TweetCollection=require('../models/TwitterSchema');

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user,done){
  done(null,user._id);
});
passport.deserializeUser(function (id,done){
  TwiiterColloection.findById(id,function(error,user){
    done(error,user)
  })

});
var validPassword=function(user,password){
  return bCrypt.compareSync(password,user.password);
};
var createHash=function(password){
  return bCrypt.hashSync(password,bCrypt.genSaltSync(5),null)
};
// router.get('/', (req, res, next) => {
//   if (req.session.username) {
//     res.send(req.session.username);
//   } else {
//     res.send(null);
//   }
// });
// router.get('/logout', (req, res, next) => {
//   console.log(req.session);
//
//   if (req.session) {
//     req.session=null;
//     res.send("Logged Out");
//   } else {
//     res.send("Can not log in");
//   }
// });
// This is the "strategy" for signing up a new user
passport.use('signup', new LocalStrategy(
    {passReqToCallback : true},
    function(req, username, password, done) {
      console.log("0");
      findOrCreateUser = function(){
        TwitterCollection.findOne({'username':username},function(err, user) {
          if (user) {
            return done(null, false,
                { message: 'User already exists.' }
            );
          } else {
            console.log("3");
            console.log(username);
            console.log(password);
            console.log(req.body);
            var newUser = new TwitterCollection();
            newUser.username =req.body.username;
            newUser.password = createHash(req.body.password);
            newUser.profileImage=rew.body.profileImage;


            newUser.save(function(err) {
              if (err){
                console.log("4");
                throw err;
              }
              console.log("Leave strat");
              return done(null, newUser);
            });
          }
        });
      };

      process.nextTick(findOrCreateUser);
    })
);
// This is the route to create a new user.
router.post('/signup',
    passport.authenticate('signup',
        {
          // successRedirect: '/users/successNewUser',
          failureRedirect: '/users/failedsignup',
        }
    ),
    function(req, res) {
      res.send(req.body.username);
    });
router.get('/failedsignup', (req, res)=>{
  res.send("Your sign upp form has failed");
});


passport.use('signup',new LocalStrategy(
    function(username, password, done) {
      TwitterCollection.findOne({ 'username': username }, function (err, user) {
        if (err) {
          return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!isValidPassword(user, password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user, { user: user.username });
      });
    }
));


router.post('/',
    passport.authenticate('local',
        {failureRedirect: '/users/loginfail' }),
    function(req, res) {
      req.session.username = req.body.username;
      res.send(req.session.username);


      router.get('/loginfail', (req, res) => {
        res.send({})
      });

      router.post('addTweet', (req, res) => {
        TweetCollection.findOneAndUpdate({username: req.body.username},

            {
              $push:
                  {
                    tweets: req.body.tweets
                  }
            },
            (errors, results) => {
              if (errors) res.send(errors);
              else res.send("Tweet Added!");
            });
      });
      router.get('/loginfail', (req, res) => {
        res.send({});
      });
      router.get('/logout', (req, res, next) => {
        console.log(req.session);
        req.session = null;
      });
    });

module.exports = router;
