const authRouter = require("./auth.route");
const profileRouter = require("./profile.route");

const express = require("express");
const router = express.Router();

const defatultRoutes = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/user",
    router: profileRouter,
  },
];

defatultRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

module.exports = router;
