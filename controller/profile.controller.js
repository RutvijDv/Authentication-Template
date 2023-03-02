//Importing Packages
const { getUserById, updateProfileById } = require("../service/user.service");

//GET user Profile
async function getProfile(req, res) {
  try {
    const user = req.user;

    //No user found
    if (user == null) {
      res.status(401).json({ error: "Unauthorized!" });
      return;
    }

    //Extract Profile data
    const profileData = await getUserById(user.id);

    res.status(200).json({
      profileData: profileData,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
}

//Put user Profile
async function putProfile(req, res) {
  try {
    const user = req.user;
    const update = req.body;

    //No user found
    if (user == null) {
      res.status(401).json({ error: "Unauthorized!" });
      return;
    }

    //Extract Profile data
    const profileData = await updateProfileById(user.id, update);

    res.status(200).json({
      profileData: profileData,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {
  getProfile,
  putProfile,
};
