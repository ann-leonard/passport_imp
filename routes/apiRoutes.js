var db = require("../models");
module.exports = function(app, passport) {
  
  app.get("/login", function(req, res) {
    
  });

  

  app.post("/login", function (req, response) {
    console.log(req.body)

    db.User.create(req.body).then((res)=> {
  
      db.User.findOne({where:{id : res.id}}).then(function(res){
        console.log(res.id)
        req.login(res.id, function(err){
          if(err){
            response.send({redirectUrl:"/"})
          } else{
          console.log(res.id)
          response.send({err: 0, redirectUrl: "/account"});
          }
        })
      })
    })
  });

  // Create a new example
  /*
  app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
  */
  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  passport.serializeUser(function(user, done) {
    console.log(user)
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    db.User.findByPk(id, function (err, user) {
      done(err, user);
    });
  });  
};
