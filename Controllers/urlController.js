const Url = require("../Models/Url");
const validUrl = require("valid-url");
require("../Services/urlService");

// Shorten URL:
exports.shortenUrl = async (req, res) => {
    try {
        // Check if provided website is valid
        if (!req.body.url.includes("https")) {
            req.body.url = "https://" + req.body.url;
        }
        if (!validUrl.isUri(req.body.url)) {
            return res.status(404).json({
                error: "URL is not valid."
            });
        }
        const url = new Url({
            original_url: req.body.url,
            short_url: generateID()
        });
        await url.save();
        return res.json({
            new_url: url.short_url
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server error!");
    }
};

// Redirect to original URL:
exports.redirectUser = async (req, res) => {
    try {
        if (req.params.url !== "favicon.ico") {
            await Url.findOne({
                short_url: req.params.url
            }, (err, data) => {
                console.log(err);
                if (err) {
                    res.status(400).json({
                        error: err
                    });
                }
                res.redirect(data.original_url);
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server error!");
    }
};