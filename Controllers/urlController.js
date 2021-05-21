const Url = require("../Models/Url");
const validUrl = require("valid-url");
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
        await Url.findOne({ short_url: req.params.urlID }).then(url => {
            res.status(301).redirect(url.original_url);
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};