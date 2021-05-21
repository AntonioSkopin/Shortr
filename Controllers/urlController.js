const Url = require("../Models/Url");
require("../Services/urlService");

// GET all URL's
exports.getURLs = async (req, res) => {
    try {
        const urls = await Url.find();
        return res.status(200).json({
            data: urls
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.shortenURL = async (req, res) => {
    try {
        if (!req.body.url.includes("https")) {
            req.body.url = "https://" + req.body.url;
        }
        // CHECK IF URL IS VALID:
        if (!checkUrl(req.body.url)) {
            return res.status(400).json({
                message: "Please provide a valid URL."
            });
        }
        const url = new Url({
            original_url: req.body.url,
            short_url: generateID()
        });
        await url.save();
        res.status(200).json({
            new_url: url.short_url
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.redirectUser = async (req, res) => {
    try {
        // Param always is favicon.ico when no param is provided
        if (req.params.url !== "favicon.ico") {
            await Url.findOne({
                short_url: req.params.urlID
            }).then(url => {
                res.status(301).redirect(url.original_url);
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};