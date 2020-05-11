const router = require("express").Router();
const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  checkRole,
} = require("../utils/Auth");

//User Registration Route
router.post("/reg-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});

//Manager Registration Route
router.post("/reg-manager", async (req, res) => {
  await userRegister(req.body, "manager", res);
});

//Admin Registration Route
router.post("/reg-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

//User Login Route
router.post("/log-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

//Manager Login Route
router.post("/log-manager", async (req, res) => {
  await userLogin(req.body, "manager", res);
});

//Admin Login Route
router.post("/log-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

//Profile
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

//User Protected Route
router.get(
  "/user-protected",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    return res.json("Hello User");
  }
);

//Manager Protected Route
router.get(
  "/manager-protected",
  userAuth,
  checkRole(["manager"]),
  async (req, res) => {
    return res.json("Hello Manager");
  }
);

//Admin Protected Route
router.get(
  "/admin-protected",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);

//Admin-Manager Protected Route
router.get(
  "/adman-protected",
  userAuth,
  checkRole(["admin", "manager"]),
  async (req, res) => {
    return res.json("Hello Admin-Manager");
  }
);

module.exports = router;
