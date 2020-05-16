

exports.renderSignin = (req, res, next) => {
  res.render('auth/signin', {
    csrfToken: req.csrfToken()
  });
};

exports.renderSignup = (req, res, next) => {
  res.render('auth/signup', {
    csrfToken: req.csrfToken()
  });
};

exports.renderForgotPassword = (req, res, next) => {
  res.render('auth/forgotpassword', {
    csrfToken: req.csrfToken()
  });
};

exports.renderVerify = (req, res, next) => {
  res.render('auth/verify', {
    csrfToken: req.csrfToken()
  });
};

exports.postSignup = (req, res, next) => {
  req.logOut();

  req.flash(
    "success",
    "User has been created successfully, check your e-mail to activate your account"
  );
  res.redirect("/auth/signin");
};

exports.postSignin = (req, res, next) => {
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect("/");
  }
};

