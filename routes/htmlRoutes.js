var path = require('path')
var passport = require('passport')
module.exports = function(app) {
  // Load index page
 app.get("/", function(req, res) {
    console.log(req.user)
    res.sendFile(path.join(__dirname, "../public/sign-in.html"));
  });

  app.get('/account', function(req,res){
    console.log(req.isAuthenticated())
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.sendFile(path.join(__dirname, "../public/account.html"));
    };
  res.end()
  })
};