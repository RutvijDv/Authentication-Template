const { User } = require("../model");
const bcrypt = require("bcrypt");

const doesUserExistByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  if (user) return true;

  return false;
};

const createUser = async (userData) => {
  const user = await User.create(userData);

  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne(
    {
      email: email,
    },
    { password: 0 }
  );

  if (user) return user;

  throw `Error: User with email ${email} does not exist`;
};

const getAllUsers = async () => {
  const user = await User.find(
    {},
    {
      prefix: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
    }
  );

  if (user) return user;

  throw `Error: No User Exist `;
};

const getPasswordByEmail = async (email) => {
  const user = await User.findOne({ email: email });

  if (user) return user;

  throw `Error: User with email ${email} does not exist`;
};

const getUserById = async (id) => {
  const user = await User.findOne(
    {
      _id: id,
    },
    { password: 0 }
  );
  return user;
};

const updatePassword = async (id, password) => {
  try {
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: bcrypt.hashSync(password.toString(), 8),
        },
      }
    );
  } catch (err) {
    throw `Error: User not updated`;
  }
};

const updateProfileById = async (id, update) => {
  await User.updateOne(
    {
      _id: id,
    },
    { $set: update }
  );
  const user = await getUserById(id);
  if (user) return user;

  throw `Error: User with id ${id} does not exist`;
};

module.exports = {
  doesUserExistByEmail,
  createUser,
  getUserByEmail,
  getAllUsers,
  getPasswordByEmail,
  getUserById,
  updatePassword,
  updateProfileById,
};
