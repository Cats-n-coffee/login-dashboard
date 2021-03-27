import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// function that checks the token to protected content/routes
const authenticateUser = (req, res, next) => {
  const allCookies = req.headers.cookie;
  const cookie = allCookies.split("; ")[0];
  console.log(cookie);

  if (cookie) {
    const token = cookie.split("=")[1];

    jwt.verify(token, process.env.TOKEN_SECRET, function (err, user) {
      if (err) {
        res.status(403);
        console.log("error verifying token", err);
      } else {
        console.log("token verified");
        req.user = user;
        res.status(200);
      }
      next();
    });
  } else {
    res.status(403).redirect("/login");
  }
};



export { authenticateUser };
