const router = require("express").Router();
const urlController = require("../Controllers/urlController");

// Shorten URL:
router.route("/api/shortr").post(urlController.shortenUrl);

// Redirect to original URL
router.route("/:url").get(urlController.redirectUser);

module.exports = router;