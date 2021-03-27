import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// verifies the refreshToken
const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        function (err, result) {
          if (err) {
            return reject(err);
          } else {
            const userEmail = result.email;
            console.log("verified", userEmail);
            return resolve(userEmail);
          }
        }
      );
    });
};

export { verifyRefreshToken };