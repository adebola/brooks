const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongo")(session);
const passport = require("passport");
const flash = require("connect-flash");
const favicon = require("serve-favicon");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const aboutRouter = require("./routes/about");
const agentRouter = require("./routes/agent");
const contactRouter = require("./routes/contact");
const propertyRouter = require("./routes/property");
const serviceRouter = require("./routes/service");
const blogRouter = require("./routes/blog");
const authRouter = require("./routes/auth")
const logger = require("./config/winston");
const config = require('./config/passport');
const app = express();

mongoose
  .connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to database");
    //logger.info("Connected to Mongo Database Successfully");
  })
  .catch((err) => {
    console.log("Connection Failed " + err.message);
    //logger.error("MongoDB Connection Failed: " + err.message);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "The Brightness of his Glory, the express image of his person",
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(flash());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/about", aboutRouter);
app.use("/agent", agentRouter);
app.use("/contact", contactRouter);
app.use("/property", propertyRouter);
app.use("/service", serviceRouter);
app.use("/blog", blogRouter);
app.use("/auth", authRouter);


app.use('*', (req, res, next) => {
  res.render('404');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
