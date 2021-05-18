const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    original_url: {
        type: String
    },
    short_url: {
        type: String
    }
});

const Url = mongoose.model("urls", urlSchema);
module.exports = Url;