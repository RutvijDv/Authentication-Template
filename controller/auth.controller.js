//Importing Packages
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secret } = require("../config/auth.config");
const {
  doesUserExistByEmail,
  createUser,
  getUserByEmail,
  getPasswordByEmail,
  updatePassword,
} = require("../service/user.service");
const sendMail = require("../service/mail.service");
const { salt_rounds } = require("../config/auth.config");

//Register new User
async function register(req, res) {
  try {
    const user = req.body;

    //Search user
    const userExists = await doesUserExistByEmail(user.email);

    if (userExists) {
      res.status(401).json({ error: "User already created" });
      return;
    }
    user.password = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUNDS));

    //Sign Token using email and password.
    const token = jwt.sign(user, secret, { expiresIn: "10m" });
    const url = process.env.DOMAIN + '/auth?token=' + token;
    await sendMail(user.firstName, user.email, url, "activation");

    res.status(200).json({ message: "Mail sent to " + user.email });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
}

//Creating User
async function create(req, res) {
  const token = req.query.jwt;

  //No Token found
  if (!token) {
    res.status(403).json({ error: "Bad Credentials" });
    return;
  }

  try {
    //Decoding activation token
    const decoded = jwt.verify(token, secret);

    const email = decoded.email;

    //Search user
    const userExists = await doesUserExistByEmail(email);

    if (userExists) {
      res.status(401).json({ error: "User already created" });
      return;
    }

    //Create User
    await createUser(decoded);

    res.status(201).send({ msg: "User Registered" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
}

//Login User
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const userExists = await doesUserExistByEmail(email);

    if (!userExists) {
      res.status(404).json({ error: "User not Registered" });
      return;
    }

    const user = await getPasswordByEmail(email);

    //Matching Password using Bcrypt
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Bad Credentials" });
      return;
    }

    const id = user.id;

    //Signing Token using user's id
    const token = jwt.sign({ id, email }, secret, { expiresIn: 86400 });

    res.status(200).json({
      email: user.email,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
}

//Forget Password
async function forget(req, res) {
  try {
    const email = req.body.email;

    const userExists = await doesUserExistByEmail(email);

    if (!userExists) {
      console.log("not found");

      res.status(404).json({ error: "No user found" });
      return;
    }

    const user = await getUserByEmail(email);

    const id = user.id;

    //Signing Token using user's email and id
    const token = jwt.sign({ email, id }, secret, { expiresIn: "10m" });

    sendMail(user.firstName, email, token, "forget");

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
}

//Reset Password
async function reset(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;

    const id = req.user.id;
    const email = req.user.email;
    const user = await getPasswordByEmail(email);

    //Matching Password using Bcrypt
    const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Bad Credentials" });
      return;
    }

    //Update new Password
    await updatePassword(id, newPassword);

    res.status(201).json({ message: "password has been reset" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {
  register,
  create,
  login,
  forget,
  reset,
};
