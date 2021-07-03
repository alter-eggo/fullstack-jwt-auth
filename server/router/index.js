const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware");

const postRoutes = [
  {
    url: "/registration",
    validators: [
      body("email").isEmail(),
      body("password").isLength({ min: 3, max: 32 }),
    ],
    function: userController.registration,
  },
  { url: "/login", function: userController.login },
  { url: "/logout", function: userController.logout },
];

const getRoutes = [
  { url: "/activate/:link", function: userController.activate },
  { url: "/refresh", function: userController.refresh },
  {
    url: "/users",
    middlewares: [authMiddleware],
    function: userController.getUsers,
  },
];

postRoutes.forEach((route) => {
  if (route.validators) {
    router.post(route.url, ...route.validators, route.function);
  }
  router.post(route.url, route.function);
});

getRoutes.forEach((route) => {
  if (route.middlewares) {
    router.get(route.url, ...route.middlewares, route.function);
  }
  router.get(route.url, route.function);
});

module.exports = router;
