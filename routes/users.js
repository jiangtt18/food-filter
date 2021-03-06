const flash = require('connect-flash');
var User = require('../models/User');
const passport = require('passport');


module.exports = app => {


 	// Register User
  app.post('/users/register', function (req, res) {
    const {email,username,preferredName,password,password2} = req.body;
    _validateFrom(req);
	  let errors = req.validationErrors();

  	if(errors){
      invalidFormInfo(errors,res);
  	}
  	else {
    	User.findOne(
        {username: _processInput(username)},
        function(err, resUsername){
  		    User.findOne(
            {email:  _processInput(email)},
            function (err2, resEmail) {
  			      if (resUsername || resEmail) {
  			        _invalidRegisterInfo(resUsername, resEmail, res);
  			      }
  			      else {
  				      _saveValidateUser(email, username, preferredName, password, res);
  			      }
    		});
    	});
	  }
  });

  // login User
  app.post('/users/login',passport.authenticate('local'),
    (req, res) => {
      let user = req.user;
      res.redirect('/api/current_user');
  });

};




function _saveValidateUser(email, username, preferredName, password ,res){
  var newUser = new User({
    email: email,
    username: username,
    preferredName: preferredName,
    password: password
  });

  User.createUser(newUser, function (e, savedUser) {
    if (e) {
      return res.json({errors: e});
     } else {
       res.json(savedUser);
     }
  });
}


function _isUserExisted(username, email) {
  if(username && !email) {
    return 'usernameTaken';
  }
  else if( !username && email ){
    return 'emailTaken';
  }
  else if ( username && email) {
    return 'bothTaken';
  }
}


function _validateFrom(req) {
  req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('preferredName', 'preferredName is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match')
  .equals(req.body.password);
}

function _processInput(field) {
  return {"$regex": "^" + field + "\\b", "$options": "i"};
}


function _invalidRegisterInfo(resUsername, resEmail, res){
  switch(_isUserExisted(resUsername, resEmail)) {
    case 'usernameTaken':
      return res.status(422).json({errors: ['Username is Taken']});
    case 'emailTaken':
      return res.status(422).json({errors: ['Email is Taken']});
    case 'bothTaken':
      return res.status(422)
                .json({errors: ['Username and Email are Taken']});
  }
}

function invalidFormInfo(errors,res) {
  let errorsArr = Object.values(errors)
                  .map(function(err){return err.msg;});
  return res.status(422).json({errors: errorsArr});
}
