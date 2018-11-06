const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const passport = require("passport");
const app = express();

const jwtStrategry = require("./strategies/jwt");
const googleStrategry = require("./strategies/google");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(jwtStrategry);
passport.use(googleStrategry);

app.get("/", function(req, res) {
  return res.send("Hello world");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  console.log(username, password);
  if (username === "admin@example.com") {
    if (password === "pass") {
      const opts = {};
      opts.expiresIn = 5;
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign({ username }, secret, opts);
      return res.status(200).json({
        message: "Auth Passed",
        authenticated: true,
        token
      });
    }
  }
  return res.status(401).json({ authenticated: false, message: "Auth Failed" });
});

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).json({ message: "YAY! this is a protected Route" });
  }
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["email"]
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  function(req, res) {
    console.log("hello kiran");
    console.log(req.user);
    const profileId = req.user.id;
    res.type("html");
    res.send(`
    <html>
    <body>
    <script>
      console.log(${profileId})
      window.opener.postMessage({ message: ${profileId}});
      window.close();
    </script>
    </body>
    </html>
    `);
    // res.redirect("/page2");
  }
);

app.listen(process.env.PORT || 8080);
console.log("app started at ", 8080);
