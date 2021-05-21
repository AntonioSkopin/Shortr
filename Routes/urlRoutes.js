const router = require("express").Router();
const urlController = require("../Controllers/urlController");

router.route("/api/urls").get(urlController.getURLs);
router.route("/api/url").post(urlController.shortenURL);
router.route("/:urlID").get(urlController.redirectUser);

module.exports = router;