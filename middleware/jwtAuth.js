//Importing Packages
const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth.config");
const { getUserById } = require("../service/user.service");

//Verify token
async function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  //No Token found
  if (!token) {
    res.status(403).json({ error: "Bad Credentials" });
    return;
  }

  try {
    //Decoding Token
    const decoded = jwt.verify(token, secret);

    const userId = decoded.id;
    const user = await getUserById(userId);

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    //Modifying Request
    req.user = user;

    next();
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
}

module.exports = verifyToken;
